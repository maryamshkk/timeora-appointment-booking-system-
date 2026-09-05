<?php

namespace App\Http\Controllers\Customer;


use App\Notifications\TimeoraNotification;
use App\Notifications\NotificationType;
use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Company;
use App\Models\Service;
use App\Models\Staff;
use Carbon\Carbon;
use App\Models\User;
use App\Models\BlockedTime;
use App\Models\StaffAvailability;
use App\Models\BusinessWorkingHour;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class AppointmentController extends Controller
{

    public function upcoming(Request $request)
    {
        $user = $request->user(); 
        
        

        $appointments = Appointment::with([ 
            'company', 
            'staff', 
            'service', 
            ])
            ->where('customer_id', $user->id)
            ->where(function ($query) {
                $query->where('appointment_date', '>', now()->toDateString())
                ->orWhere(function ($query) {
                    $query->where('appointment_date', now()->toDateString())
                    ->where('start_time', '>', now()->format('H:i:s'));
                });
            })
            ->whereNotIn('status', ['cancelled', 'rejected'])
            ->orderBy('appointment_date', 'asc')
            ->orderBy('start_time', 'asc')
            ->when($limit, function ($query) use ($limit) {
                $query->limit((int) $limit);
            })
            ->get();

            return response()->json([
                'success' => true,
                'appointments' => $appointments
            ]);


    }

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
                    'message' => "Staff doesn't belong to this company",
                ], 422);

            }   


                    /*
            |--------------------------------------------------------------------------
            | Check staff provides service
            |--------------------------------------------------------------------------
            */

            $staffProvideService = DB::table('staff_service')
                        ->where('staff_id', $staff->id)
                        ->where('service_id', $service->id)
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
        | Prepare requested appointment time
        |--------------------------------------------------------------------------
        */

        $requestedStart = Carbon::createFromFormat(
            'H:i',
            $validated['start_time']
        );

        $requestedEnd = $endTime->copy();


         /*
        |--------------------------------------------------------------------------
        | Check past date/time
        |--------------------------------------------------------------------------
        */

        $appointmentDateTime = Carbon::createFromFormat(
            'Y-m-d H:i',
            $validated['appointment_date'] . ' ' . $validated['start_time']
        );

        if($appointmentDateTime->isPast()) {
            return response()->json([
                'success' => false,
                'message' => 'You cannot book a past slot.',
            ], 422);
        }



        
                /*
        |--------------------------------------------------------------------------
        | Check staff working hours
        |--------------------------------------------------------------------------
        */

        $dayOfWeek = strtolower(
            Carbon::parse($validated['appointment_date'])->format('l')
        );

        $staffAvailability = StaffAvailability::where('staff_id', $staff->id)
            ->where('day_of_week', $dayOfWeek)
            ->first();
            

        if (!$staffAvailability || !$staffAvailability->is_working) {
            return response()->json([
                'success' => false,
                'message' => 'Staff is not working on this day.',
            ], 422);
        }

        $staffStart = Carbon::createFromFormat(
            'H:i:s',
            $staffAvailability->start_time
        );

        $staffEnd = Carbon::createFromFormat(
            'H:i:s',
            $staffAvailability->end_time
        );

                /*
        |--------------------------------------------------------------------------
        | Check staff break time
        |--------------------------------------------------------------------------
        */

        if (
            !empty($staffAvailability->break_start) &&
            !empty($staffAvailability->break_end)
        ) {
            $breakStart = Carbon::createFromFormat(
                'H:i:s',
                $staffAvailability->break_start
            );

            $breakEnd = Carbon::createFromFormat(
                'H:i:s',
                $staffAvailability->break_end
            );

            /*
            | Appointment overlaps break
            */

            if (
                $requestedStart->lt($breakEnd) &&
                $requestedEnd->gt($breakStart)
            ) {
                return response()->json([
                    'success' => false,
                    'message' => 'Selected time falls within staff break time.',
                    'data' => [
                        'break_start' => $staffAvailability->break_start,
                        'break_end' => $staffAvailability->break_end,
                    ],
                ], 422);
            }
        }

                /*
        |--------------------------------------------------------------------------
        | Check requested appointment is inside staff working hours
        |--------------------------------------------------------------------------
        */

        if (
            $requestedStart->lt($staffStart) ||
            $requestedEnd->gt($staffEnd)
        ) {
            return response()->json([
                'success' => false,
                'message' => 'Selected time is outside staff working hours.',
                'data' => [
                    'staff_working_start' => $staffAvailability->start_time,
                    'staff_working_end' => $staffAvailability->end_time,
                    'requested_start' => $requestedStart->format('H:i'),
                    'requested_end' => $requestedEnd->format('H:i'),
                ],
            ], 422);
        }
        /*
        |--------------------------------------------------------------------------
        | Check requested appointment is inside staff working hours
        |--------------------------------------------------------------------------
        */

        if (
            $requestedStart->lt($staffStart) ||
            $requestedEnd->gt($staffEnd)
        ) {
            return response()->json([
                'success' => false,
                'message' => 'Selected time is outside staff working hours.',
                'data' => [
                    'staff_working_start' => $staffAvailability->start_time,
                    'staff_working_end' => $staffAvailability->end_time,
                    'requested_start' => $requestedStart->format('H:i'),
                    'requested_end' => $requestedEnd->format('H:i'),
                ],
            ], 422);
        }

        /*
        |--------------------------------------------------------------------------
        | Create appointment inside transaction
        |--------------------------------------------------------------------------
        */

        $appointment = DB::transaction(function () use (
            $validated,
            $company,
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

                        
                $appointment = Appointment::create([
                    'company_id' => $validated['company_id'],
                    'customer_id' => $customer->id,
                    'staff_id' => $staff->id,
                    'service_id' => $service->id,
                    'appointment_date' => $validated['appointment_date'],
                    'start_time' => $validated['start_time'],
                    'end_time' => $endTime->format('H:i:s'),
                    'status' => 'pending'
                ]); 

                // payment create
                $appointment->payment()->create([
                    'amount' => $service->price,
                    'method' =>'cash',
                    'status' => 'unpaid',
                ]);

                // receipt record

                $receipt = $appointment->receipt()->create([
                    'payment_id' => $appointment->payment->id,
                    'receipt_number' => 'REC-' . strtoupper(uniqid()),
                ]);
                
                // Notification
                $customer->notify(
                new TimeoraNotification(
                    NotificationType::BOOKING_CREATED,
                    'Appointment Booking Confirmed',
                    'Your appointment has been successfully booked.',
                    [
                        'appointment_id' => $appointment->id,
                        'customer_name' => $customer->name,

                        'company_name' => $appointment->company?->name,

                        'staff_name' => $appointment->staff
                            ? $appointment->staff->first_name . ' ' . $appointment->staff->last_name
                            : null,

                        'service_name' => $appointment->service?->name,

                        'appointment_date' => $appointment->appointment_date,
                        'start_time' => $appointment->start_time,
                        'end_time' => $appointment->end_time,

                        'amount' => $appointment->payment?->amount,

                        'payment_method' => $appointment->payment?->method,

                        'payment_status' => $appointment->payment?->status,

                        'status' => $appointment->status,
                    ]
                )
            );

            
                // Notify company 
                $companyAdmin = User::where('company_id', $appointment->company_id)
                ->where('user_type', 'company_admin')
                ->first();

            if ($companyAdmin) {
                $companyAdmin->notify(
                    new TimeoraNotification(
                        NotificationType::BOOKING_CREATED,
                        'New Appointment Booking',
                        'A new appointment has been booked for your company.',
                        [
                            'appointment_id' => $appointment->id,

                            'customer_name' => $customer->name,

                            'company_name' => $appointment->company?->name,

                            'staff_name' => $appointment->staff
                                ? $appointment->staff->first_name . ' ' . $appointment->staff->last_name
                                : null,

                            'service_name' => $appointment->service?->name,

                            'appointment_date' => $appointment->appointment_date,
                            'start_time' => $appointment->start_time,
                            'end_time' => $appointment->end_time,

                            'amount' => $appointment->payment?->amount,

                            'payment_method' => $appointment->payment?->method,

                            'payment_status' => $appointment->payment?->status,

                            'status' => $appointment->status,
                        ]
                    )
                );
            }

            // 2. Staff notification
            $staff = $appointment->staff;

            if ($staff) {
                $staff->notify(
                    new TimeoraNotification(
                        NotificationType::BOOKING_CREATED,
                        'New Appointment Booking',
                        'A new appointment has been booked with you.',
                        [
                            'appointment_id' => $appointment->id,

                            'customer_name' => $customer->name,

                            'company_name' => $appointment->company?->name,

                            'staff_name' => $appointment->staff
                                ? $appointment->staff->first_name . ' ' . $appointment->staff->last_name
                                : null,

                            'service_name' => $appointment->service?->name,

                            'appointment_date' => $appointment->appointment_date,
                            'start_time' => $appointment->start_time,
                            'end_time' => $appointment->end_time,

                            'amount' => $appointment->payment?->amount,

                            'payment_method' => $appointment->payment?->method,

                            'payment_status' => $appointment->payment?->status,

                            'status' => $appointment->status,
                        ]
                    )
                );
            }

            



            

                return $appointment;

            });
      
                return response()->json([
                    'success' => true,
                    'message' => 'Appointment booked successfully.',
                    'data' => $appointment,
                ], 201);
    }

        /**
     * Get logged-in customer's appointments.
     */
    public function index(Request $request)
    {
        $customer = $request->user();

        $appointments = Appointment::with([
            'company:id,name',
            'staff:id,first_name,last_name',
            'service:id,name,duration',
        ])
            ->where('customer_id', $customer->id)
            ->latest('appointment_date')
            ->latest('start_time')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Customer appointments retrieved successfully.',
            'data' => $appointments,
        ]);
    }

        /**
     * Get single customer appointment.
     */
    public function singleShow(Request $request, $id)
    {
        $customer = $request->user();

        $appointment = Appointment::with([
            'company:id,name',
            'staff:id,first_name,last_name',
            'service:id,name,duration',
        ])
            ->where('customer_id', $customer->id)
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
    * Cancel customer appointment.
    */
    public function cancel(Request $request, $id)
    {
        $customer = $request->user();

        $appointment = Appointment::where('customer_id', $customer->id)
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


        $appointment->load([
            'company',
            'staff',
            'service',
            'payment',
        ]);

        $customer = User::find($appointment->customer_id);

        $companyAdmin = User::where('company_id', $appointment->company_id)
            ->where('user_type', 'company_admin')
            ->first();

        if ($companyAdmin) {
            $companyAdmin->notify(
                new TimeoraNotification(
                    NotificationType::BOOKING_CANCELLED,
                    'Appointment Cancelled',
                    'An appointment has been cancelled by the customer.',
                    [
                        'appointment_id' => $appointment->id,

                        'customer_name' => $customer?->name,

                        'company_name' => $appointment->company?->name,

                        'staff_name' => $appointment->staff
                            ? $appointment->staff->first_name . ' ' . $appointment->staff->last_name
                            : null,

                        'service_name' => $appointment->service?->name,

                        'appointment_date' => $appointment->appointment_date,

                        'start_time' => $appointment->start_time,

                        'end_time' => $appointment->end_time,

                        'amount' => $appointment->payment?->amount,

                        'payment_method' => $appointment->payment?->method,

                        'payment_status' => $appointment->payment?->status,

                        'status' => $appointment->status,
                    ]
                )
            );
        }

        $staff = $appointment->staff;

        if ($staff) {
            $staff->notify(
                new TimeoraNotification(
                    NotificationType::BOOKING_CANCELLED,
                    'Appointment Cancelled',
                    'An appointment assigned to you has been cancelled by the customer.',
                    [
                        'appointment_id' => $appointment->id,

                        'customer_name' => $customer?->name,

                        'company_name' => $appointment->company?->name,

                        'staff_name' => $appointment->staff
                            ? $appointment->staff->first_name . ' ' . $appointment->staff->last_name
                            : null,

                        'service_name' => $appointment->service?->name,

                        'appointment_date' => $appointment->appointment_date,

                        'start_time' => $appointment->start_time,

                        'end_time' => $appointment->end_time,

                        'amount' => $appointment->payment?->amount,

                        'payment_method' => $appointment->payment?->method,

                        'payment_status' => $appointment->payment?->status,

                        'status' => $appointment->status,
                    ]
                )
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'Appointment cancelled successfully.',
            'data' => $appointment->fresh(),
        ]);
    }


    public function markPaymentPaid($id)
    {
        $appointment = Appointment::find($id);

        if (!$appointment) {
            return response()->json([
                'message' => 'Appointment not found'
            ], 404);
        }

        $payment = $appointment->payment;

        if (!$payment) {
        return response()->json([
            'message' => 'Payment not found'
        ], 404);
        }

        if ($payment->status === 'paid') {
        return response()->json([
            'message' => 'Payment is already paid'
        ], 400);
        }

        $payment->update([
            'status' => 'paid',
            'paid_at' => now(),
            'received_by_type' => auth()->user() instanceof \App\Models\Staff
                ? 'staff'
                : auth()->user()->user_type,
            'received_by_id' => auth()->id(),
        ]);

        $appointment->load([
            'company',
            'staff',
            'service',
            'payment',
        ]);

        $customer = User::find($appointment->customer_id);

        if ($customer) {
            $customer->notify(
                new TimeoraNotification(
                    NotificationType::PAYMENT_PAID,
                    'Payment Received',
                    'Your appointment payment has been marked as paid.',
                    [
                        'appointment_id' => $appointment->id,

                        'customer_name' => $customer->name,

                        'company_name' => $appointment->company?->name,

                        'staff_name' => $appointment->staff
                            ? $appointment->staff->first_name . ' ' . $appointment->staff->last_name
                            : null,

                        'service_name' => $appointment->service?->name,

                        'appointment_date' => $appointment->appointment_date,

                        'start_time' => $appointment->start_time,

                        'end_time' => $appointment->end_time,

                        'amount' => $payment->amount,

                        'payment_method' => $payment->method,

                        'payment_status' => $payment->status,

                        'paid_at' => $payment->paid_at,

                        'status' => $appointment->status,
                    ]
                )
            );
        }



        $staff = $appointment->staff;

        if ($staff) {
            $staff->notify(
                new TimeoraNotification(
                    NotificationType::PAYMENT_PAID,
                    'Payment Received',
                    'Payment for an appointment assigned to you has been marked as paid.',
                    [
                        'appointment_id' => $appointment->id,

                        'customer_name' => $customer?->name,

                        'company_name' => $appointment->company?->name,

                        'staff_name' => $appointment->staff
                            ? $appointment->staff->first_name . ' ' . $appointment->staff->last_name
                            : null,

                        'service_name' => $appointment->service?->name,

                        'appointment_date' => $appointment->appointment_date,

                        'start_time' => $appointment->start_time,

                        'end_time' => $appointment->end_time,

                        'amount' => $payment->amount,

                        'payment_method' => $payment->method,

                        'payment_status' => $payment->status,

                        'paid_at' => $payment->paid_at,

                        'status' => $appointment->status,
                    ]
                )
            );
        }



        return response()->json([
            'message' => 'Payment marked as paid',
            'payment' => $payment
        ]);
    }

    public function payment($id)
    {
        $appointment = Appointment::find($id);

        if (!$appointment) {
            return response()->json([
                'message' => 'Appointment not found'
            ], 404);
        }

        $payment = $appointment->payment;

        if (!$payment) {
            return response()->json([
                'message' => 'Payment not found'
            ], 404);
        }

        return response()->json([
            'message' => 'Payment retrieved successfully',
            'payment' => $payment
        ]);
    }

    public function reschedule(Request $request, $id)
    {
        $validated = $request->validate([
            'appointment_date' => ['required', 'date', 'date_format:Y-m-d'],
            'start_time' => ['required', 'date_format:H:i'],
        ]);

        $customer = $request->user();

        /*
        |--------------------------------------------------------------------------
        | Find Customer Appointment
        |--------------------------------------------------------------------------
        */

        $appointment = Appointment::where('customer_id', $customer->id)
            ->find($id);

        if (!$appointment) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment not found.',
            ], 404);
        }

        /*
        |--------------------------------------------------------------------------
        | Appointment Status
        |--------------------------------------------------------------------------
        */

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

        /*
        |--------------------------------------------------------------------------
        | Related Records
        |--------------------------------------------------------------------------
        */

        $company = Company::find($appointment->company_id);
        $staff = Staff::find($appointment->staff_id);
        $service = Service::find($appointment->service_id);

        if (!$company) {
            return response()->json([
                'success' => false,
                'message' => 'Company not found.',
            ], 404);
        }

        if (!$staff) {
            return response()->json([
                'success' => false,
                'message' => 'Staff member not found.',
            ], 404);
        }

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Service not found.',
            ], 404);
        }

        /*
        |--------------------------------------------------------------------------
        | Calculate New Appointment Time
        |--------------------------------------------------------------------------
        */

        $startTime = Carbon::createFromFormat(
            'H:i',
            $validated['start_time']
        );

        $endTime = $startTime->copy()
            ->addMinutes((int) $service->duration);

        $appointmentDateTime = Carbon::createFromFormat(
            'Y-m-d H:i',
            $validated['appointment_date'] . ' ' . $validated['start_time']
        );

        /*
        |--------------------------------------------------------------------------
        | Past Date/Time Check
        |--------------------------------------------------------------------------
        */

        if ($appointmentDateTime->isPast()) {
            return response()->json([
                'success' => false,
                'message' => 'You cannot reschedule to a past date or time.',
            ], 422);
        }

        /*
        |--------------------------------------------------------------------------
        | Staff Service Validation
        |--------------------------------------------------------------------------
        */

        $staffProvidesService = DB::table('staff_service')
            ->where('staff_id', $staff->id)
            ->where('service_id', $service->id)
            ->exists();

        if (!$staffProvidesService) {
            return response()->json([
                'success' => false,
                'message' => 'This staff member does not provide the selected service.',
            ], 422);
        }

        /*
        |--------------------------------------------------------------------------
        | Day Of Week
        |--------------------------------------------------------------------------
        */

        $dayOfWeek = Carbon::createFromFormat(
            'Y-m-d',
            $validated['appointment_date']
        )->dayOfWeekIso;

        /*
        |--------------------------------------------------------------------------
        | Staff Availability
        |--------------------------------------------------------------------------
        */

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
        | Normalize Times
        |--------------------------------------------------------------------------
        */

        $requestedStart = $startTime->format('H:i:s');
        $requestedEnd = $endTime->format('H:i:s');

        $businessStart = Carbon::parse(
            $businessHours->opening_time
        )->format('H:i:s');

        $businessEnd = Carbon::parse(
            $businessHours->closing_time
        )->format('H:i:s');

        $staffStart = Carbon::parse(
            $availability->start_time
        )->format('H:i:s');

        $staffEnd = Carbon::parse(
            $availability->end_time
        )->format('H:i:s');

        /*
        |--------------------------------------------------------------------------
        | Common Working Window
        |--------------------------------------------------------------------------
        */

        $commonStart = max(
            $businessStart,
            $staffStart
        );

        $commonEnd = min(
            $businessEnd,
            $staffEnd
        );

        if (
            $requestedStart < $commonStart ||
            $requestedEnd > $commonEnd
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
            !empty($availability->break_start) &&
            !empty($availability->break_end)
        ) {
            $breakStart = Carbon::parse(
                $availability->break_start
            )->format('H:i:s');

            $breakEnd = Carbon::parse(
                $availability->break_end
            )->format('H:i:s');

            if (
                $requestedStart < $breakEnd &&
                $requestedEnd > $breakStart
            ) {
                return response()->json([
                    'success' => false,
                    'message' => 'Selected slot overlaps staff break time.',
                ], 422);
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Blocked Time
        |--------------------------------------------------------------------------
        */

        $blockedTimes = BlockedTime::where('staff_id', $staff->id)
            ->whereDate(
                'blocked_date',
                $validated['appointment_date']
            )
            ->get();

        foreach ($blockedTimes as $blocked) {

            $blockedStart = Carbon::parse(
                $blocked->start_time
            )->format('H:i:s');

            $blockedEnd = Carbon::parse(
                $blocked->end_time
            )->format('H:i:s');

            if (
                $requestedStart < $blockedEnd &&
                $requestedEnd > $blockedStart
            ) {
                return response()->json([
                    'success' => false,
                    'message' => 'Selected slot is blocked.',
                ], 422);
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Appointment Conflict Check
        |--------------------------------------------------------------------------
        */

        $conflict = Appointment::where('staff_id', $staff->id)
            ->whereDate(
                'appointment_date',
                $validated['appointment_date']
            )
            ->whereIn('status', [
                'pending',
                'accepted',
            ])
            ->where('id', '!=', $appointment->id)
            ->where(function ($query) use (
                $requestedStart,
                $requestedEnd
            ) {
                $query
                    ->where('start_time', '<', $requestedEnd)
                    ->where('end_time', '>', $requestedStart);
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
            'start_time' => $requestedStart,
            'end_time' => $requestedEnd,
            'status' => 'pending',
        ]);

                    $appointment->load([
                'company',
                'staff',
                'service',
                'payment',
            ]);

            $companyAdmin = User::where('company_id', $appointment->company_id)
                ->where('user_type', 'company_admin')
                ->first();

            if ($companyAdmin) {
                $companyAdmin->notify(
                    new TimeoraNotification(
                        NotificationType::BOOKING_RESCHEDULED,
                        'Appointment Rescheduled',
                        'An appointment has been rescheduled by the customer.',
                        [
                            'appointment_id' => $appointment->id,

                            'customer_name' => $customer?->name,

                            'company_name' => $appointment->company?->name,

                            'staff_name' => $appointment->staff
                                ? $appointment->staff->first_name . ' ' . $appointment->staff->last_name
                                : null,

                            'service_name' => $appointment->service?->name,

                            'appointment_date' => $appointment->appointment_date,

                            'start_time' => $appointment->start_time,

                            'end_time' => $appointment->end_time,

                            'amount' => $appointment->payment?->amount,

                            'payment_method' => $appointment->payment?->method,

                            'payment_status' => $appointment->payment?->status,

                            'status' => $appointment->status,
                        ]
                    )
                );
            }

                    $staff = $appointment->staff;

            if ($staff) {
                $staff->notify(
                    new TimeoraNotification(
                        NotificationType::BOOKING_RESCHEDULED,
                        'Appointment Rescheduled',
                        'An appointment assigned to you has been rescheduled.',
                        [
                            'appointment_id' => $appointment->id,

                            'customer_name' => $customer?->name,

                            'company_name' => $appointment->company?->name,

                            'staff_name' => $appointment->staff
                                ? $appointment->staff->first_name . ' ' . $appointment->staff->last_name
                                : null,

                            'service_name' => $appointment->service?->name,

                            'appointment_date' => $appointment->appointment_date,

                            'start_time' => $appointment->start_time,

                            'end_time' => $appointment->end_time,

                            'amount' => $appointment->payment?->amount,

                            'payment_method' => $appointment->payment?->method,

                            'payment_status' => $appointment->payment?->status,

                            'status' => $appointment->status,
                        ]
                    )
                );
            }



        /*
        |--------------------------------------------------------------------------
        | Response
        |--------------------------------------------------------------------------
        */

        return response()->json([
            'success' => true,
            'message' => 'Appointment rescheduled successfully.',
            'data' => $appointment->fresh(),
        ], 200);
    }   

    
    
    public function calendar(Request $request)
    {
        $validated = $request->validate([
            'start' => 'required|date',
            'end' => 'required|date|after_or_equal:start',
        ]);

        $customer = $request->user();

        $appointments = Appointment::with([
            'company:id,name',
            'staff:id,first_name,last_name',
            'service:id,name,duration',
        ])
            ->where('customer_id', $customer->id)
            ->whereBetween('appointment_date', [
                $validated['start'],
                $validated['end'],
            ])
            ->orderBy('appointment_date')
            ->orderBy('start_time')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Customer calendar retrieved successfully.',
            'data' => $appointments,
        ]);
    }
}