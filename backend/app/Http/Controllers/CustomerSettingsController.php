<?php

namespace App\Http\Controllers;

use App\Models\CustomerSetting;
use Illuminate\Http\Request;

class CustomerSettingsController extends Controller
{
    // Get settings
    public function show(Request $request)
    {
        $user = $request->user();

        $settings = CustomerSetting::firstOrCreate(
            ['user_id' => $user->id],
            [
                'email_notifications' => true,
                'appointment_reminders' => true,
                'booking_updates' => true,
                'cancellation_updates' => true,
            ]
        );

        return response()->json([
            'message' => 'Customer settings retrieved successfully.',
            'settings' => $settings
        ]);
    }

    // Update settings
    public function update(Request $request)
    {
        $validated = $request->validate([
            'email_notifications' => ['sometimes', 'boolean'],
            'appointment_reminders' => ['sometimes', 'boolean'],
            'booking_updates' => ['sometimes', 'boolean'],
            'cancellation_updates' => ['sometimes', 'boolean'],
        ]);

        $settings = CustomerSetting::firstOrCreate(
            ['user_id' => $request->user()->id],
            [
                'email_notifications' => true,
                'appointment_reminders' => true,
                'booking_updates' => true,
                'cancellation_updates' => true,
            ]
        );

        $settings->update($validated);

        return response()->json([
            'message' => 'Customer settings updated successfully.',
            'settings' => $settings->fresh()
        ]);
    }
}