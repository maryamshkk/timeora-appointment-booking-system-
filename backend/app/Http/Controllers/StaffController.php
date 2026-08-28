<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class StaffController extends Controller
{
     public function store(Request $request)
    {
        $request->validate([
            // Personal Information
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'photo_path' => 'nullable|image|max:2048',

            // Professional Information
            'role_id' => 'required|exists:roles,id',

            'service_ids' => 'required|array|min:1',
            'service_ids.*' => 'exists:services,id',

            // Contact Information
            'phone' => 'required|string|max:30',
             // Account Information
            'account_email' => 'required|email|max:150|unique:staff,account_email',

            
        ]);

        $companyId = auth()->user()->company_id;

        $staff = DB::transaction(function () use ($request, $companyId) {
        // Generate Staff ID
        $lastStaff = Staff::where('company_id', $companyId)
                ->latest('id')
                ->first();

        $number = $lastStaff ? ((int) str_replace('STF-', '', $lastStaff->staff_id))+1 : 1;

        $staffId = 'STF-' . str_pad($number, 4, '0', STR_PAD_LEFT);

        // Create staff
        $staff = Staff::create([
            'company_id' => $companyId,
            'staff_id' => $staffId,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'role_id' => $request->role_id,
            'phone' => $request->phone,
            'account_email' => $request->account_email,
            'status' => 'pending',
            'is_active' => true,
        ]);

        // Upload Photo 
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')
                    ->store('staff/photos', 'public');

                $staff->update([
                    'photo_path' => $path,
                ]);
        }

        // Assign services
        $staff->services()->sync($request->service_ids);

        return $staff;
    });

    return response()->json([
        'message' => 'Staff created Successfully',
        'data' => $staff
    ], 201);

    }
}
