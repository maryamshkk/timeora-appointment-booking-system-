<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Models\SuperAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class SuperAdminAuthController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $superAdmin = SuperAdmin::where(
            'email',
            $validated['email']
        )->first();

        if (!$superAdmin) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials.',
            ], 401);
        }

        if ($superAdmin->status !== 'active') {
            return response()->json([
                'success' => false,
                'message' => 'Super Admin account is disabled.',
            ], 403);
        }

        if (!Hash::check(
            $validated['password'],
            $superAdmin->password_hash
        )) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials.',
            ], 401);
        }

        $superAdmin->update([
            'last_login_at' => now(),
        ]);

        $token = $superAdmin->createToken(
            'super-admin-token'
        )->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Super Admin login successful.',

            'data' => [
                'super_admin' => [
                    'id' => $superAdmin->id,
                    'name' => $superAdmin->name,
                    'email' => $superAdmin->email,
                    'status' => $superAdmin->status,
                ],

                'token' => $token,
            ],
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Super Admin logged out successfully.',
        ]);
    }
}
