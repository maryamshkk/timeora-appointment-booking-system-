<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AvailabilityException;
use App\Models\Staff;


class AvailabilityExceptionController extends Controller
{
    // Get availability exception row
    public function index(Request $request, $staffId)
    {
        $companyId = $request->user()->company_id;

        $staff = Staff::where('id', $staffId)
            ->where('company_id', $companyId)
            ->firstOrFail();

        $exceptions = AvailabilityException::where('staff_id', $staff->id)
            ->orderBy('exception_date')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $exceptions,
        ]);
    }
    // Create availability exception row
    public function store(Request $request, $staffId)
    {
        $companyId = $request->user()->company_id;

        $staff = Staff::where('id', $staffId)
            ->where('company_id', $companyId)
            ->firstOrFail();

        $validated = $request->validate([
            'exception_date' => [
                'required',
                'date',
            ],

            'is_working' => [
                'required',
                'boolean',
            ],

            'start_time' => [
                'nullable',
                'date_format:H:i',
            ],

            'end_time' => [
                'nullable',
                'date_format:H:i',
            ],

            'break_start' => [
                'nullable',
                'date_format:H:i',
            ],

            'break_end' => [
                'nullable',
                'date_format:H:i',
            ],

            'reason' => [
                'nullable',
                'string',
                'max:255',
            ],
        ]);

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

            $exists = AvailabilityException::where('staff_id', $staff->id)
            ->where('exception_date', $validated['exception_date'])
            ->exists();

            if ($exists) {
                return response()->json([
                    'success' => false,
                    'message' => 'An availability exception already exists for this date.',
                ], 422);
            }

            $exception = AvailabilityException::create([
                'staff_id' => $staff->id,
                'exception_date' => $validated['exception_date'],
                'is_working' => $validated['is_working'],
                'start_time' => $validated['is_working'] ? $validated['start_time'] : null,
                'end_time' => $validated['is_working'] ? $validated['end_time'] : null,
                'break_start' => $validated['is_working'] ? $validated['break_start'] : null,
                'break_end' => $validated['is_working'] ? $validated['break_end'] : null,
                'reason' => $validated['reason'] ?? null,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Availability exception created successfully.',
                'data' => $exception,
            ], 201);
    }
}
