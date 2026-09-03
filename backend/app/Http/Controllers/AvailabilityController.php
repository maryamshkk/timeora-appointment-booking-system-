<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\Staff;
use App\Models\StaffAvailability;
use App\Models\BusinessWorkingHour;
use App\Http\AppointmentController;
use App\Models\BlockedTime;
use App\Models\Appointment;
use App\Models\Service;
use App\Models\Holiday;
use Carbon\Carbon;

class AvailabilityController extends Controller
{
    
    // 1. Get availability
    public function index(Request $request)
    {
         // 1. Validate request
        $validated = $request->validate([
        'company_id' => [
            'required',
            'integer',
            'exists:companies,id',
        ],

        'staff_id' => [
            'required',
            'integer',
            'exists:staff,id',
        ],

        'service_id' => [
            'required',
            'integer',
            'exists:services,id',
        ],

        'date' => [
            'required',
            'date',
            'date_format:Y-m-d',
        ],
    ]);

            // 2. Find company
            $company = Company::findOrFail(
                    $validated['company_id']
                );

            // 3. Verify staff belongs to company
            $staff = Staff::where('id', $validated['staff_id'])
                        ->where('company_id', $company->id)
                    ->first();

                if (!$staff) {
                    return response()->json([
                        'success' => false,
                        'message' => 'The selected staff member does not belong to this company.',
                    ], 422);
            }

            // 4. Verify service belongs to company
            $service = Service::where('id', $validated['service_id'])
                ->where('company_id', $company->id)
                ->first();

                if (!$service) {
                    return response()->json([
                        'success' => false,
                        'message' => 'The selected service does not belong to this company.',
                    ], 422);
            }

            // 5. Verify staff is assigned to service
            $staffHasService = $staff->services()
                    ->where('services.id', $service->id)
                    ->exists();

            if(!$staffHasService) {
                return response()->json([
                    'success' => false,
                    'message' => 'The selected service is not assigned to this staff member.',
                ], 422);
            }

            // 6. Get date and day of week
            $date = Carbon::createFromFormat(
                'Y-m-d',
                $validated['date']
            );

            $dayOfWeek = $date->dayOfWeek;




                            // 10. Check company hours
                $businessHours = BusinessWorkingHour::where('company_id', $company->id)
                    ->where('day_of_week', $dayOfWeek)
                    ->first();

                if (!$businessHours || !$businessHours->is_open) {
                    return response()->json([
                        'success' => true,
                        'message' => 'Company is closed on this day.',
                        'data' => [
                            'date' => $validated['date'],
                            'day_of_week' => $dayOfWeek,
                            'is_working' => false,
                            'slots' => [],
                        ],
                    ]);
                }


                // 11. Check holidays
                $holiday = Holiday::where('company_id', $company->id)
                    ->whereDate('holiday_date', $validated['date'])
                    ->first();

                if ($holiday) {
                    return response()->json([
                        'success' => true,
                        'message' => 'Company is closed because of a holiday.',
                        'data' => [
                            'date' => $validated['date'],
                            'day_of_week' => $dayOfWeek,
                            'is_working' => false,
                            'slots' => [],
                        ],
                    ]);
                }


                // 12. Get staff availability
                $availability = StaffAvailability::where('staff_id', $staff->id)
                    ->where('day_of_week', $dayOfWeek)
                    ->first();

                if (!$availability || !$availability->is_working) {
                    return response()->json([
                        'success' => true,
                        'message' => 'Staff has no availability for this day.',
                        'data' => [
                            'date' => $validated['date'],
                            'day_of_week' => $dayOfWeek,
                            'is_working' => false,
                            'slots' => [],
                        ],
                    ]);
                }


                // Staff schedule
                $staffStartTime = $availability->start_time;
                $staffEndTime = $availability->end_time;

                $staffBreakStart = $availability->break_start;
                $staffBreakEnd = $availability->break_end;


                // 13. Calculate common working window
                $startTime = max(
                    $businessHours->opening_time,
                    $staffStartTime
                );

                $endTime = min(
                    $businessHours->closing_time,
                    $staffEndTime
                );


                // No common working time
                if ($startTime >= $endTime) {
                    return response()->json([
                        'success' => true,
                        'message' => 'No common working time available.',
                        'data' => [
                            'date' => $validated['date'],
                            'day_of_week' => $dayOfWeek,
                            'is_working' => false,
                            'slots' => [],
                        ],
                    ]);
                }


                // 14. Generate slots
                $slots = [];

                $current = Carbon::parse(
                    $validated['date'] . ' ' . $startTime
                );

                $end = Carbon::parse(
                    $validated['date'] . ' ' . $endTime
                );

                while (
                    $current->copy()
                        ->addMinutes($service->duration)
                        ->lte($end)
                ) {

                    $slotStart = $current->copy();

                    $slotEnd = $current->copy()
                        ->addMinutes($service->duration);

                    $slots[] = [
                        'start_time' => $slotStart->format('H:i'),
                        'end_time' => $slotEnd->format('H:i'),
                    ];

                    $current->addMinutes($service->duration);
                }


                // 15. Remove break-time slots
                $slots = array_filter(
                    $slots,
                    function ($slot) use (
                        $staffBreakStart, $staffBreakEnd
                    ) {

                        if (!$staffBreakStart || !$staffBreakEnd) {
                            return true;
                        }

                        return !(
                            $slot['start_time'] < $staffBreakEnd &&
                            $slot['end_time'] > $staffBreakStart
                        );
                    }
                );


                // 16. Get blocked times
                $blockedTimes = BlockedTime::where('staff_id', $staff->id)
                    ->whereDate('blocked_date', $validated['date'])
                    ->get();


                // 17. Remove blocked-time slots
                $slots = array_filter($slots, function ($slot) use (
    $blockedTimes,
    $validated
) {

    $slotStart = Carbon::parse(
        $validated['date'] . ' ' . $slot['start_time']
    );

    $slotEnd = Carbon::parse(
        $validated['date'] . ' ' . $slot['end_time']
    );

    foreach ($blockedTimes as $blocked) {

        $blockedStart = Carbon::parse(
            $validated['date'] . ' ' . $blocked->start_time
        );

        $blockedEnd = Carbon::parse(
            $validated['date'] . ' ' . $blocked->end_time
        );

        if (
            $slotStart->lt($blockedEnd) &&
            $slotEnd->gt($blockedStart)
        ) {
            return false;
        }
    }

    return true;
});

                // 18. Reset array indexes
                $slots = array_values($slots);

                // 19. Remove past slots
                $now = Carbon::now();

                if ($validated['date'] === $now->format('Y-m-d')) {
                    $slots = array_filter(
                        $slots,
                        function ($slot) use ($now, $validated) {

                            $slotEnd = Carbon::parse(
                                $validated['date'] . ' ' . $slot['end_time']
                            );

                            return $slotEnd->gt($now);
                        }
                    );

                    $slots = array_values($slots);
                }

            
                            
            // // // Get booked appointments
            $appointments = Appointment::where('staff_id', $staff->id)
                ->whereDate('appointment_date', $validated['date'])
                ->whereIn('status', 
                    ['pending', 'accepted'
                    ])
                ->get();


            // Remove booked slots
            $slots = array_filter($slots, function ($slot) use ($appointments, $validated) {

                $slotStart = Carbon::parse($validated['date'].''. $slot['start_time']
                ); 
                
                $slotEnd = Carbon::parse(
                    $validated['date'] . ' ' . $slot['end_time']
                );

                foreach ($appointments as $appointment) {


                    $appointmentStart = Carbon::parse(
                        $validated['date'] . ' ' . $appointment->start_time
                    );
                    $appointmentEnd = Carbon::parse(
                        $validated['date'] . ' ' . $appointment->end_time
                    );

                    // Overlap
                        if (
                            $slotStart->lt($appointmentEnd) &&
                            $slotEnd->gt($appointmentStart)
                        ) {
                            return false;
                        }
                    }

                return true;
            });

            // 22. Reset array indexes
            $slots = array_values($slots);

            // 19. Return availability
                return response()->json([
                    'success' => true,
                    'message' => 'Staff availability found.',
                    'data' => [
                        'date' => $validated['date'],
                        'day_of_week' => $dayOfWeek,

                        'is_working' => true,

                        'company' => [
                            'start_time' => $businessHours->opening_time,
                            'end_time' => $businessHours->closing_time,
                        ],

                        'staff' => [
                            'start_time' => $staffStartTime,
                            'end_time' => $staffEndTime,
                            'break_start' => $staffBreakStart,
                            'break_end' => $staffBreakEnd,
                        ],

                        'working_window' => [
                            'start_time' => $startTime,
                            'end_time' => $endTime,
                        ],

                        'slots' => $slots,
                    ],
                ]);
                    }
}