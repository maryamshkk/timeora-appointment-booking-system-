<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CompanySetting;


class CompanySettingsController extends Controller
{
    // get settings data
    public function show(Request $request)
    {
        $user = $request->user();

        $company = $user->company;

        if (!$company) {
            return response()->json([
                'message' => 'Company not found.'
            ], 404);
        }

        $settings = CompanySetting::firstOrCreate(
            ['company_id' => $company->id],
            [
                'timezone' => 'Asia/Karachi',
                'booking_enabled' => true,
                'auto_accept_appointments' => false,
                'email_notifications' => true,
                'appointment_reminders' => true,
                'booking_updates' => true,
                'cancellation_updates' => true,
            ]
        );

        return response()->json([
            'message' => 'Company settings retrieved successfully.',
            'settings' => $settings
        ]);
    }

      public function update(Request $request)
    {
        $user = $request->user();

        $company = $user->company;

        if (!$company) {
            return response()->json([
                'message' => 'Company not found.'
            ], 404);
        }

        $validated = $request->validate([
            'timezone' => ['sometimes', 'string', 'max:100'],

            'booking_enabled' => ['sometimes', 'boolean'],

            'auto_accept_appointments' => ['sometimes', 'boolean'],

            'email_notifications' => ['sometimes', 'boolean'],

            'appointment_reminders' => ['sometimes', 'boolean'],

            'booking_updates' => ['sometimes', 'boolean'],

            'cancellation_updates' => ['sometimes', 'boolean'],
        ]);

        $settings = CompanySetting::firstOrCreate(
            ['company_id' => $company->id]
        );

        $settings->update($validated);

        return response()->json([
            'message' => 'Company settings updated successfully.',
            'settings' => $settings->fresh()
        ]);
    }
}
