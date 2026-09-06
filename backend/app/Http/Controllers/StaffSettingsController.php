<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StaffSetting;

class StaffSettingsController extends Controller
{
    // get all settings 
    public function show(Request $request)
    {
        $staff = $request->user();


        if (!$staff) {
            return response()->json([
                'message' => 'Staff profile not found.'
            ], 404);
        }

        $settings = StaffSetting::firstOrCreate(
            ['staff_id' => $staff->id],
            [
                'email_notifications' => true,
                'appointment_reminders' => true,
                'booking_updates' => true,
                'cancellation_updates' => true,
            ]
        );

        return response()->json([
            'message' => 'Staff settings retrieved successfully.',
            'settings' => $settings
        ]);
    }


    // update notifications
    public function update(Request $request)
    {
        $staff = $request->user();


        if (!$staff) {
            return response()->json([
                'message' => 'Staff profile not found.'
            ], 404);
        }

        $validated = $request->validate([
            'email_notifications' => ['sometimes', 'boolean'],
            'appointment_reminders' => ['sometimes', 'boolean'],
            'booking_updates' => ['sometimes', 'boolean'],
            'cancellation_updates' => ['sometimes', 'boolean'],
        ]);

        $settings = StaffSetting::firstOrCreate(
            ['staff_id' => $staff->id]
        );

        $settings->update($validated);

        return response()->json([
            'message' => 'Staff settings updated successfully.',
            'settings' => $settings->fresh()
        ]);
    }


}
