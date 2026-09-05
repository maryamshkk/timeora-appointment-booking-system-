<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use App\Models\Appointment;
use App\Models\Company;
use App\Models\Staff;
use App\Models\Service;
use App\Models\StaffAvailability;
use App\Models\BlockedTime;
use App\Models\BusinessWorkingHour;


class AppointmentController extends Controller
{
    public function upcoming(Request $request) 
    { 
        $staff = $request->user(); 
         
        
        if (!$staff) 
            { 
                return response()->json([
                    'success' => false, 
                    'message' => 'Staff profile not found.', 
                ], 404); 
                } 
                
                $appointments = Appointment::with([ 
                    'company', 'customer', 'service', 
                ]) 
                ->where('staff_id', $staff->id) 
                ->where(function ($query) 
                { 
                    $query->where('appointment_date', '>', now()->toDateString()) 
                    ->orWhere(function ($query) 
                    { 
                        $query->where('appointment_date', now()->toDateString()) 
                        ->where('start_time', '>', now()->format('H:i:s')); 
                        }); 
                    }) 
                    ->whereNotIn('status', ['cancelled', 'rejected']) 
                    ->orderBy('appointment_date', 'asc') 
                    ->orderBy('start_time', 'asc') 
                    ->get(); 
                    
                    return response()->json([ 
                        'success' => true, 
                        'appointments' => $appointments, 
                    ]); 
                    
                    }


     /**
     * Get logged-in staff's appointments.
     */
    public function index(Request $request)
    {
        $staff = $request->user();

        

        if (!$staff) {
            return response()->json([
                'success' => false,
                'message' => 'Staff profile not found.',
            ], 404);
        }

        $appointments = Appointment::with([
            'customer:id,name,email',
            'company:id,name',
            'service:id,name,duration',
        ])
            ->where('staff_id', $staff->id)
            ->latest('appointment_date')
            ->latest('start_time')
            ->get();
            return response()->json([
            'success' => true,
            'message' => 'Staff appointments retrieved successfully.',
            'data' => $appointments,
        ]);
    }

