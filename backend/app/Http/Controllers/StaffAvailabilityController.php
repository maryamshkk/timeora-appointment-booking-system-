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
}
