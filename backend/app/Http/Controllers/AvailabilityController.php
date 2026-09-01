<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\Staff;
use App\Models\StaffAvailability;
use App\Models\Service;
use Carbon\Carbon;



class AvailabilityController extends Controller
{
    // Get availability
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

                // 6. Determine day
                $date = Carbon::createFromFormat(
                    'Y-m-d',
                    $validated['date']
                );

                $dayOfWeek = $date->dayOfWeek;

                // 7. Get staff availability
                $availability = StaffAvailability::where('staff_id', $staff->id)
                        ->where('day_of_week', $dayOfWeek)
                        ->first();
                    // 8. No availability
                    if (!$availability) {
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

                     // 9. Day off
                    if (!$availability->is_working) {
                        return response()->json([
                            'success' => true,
                            'message' => 'Staff is not working on this day.',
                            'data' => [
                                'date' => $validated['date'],
                                'day_of_week' => $dayOfWeek,
                                'is_working' => false,
                                'slots' => [],
                            ],
                        ]);
                    }

           // 10. Temporary response
            return response()->json([
                'success' => true,
                'message' => 'Staff availability found.',
                'data' => [
                    'date' => $validated['date'],
                    'day_of_week' => $dayOfWeek,
                    'is_working' => $availability->is_working,
                    'start_time' => $availability->start_time,
                    'end_time' => $availability->end_time,
                    'break_start' => $availability->break_start,
                    'break_end' => $availability->break_end,
                ],
            ]);
    }

}
