<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use App\Models\StaffAvailability;
use Illuminate\Http\Request;

class StaffAvailabilityController extends Controller
{
    // GET AVAILABILITY
    public function index(Request $request, $staffId)
    {
        $companyId = $request->user()->company_id;

        $staff = Staff::where('id', $staffId)
            ->where('company_id', $companyId)
            ->firstOrFail();

        $availability = StaffAvailability::where('staff_id', $staff->id)
                    ->orderBy('day_of_week')
                    ->get();

        return response()->json([
            'sucsess' => true,
            'data' => $availability,
        ]);
    }

    // POST AVAILABILITY
    public function store(Request $request, $staffId)
    {
        $companyId = $request->user()->company_id;

        $staff = Staff::where('id', $staffId)
            ->where('company_id', $companyId)
            ->firstOrFail();

        $validated = $request->validate([
            'availability' => 'required|array|size:7',

            'availability.*.day_of_week' => [
                'required',
                'integer',
                'between:0,6',
            ],

            'availability.*.is_working' => [
                'required',
                'boolean',
            ],

            'availability.*.start_time' => [
                'nullable',
                'date_format:H:i',
            ],

            'availability.*.end_time' => [
                'nullable',
                'date_format:H:i',
            ],

            'availability.*.break_start' => [
                'nullable',
                'date_format:H:i',
            ],

            'availability.*.break_end' => [
                'nullable',
                'date_format:H:i',
            ],
        ]);

        foreach ($validated['availability'] as $day) {

            // Working day validation
            if ($day['is_working']) {
                
                if (!$day['start_time'] || !$day['end_time']) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Start and end time are required.',
                    ], 422);
                }
                // if not early start time
                if ($day['start_time'] >= $day['end_time']) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Start time must be before end time.',
                    ], 422);
                }
            }

            // Break validation
            if($day['break_start'] && $day['break_end']) 
            {
                if ($day['break_start'] >= $day['break_end']) {
                
                    return response()->json([
                        'success' => false,
                        'message' => 'Break start must be before break end.',
                    ], 422);
                }

                if (
                    $day['break_start'] < $day['start_time'] ||
                    $day['break_end'] > $day['end_time']
                ) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Break must be within working hours.',
                    ], 422);
                }

            }

            // If day is not working, remove times
            if (!$day['is_working']) {

                $day['start_time'] = null;
                $day['end_time'] = null;
                $day['break_start'] = null;
                $day['break_end'] = null;

            }

            // Create or update availability
            StaffAvailability::updateOrCreate(
            [
                'staff_id' => $staff->id,
                'day_of_week' => $day['day_of_week'],
            ],
            [
                'is_working' => $day['is_working'],
                'start_time' => $day['start_time'],
                'end_time' => $day['end_time'],
                'break_start' => $day['break_start'],
                'break_end' => $day['break_end'],
            ]
            ); 
        }


        return response()->json([
                'success' => true,
                'message' => 'Staff avalability created successfully',
                'data' => $staff->availability()->get(),
            ], 201);
    }

    // Update single user availabiity
    public function update(Request $request, $staffId, $availabilityId)
    {
        $companyId = $request->user()->company_id;

        $staff = Staff::where('id', $staffId)
            ->where('company_id', $companyId)
            ->firstOrFail();

        $availability = StaffAvailability::where('id', $availabilityId)
            ->where('staff_id', $staff->id)
            ->firstOrFail();

        $validated = $request->validate([
            'day_of_week' => 'required|integer|between:0,6',
            'is_working' => 'required|boolean',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i',
            'break_start' => 'nullable|date_format:H:i',
            'break_end' => 'nullable|date_format:H:i',
            ]);

        // Working day validation
        if ($validated['is_working']) {

        if (!$validated['start_time'] || !$validated['end_time']) {
            return response()->json([
                'success' => false,
                'message' => 'Start and end time are required.',
            ], 422);
        }

        if ($validated['start_time'] >= $validated['end_time']) {
            return response()->json([
                'success' => false,
                'message' => 'Start time must be before end time.',
            ], 422);
        }
        }

        // Break validation
        if ($validated['break_start'] && $validated['break_end']) {

        if ($validated['break_start'] >= $validated['break_end']) {
            return response()->json([
                'success' => false,
                'message' => 'Break start must be before break end.',
            ], 422);
        }

        if (
            $validated['break_start'] < $validated['start_time'] ||
            $validated['break_end'] > $validated['end_time']
            ) {
            return response()->json([
                'success' => false,
                'message' => 'Break must be within working hours.',
            ], 422);
        }
        }

        // If day is off
        if (!$validated['is_working']) {
            $validated['start_time'] = null;
            $validated['end_time'] = null;
            $validated['break_start'] = null;
            $validated['break_end'] = null;
        }

        $availability->update([
            'day_of_week' => $validated['day_of_week'],
            'is_working' => $validated['is_working'],
            'start_time' => $validated['start_time'],
            'end_time' => $validated['end_time'],
            'break_start' => $validated['break_start'],
            'break_end' => $validated['break_end'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Staff availability updated successfully.',
            'data' => $availability,
        ], 200);
    }

    // update all 7
    public function updateAll(Request $request, $staffId)
    {
        $companyId = $request->user()->company_id;

        $staff = Staff::where('id', $staffId)
            ->where('company_id', $companyId)
            ->firstOrFail();

        $validated = $request->validate([
            'availability' => 'required|array|size:7',

            'availability.*.day_of_week' => [
            'required',
            'integer',
            'between:0,6',
            ],

            'availability.*.is_working' => [
                'required',
                'boolean',
            ],

            'availability.*.start_time' => [
                'nullable',
                'date_format:H:i',
            ],

            'availability.*.end_time' => [
                'nullable',
                'date_format:H:i',
            ],

            'availability.*.break_start' => [
                'nullable',
                'date_format:H:i',
            ],

            'availability.*.break_end' => [
                'nullable',
                'date_format:H:i',
            ],
        ]);

        foreach ($validated['availability'] as $day) {

                // Working day
                if ($day['is_working']) {

                    if (!$day['start_time'] || !$day['end_time']) {
                        return response()->json([
                            'success' => false,
                            'message' => 'Start and end time are required.',
                        ], 422);
                    }

                    if ($day['start_time'] >= $day['end_time']) {
                        return response()->json([
                            'success' => false,
                            'message' => 'Start time must be before end time.',
                            ], 422);
                            }
                    }

                    // Break
                    if ($day['break_start'] && $day['break_end']) {

                        if ($day['break_start'] >= $day['break_end']) {
                            return response()->json([
                                'success' => false,
                                'message' => 'Break start must be before break end.',
                            ], 422);
                        }

                        if (
                            $day['break_start'] < $day['start_time'] ||
                            $day['break_end'] > $day['end_time']
                        ) {
                            return response()->json([
                                'success' => false,
                                'message' => 'Break must be within working hours.',
                            ], 422);
                        }
                    }

                    // If day is off
                    if (!$day['is_working']) {
                        $day['start_time'] = null;
                        $day['end_time'] = null;
                        $day['break_start'] = null;
                        $day['break_end'] = null;
                    }
        

            // Update existing day or create if missing
            StaffAvailability::updateOrCreate(
                [
                    'staff_id' => $staff->id,
                    'day_of_week' => $day['day_of_week'],
                ],
                [
                    'is_working' => $day['is_working'],
                    'start_time' => $day['start_time'],
                    'end_time' => $day['end_time'],
                    'break_start' => $day['break_start'],
                    'break_end' => $day['break_end'],
                ]
            );
            }

            return response()->json([
                'success' => true,
                'message' => 'Staff Availability Updated Successfully',
                'data' => $staff->availability()->get(),
            ], 200);
    }

    // Delete one availability 
    public function destroy(Request $request, $staffId)
    {
        $companyId = $request->user()->company_id;

        $staff = Staff::where('id', $staffId)
            ->where('company_id', $companyId)
            ->firstOrFail();

        StaffAvailability::where('staff_id', $staff->id)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Staff availability deleted successfully.',
        ], 200);
    }
}
