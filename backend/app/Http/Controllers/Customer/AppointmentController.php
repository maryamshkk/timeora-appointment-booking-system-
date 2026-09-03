<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Company;
use App\Models\Service;
use App\Models\Staff;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class AppointmentController extends Controller
{
     public function store(Request $request)
    {
        $validated = $request->validate([
            'company_id' => 'required|exists:companies,id',
            'staff_id' => 'required|exists:staff,id',
            'service_id' => 'required|exists:services,id',
            'appointment_date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
        ]);

        $customer = $request->user();

        if  (!$customer) {
            return response()->json([
                'success' => false,
                'message' => 'Customer authentication required.',
            ], 401);
        }

        $company = Company::find($validated['company_id']);
        $staff = Staff::find($validated['staff_id']);
        $service = Service::find($validated['service_id']);

         /*
        |--------------------------------------------------------------------------
        | Check staff belongs to company
        |--------------------------------------------------------------------------
        */

        if($staff->company_id != $company->id)
            {
                return response()->json([
                    'success' => false,
                    'message' => 'Staff doesnt belong to this company',
                ], 422);
            
                    /*
            |--------------------------------------------------------------------------
            | Check staff provides service
            |--------------------------------------------------------------------------
            */

            $staffProvideService = DB::table('staff_service')
                        ->where('staff_id', $staff->id)
                        ->where('sevice_id', $service->id)
                        ->exists();

                if(!$staffProvideService) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Thiss staff member does not provide the selected service.' ,
                    ], 422);
                }
             /*
        |--------------------------------------------------------------------------
        | Check service belongs to company
        |--------------------------------------------------------------------------
        */

        if ($service->company_id != $company->id) {
            return response()->json([
                'success' => false,
                'message' => 'Service does not belong to this company.',
            ], 422);
        }

        /*
        |--------------------------------------------------------------------------
        | Calculate appointment end time
        |--------------------------------------------------------------------------
        */
        $startTime = Carbon::createFromFormat(
            'H:i',
            $validated['start_time']
        );

        $endTime = $startTime->copy()->addMinutes($service->duration);

         /*
        |--------------------------------------------------------------------------
        | Check past date/time
        |--------------------------------------------------------------------------
        */

        $appointmentDateTime = Carbon::createFromFormat(
            'Y-m-d H:i',
            $validated['appointment_date'] . '' . $validated['start_time']
        );

        if($appointmentDateTime->isPast()) {
            return response()->json([
                'success' => false,
                'message' => 'You cannot book a past slot.',
            ], 422);
        }


        /*
        |--------------------------------------------------------------------------
        | Create appointment inside transaction
        |--------------------------------------------------------------------------
        */

        $appointment = DB::transaction(function () use (
            $validated,
            $customer,
            $staff,
            $service,
            $endTime,
        ) {
             /*
            |--------------------------------------------------------------------------
            | Double booking check
            |--------------------------------------------------------------------------
            */

            $overlap = Appointment::where('staff_id', $staff->id)
                        ->where('appointment_date', $validated['appointment_date'])
                        ->whereIn('status', [
                            'pending',   
                            'accepted'
                        ])
                        ->where(function($query) use ($validated, $endTime){    
                            $query->where(
                                'start_time',
                                '<',
                                $endTime->format('H:i:s')

                            )->where(
                                'end_time',
                                '>',
                                $validated['start_time']
                            );

                        })
                        ->lockForUpdate()
                        ->exists();


                        if ($overlap) {
                            abort(response()->json([
                                'success' => false,
                                'message' => 'Slot already booked.',
                            ], 409));
                        }

                      return Appointment::create([
                        'company_id' => $validated['company_id'],
                        'customer_id' => $customer->id,
                        'staff_id' => $staff->id,
                        'service_id' => $service->id,
                        'appointment_date' => $validated['appointment_date'],
                        'start_time' => $validated['start_time'],
                        'end_time' => $endTime->format('H:i:s'),
                        'status' => 'pending'
                      ]);  
        });

                    
                    return response()->json([
                        'success' => true,
                        'message' => 'Appointment booked successfully.',
                        'data' => $appointment,
                    ], 201);
    }
    
}
}