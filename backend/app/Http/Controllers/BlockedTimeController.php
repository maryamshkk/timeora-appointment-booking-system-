<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Staff;
use App\Models\BlockedTime;

class BlockedTimeController extends Controller
{
    //  Get Blocked timings 
    public function index(Request $request, $staffId)
    {
        $companyId = $request->user()->company_id;

        $staff = Staff::where('id', $staffId)
            ->where('company_id', $companyId)
            ->firstOrFail();

        $blockedTimes = BlockedTime::where('staff_id', $staff->id)
            ->orderBy('blocked_date')
            ->orderBy('start_time')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $blockedTimes,
        ], 200);
    }

     //  Post Blocked timings 
    public function store(Request $request, $staffId)
    {
        $companyId = $request->user()->company_id;

        $staff = Staff::where('id', $staffId)
            ->where('company_id', $companyId)
            ->firstOrFail();

        $validated = $request->validate([
            'blocked_date' => [
                'required',
                'date',
            ],

            'start_time' => [
                'required',
                'date_format:H:i',
            ],

            'end_time' => [
                'required',
                'date_format:H:i',
            ],

            'reason' => [
                'nullable',
                'string',
                'max:255',
            ],
            ]);

            $overlap = BlockedTime::where('staff_id', $staff->id)
                    ->where('blocked_date', $validated['blocked_date'])
                    ->where(function ($query) use ($validated){
                        $query
                        ->where('start_time', '<', $validated['end_time'])
                        ->where('end_time', '>', $validated['start_time']);
                    })
                    ->exists();
            
            if ($overlap) {
                return response()->json([
                    'success' => false,
                    'message' => 'This blocked time overlaps an existing blocked period.',
                ], 422);
            }

        $blockedTime = BlockedTime::create([
            'staff_id' => $staff->id,
            'blocked_date' => $validated['blocked_date'],
            'start_time' => $validated['start_time'],
            'end_time' => $validated['end_time'],
            'reason' => $validated['reason'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Blocked time created successfully.',
            'data' => $blockedTime,
        ], 201);
    
    }

     //  Update Blocked timings 
    public function update(Request $request, $staffId, $blockedTimeId)
    {
        $companyId = $request->user()->company_id;

        $staff = Staff::where('id', $staffId)
            ->where('company_id', $companyId)
            ->firstOrFail();

        $blockedTime = BlockedTime::where('id', $blockedTimeId)
            ->where('staff_id', $staff->id)
            ->firstOrFail();

        $validated = $request->validate([
            'blocked_date' => [
                'required',
                'date',
            ],

            'start_time' => [
                'required',
                'date_format:H:i',
            ],

            'end_time' => [
                'required',
                'date_format:H:i',
            ],

            'reason' => [
                'nullable',
                'string',
                'max:255',
                ],
            ]);

            if ($validated['start_time'] >= $validated['end_time']) {
            return response()->json([
                'success' => false,
                'message' => 'Start time must be before end time.',
            ], 422);
        }

            $overlap = BlockedTime::where('staff_id', $staff->id)
                    ->where('blocked_date', $validated['blocked_date'])
                    ->where('id', '!=', $blockedTime->id)
                    ->where(function ($query) use ($validated){
                        $query
                        ->where('start_time', '<', $validated['end_time'])
                        ->where('end_time', '>', $validated['start_time']);
                    })
                    ->exists();
            
            if ($overlap) {
                return response()->json([
                    'success' => false,
                    'message' => 'This blocked time overlaps an existing blocked period.',
                ], 422);
            }

        $blockedTime->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Blocked time created successfully.',
            'data' => $blockedTime,
        ], 201);
    }

    // Delete slot
    public function destroy(
        Request $request,
        $staffId,
        $blockedTimeId
    ) {
        $companyId = $request->user()->company_id;

        $staff = Staff::where('id', $staffId)
            ->where('company_id', $companyId)
            ->firstOrFail();

        $blockedTime = BlockedTime::where('id', $blockedTimeId)
            ->where('staff_id', $staff->id)
            ->firstOrFail();

        $blockedTime->delete();

        return response()->json([
            'success' => true,
            'message' => 'Blocked time deleted successfully.',
        ]);
    }

}
