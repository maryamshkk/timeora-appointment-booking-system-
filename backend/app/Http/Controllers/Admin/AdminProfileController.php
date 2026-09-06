<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminProfileController extends Controller
{
    /**
     * Get Super Admin profile
     */
    public function show(Request $request)
    {
        $admin = $request->user();

        return response()->json([
            'success' => true,
            'message' => 'Super Admin profile fetched successfully.',
            'data' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'email' => $admin->email,
                'status' => $admin->status,
                'last_login_at' => $admin->last_login_at,
                'created_at' => $admin->created_at,
                'updated_at' => $admin->updated_at,
            ],
            'errors' => null,
        ], 200);
    }


    /**
     * Update Super Admin profile
     */
    public function update(Request $request)
    {
        $admin = $request->user();

        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'email' => 'required|email|max:150|unique:super_admins,email,' . $admin->id,
        ]);

        $admin->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Super Admin profile updated successfully.',
            'data' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'email' => $admin->email,
                'status' => $admin->status,
                'last_login_at' => $admin->last_login_at,
                'created_at' => $admin->created_at,
                'updated_at' => $admin->updated_at,
            ],
            'errors' => null,
        ], 200);
    }


    /**
     * Change Super Admin password
     */
    public function updatePassword(Request $request)
    {
        $admin = $request->user();

        $validated = $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        if (!Hash::check(
            $validated['current_password'],
            $admin->password_hash
        )) {
            return response()->json([
                'success' => false,
                'message' => 'Current password is incorrect.',
                'data' => null,
                'errors' => null,
            ], 422);
        }

        $admin->update([
            'password_hash' => Hash::make(
                $validated['new_password']
            ),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Password updated successfully.',
            'data' => null,
            'errors' => null,
        ], 200);
    }
    
}