    /**
     * Get single appointment.
     */
    public function show(Request $request, $id)
    {
        $staff = $request->user();

        if (!$staff) {
            return response()->json([
                'success' => false,
                'message' => 'Staff profile not found.',
            ], 404);
        }

        $appointment = Appointment::with([
            'customer:id,name,email',
            'company:id,name',
            'service:id,name,duration',
        ])
            ->where('staff_id', $staff->id)
            ->find($id);

        if (!$appointment) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment not found.',
            ], 404);
        }
         return response()->json([
            'success' => true,
            'message' => 'Appointment retrieved successfully.',
            'data' => $appointment,
        ]);
    }

     /**
     * Accept appointment.
     */
    public function accept(Request $request, $id)
    {
        $staff = $request->user();
 

        if (!$staff) {
            return response()->json([
                'success' => false,
                'message' => 'Staff profile not found.',
            ], 404);
        }

        $appointment = Appointment::where('staff_id', $staff->id)
            ->find($id);

        if (!$appointment) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment not found.',
            ], 404);
        }

        if ($appointment->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Only pending appointments can be accepted.',
            ], 422);
        }

        $appointment->update([
            'status' => 'accepted',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Appointment accepted successfully.',
            'data' => $appointment->fresh(),
        ]);
    }


    /**
     * Reject appointment.
     */
    public function reject(Request $request, $id)
    {
        $staff = $request->user();


        if (!$staff) {
            return response()->json([
                'success' => false,
                'message' => 'Staff profile not found.',
            ], 404);
        }

        $appointment = Appointment::where('staff_id', $staff->id)
            ->find($id);

        if (!$appointment) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment not found.',
            ], 404);
        }

        if ($appointment->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Only pending appointments can be rejected.',
            ], 422);
        }

        $appointment->update([
            'status' => 'rejected',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Appointment rejected successfully.',
            'data' => $appointment->fresh(),
        ]);
    }


    /**
     * Reschedule appointment.
     */
    public function reschedule(Request $request, $id)
    {
        $validated = $request->validate([
            'appointment_date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
        ]);

        $staff = $request->user();

        if (!$staff || !($staff instanceof Staff)) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized.',
                'data' => null,
                'errors' => null,
            ], 401);
        }

        $appointment = Appointment::where('staff_id', $staff->id)
            ->find($id);

        if (!$appointment) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment not found.',
            ], 404);
        }

        if (in_array($appointment->status, [
            'cancelled',
            'rejected',
            'completed',
        ])) {
            return response()->json([
                'success' => false,
                'message' => 'This appointment cannot be rescheduled.',
            ], 422);
        }

        $company = Company::find($appointment->company_id);
        $service = Service::find($appointment->service_id);

        $startTime = Carbon::createFromFormat(
            'H:i',
            $validated['start_time']
        );

        $endTime = $startTime->copy()
            ->addMinutes($service->duration);

        $appointmentDateTime = Carbon::createFromFormat(
            'Y-m-d H:i',
            $validated['appointment_date'] . ' ' . $validated['start_time']
        );

        if ($appointmentDateTime->isPast()) {
            return response()->json([
                'success' => false,
                'message' => 'You cannot reschedule to a past slot.',
            ], 422);
        }

        /*
        |--------------------------------------------------------------------------
        | Staff Availability
        |--------------------------------------------------------------------------
        */

        $dayOfWeek = Carbon::parse(
            $validated['appointment_date']
        )->dayOfWeekIso;

        $availability = StaffAvailability::where('staff_id', $staff->id)
            ->where('day_of_week', $dayOfWeek)
            ->first();

        if (!$availability || !$availability->is_working) {
            return response()->json([
                'success' => false,
                'message' => 'Staff is not available on this day.',
            ], 422);
        }

        /*
        |--------------------------------------------------------------------------
        | Company Business Hours
        |--------------------------------------------------------------------------
        */

        $businessHours = BusinessWorkingHour::where('company_id', $company->id)
                ->where('day_of_week', $dayOfWeek)
                ->first();

        if (!$businessHours) {
            return response()->json([
                'success' => false,
                'message' => 'Company is closed on this day.',
            ], 422);
        }

        /*
        |--------------------------------------------------------------------------
        | Common Working Window
        |--------------------------------------------------------------------------
        */

        $commonStart = max(
            $businessHours->opening_time,
            $availability->start_time
        );

        $commonEnd = min(
            $businessHours->closing_time,
            $availability->end_time
        );

        if (
            $validated['start_time'] < $commonStart ||
            $endTime->format('H:i:s') > $commonEnd
        ) {
            return response()->json([
                'success' => false,
                'message' => 'Selected slot is outside working hours.',
            ], 422);
        }

        /*
        |--------------------------------------------------------------------------
        | Break Time
        |--------------------------------------------------------------------------
        */

        if (
            $availability->break_start &&
            $availability->break_end &&
            $validated['start_time'] < $availability->break_end &&
            $endTime->format('H:i:s') > $availability->break_start
        ) {
            return response()->json([
                'success' => false,
                'message' => 'Selected slot overlaps staff break time.',
            ], 422);
        }

        /*
        |--------------------------------------------------------------------------
        | Blocked Time
        |--------------------------------------------------------------------------
        */

        $blockedTimes = BlockedTime::where('staff_id', $staff->id)
            ->whereDate('blocked_date', $validated['appointment_date'])
            ->get();

        foreach ($blockedTimes as $blocked) {

            if (
                $validated['start_time'] < $blocked->end_time &&
                $endTime->format('H:i:s') > $blocked->start_time
            ) {
                return response()->json([
                    'success' => false,
                    'message' => 'Selected slot is blocked.',
                ], 422);
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Conflict Check
        |--------------------------------------------------------------------------
        */

        $conflict = Appointment::where('staff_id', $staff->id)
            ->where('appointment_date', $validated['appointment_date'])
            ->whereIn('status', [
                'pending',
                'accepted',
            ])
            ->where('id', '!=', $appointment->id)
            ->where(function ($query) use ($validated, $endTime) {

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
            ->exists();

        if ($conflict) {
            return response()->json([
                'success' => false,
                'message' => 'Selected slot is already booked.',
            ], 409);
        }

        /*
        |--------------------------------------------------------------------------
        | Update Appointment
        |--------------------------------------------------------------------------
        */

        $appointment->update([
            'appointment_date' => $validated['appointment_date'],
            'start_time' => $validated['start_time'],
            'end_time' => $endTime->format('H:i:s'),
            'status' => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Appointment rescheduled successfully.',
            'data' => $appointment->fresh(),
        ]);
    }

    /**
     * Cancel appointment.
     */
    public function cancel(Request $request, $id)
    {
        $staff = $request->user();


        if (!$staff) {
            return response()->json([
                'success' => false,
                'message' => 'Staff profile not found.',
            ], 404);
        }

        $appointment = Appointment::where('staff_id', $staff->id)
            ->find($id);

        if (!$appointment) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment not found.',
            ], 404);
        }

        if (in_array($appointment->status, [
            'cancelled',
            'rejected',
            'completed',
        ])) {
            return response()->json([
                'success' => false,
                'message' => 'This appointment cannot be cancelled.',
            ], 422);
        }

        $appointment->update([
            'status' => 'cancelled',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Appointment cancelled successfully.',
            'data' => $appointment->fresh(),
        ]);
    }

    public function calendar(Request $request)
    {
        $validated = $request->validate([
            'start' => 'required|date',
            'end' => 'required|date|after_or_equal:start',
        ]);

        $staff = $request->user();


        if (!$staff) {
            return response()->json([
                'success' => false,
                'message' => 'Staff profile not found.',
            ], 404);
        }

        $appointments = Appointment::with([
            'customer:id,name,email',
            'company:id,name',
            'service:id,name,duration',
        ])
            ->where('staff_id', $staff->id)
            ->whereBetween('appointment_date', [
                $validated['start'],
                $validated['end'],
            ])
            ->orderBy('appointment_date')
            ->orderBy('start_time')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Staff calendar retrieved successfully.',
            'data' => $appointments,
        ]);
    }
}
