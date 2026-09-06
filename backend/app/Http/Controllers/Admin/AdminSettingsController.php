<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminSetting;
use Illuminate\Http\Request;

class AdminSettingsController extends Controller
{
    /**
     * Get platform settings
     */
    public function show()
    {
        $settings = AdminSetting::first();

        if (!$settings) {
            $settings = AdminSetting::create([
                'platform_name' => 'TIMEORA',
                'timezone' => 'Asia/Karachi',
                'email_notifications' => true,
                'system_notifications' => true,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Admin settings fetched successfully.',
            'data' => $settings,
            'errors' => null,
        ], 200);
    }

    /**
     * Update platform settings
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'platform_name' => 'required|string|max:150',

            'support_email' => 'nullable|email|max:150',

            'support_phone' => 'nullable|string|max:50',

            'timezone' => 'required|string|max:100',

            'email_notifications' => 'required|boolean',

            'system_notifications' => 'required|boolean',
        ]);

        $settings = AdminSetting::first();

        if (!$settings) {
            $settings = AdminSetting::create($validated);
        } else {
            $settings->update($validated);
        }

        return response()->json([
            'success' => true,
            'message' => 'Admin settings updated successfully.',
            'data' => $settings->fresh(),
            'errors' => null,
        ], 200);
    }
  
}
