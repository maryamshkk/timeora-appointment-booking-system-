<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class StaffController extends Controller
{
    // GET STAFF DATA
    public function index()
    {
        $staff = Staff::where(
            'company_id',
            auth()->user()->company_id,
        )
        ->with('role', 'services')
        ->get();

        return response()->json([
            'success' => true,
            'message' => 'Staff fetched successfully.',
            'data' => $staff,
        ]);
    }

    // CREATE STAFF MEMBER
    public function store(Request $request)
    {
        $companyId = auth()->user()->company_id;

        $request->validate([
            // Personal Information
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'photo' => 'nullable|image|max:2048',

            // Professional Information
            
            'role_id' => [
                'required',
                Rule::exists('roles','id')
                    ->where(function ($query) use ($companyId){
                    $query->where('company_id', $companyId);
                }),
            ],
            
            'service_ids' => ['nullable', 'array'],

            'service_ids.*' => [
                    Rule::exists('services', 'id')
                    ->where(function ($query) use ($companyId){
                    $query->where('company_id', $companyId);
                    }),
                ],

            // Contact Information
            'phone' => 'required|string|max:30',
             // Account Information
            'account_email' => 'required|email|max:150|unique:staff,account_email',

            // Availability
            'availability' => 'required|array|min:1',

            'availability.*.day_group' => 'required|string|max:20',

            'availability.*.start_time' => ['nullable', 'date_format:H:i'],

            'availability.*.end_time' => ['nullable', 'date_format:H:i'],

            'availability.*.is_off' => 'required|boolean',
        ]);

            $staff = DB::transaction(function () use ($request, $companyId) {
            
            // Generate Staff ID
            $lastStaff = Staff::where('company_id', $companyId)
                    ->latest('id')
                    ->first();

            $number = $lastStaff 
                        ? ((int) str_replace('STF-', '', $lastStaff->staff_id))+1 
                        : 1;

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

            //Create Availability
            foreach($request->availability as $availability){
                
                $staff->availability()->create([
                    'day_group' => $availability['day_group'],
                    'start_time' => $availability['start_time'] ?? null,
                    'end_time' => $availability['end_time'] ?? null,
                    'is_off' => $availability['is_off'],
                ]);
            }

            return $staff;
            });

        return response()->json([
            'sucsess' => true,
            'message' => 'Staff created Successfully',
            'data' => $staff->load(
                'role',
                'services',
                'availability'
            )
        ], 201);

    }

    // GET SINGLE STAFF RECORD 
    public function show($id)
    {
        $staff = Staff::where(
            'company_id',
            auth()->user()->company_id
        )
        ->with('role', 'services', 'availability')
        ->find($id);

        if (!$staff) {
            return response()->json([
                'success' => false,
                'message' => 'Staff not found.',
                'data' => null,
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Staff fetched successfully.',
            'data' => $staff,
        ], 200);


    }

    // UPDATE STAFF MEMBER 
    public function update(Request $request, $id)
    {
        $companyId = auth()->user()->company_id;

        $staff = Staff::where('company_id', $companyId)->find($id);

        if(!$staff) {
            return response()->json([
                'success' => false,
                'message' => 'Staff not found.',
                'data' => null,
        ], 404); 
        }

        $validated = $request->validate([

        // Personal Information
        'first_name' => 'sometimes|string|max:100',
        'last_name' => 'sometimes|string|max:100',
        'photo' => 'nullable|image|max:2048',
        'bio' => 'nullable|string',

        // Professional Information
        'role_id' => [
            'sometimes', 
            Rule::exists('roles','id')
            ->where(function ($query) use ($companyId){

                $query->where('company_id', $companyId);
            }),
        ],

        'service_ids' => ['nullable', 'array'],
        
        'service_ids.*' => [
            Rule::exists('services', 'id')
                ->where(function ($query) use ($companyId){
                $query->where('company_id', $companyId);
            }),
        ],

        // Contact
        'phone' => 'sometimes|string|max:30',

        // Account Information
        'account_email' => [
            'sometimes',
            'email',
            'max:150',
            Rule::unique('staff', 'account_email')
            ->ignore($staff->id),
        ],

        // Status
        'status' => 'sometimes|in:active,pending,deactivated',
        'is_active' =>'sometimes|boolean',

        // Availability
        'availability' => 'nullable|array',

        'availability.*.day_group' => 'required|string|max:20',
        'availability.*.start_time' => 'nullable|date_format:H:i',
        'availability.*.end_time' => 'nullable|date_format:H:i',
        'availability.*.is_off' =>'required|boolean',
        ]);

        DB::transaction(function () use ($request, $validated, $staff) {
            
            // Update staff
            $staff->update($validated);

            // Upload photo
            if($request->hasFile('photo')){

                $path = $request->file('photo')
                ->store('staff/photos', 'public');

                $staff->update([
                    'photo_path' => $path,
                ]);
            }

            // Update services
            if($request->has('service_ids')) {
                $staff->services()->sync($request->service_ids);
            }

            // Update Availability 
            if ($request->has('availability')) {

                $staff->availability()->delete();

                foreach($request->availability as $availability) {

                    $staff->availability()->create([
                        'day_group' => $availability['day_group'],
                        'start_time' => $availability['start_time'] ?? null,
                        'end_time' => $availability['end_time'] ?? null,
                        'is_off' => $availability['is_off'],
                    ]);
                }
            }
        });

        return response()->json([
            'success' => true,
            'message' => 'Staff Updated Successfully',
            'data' => $staff->fresh()->load(
                'role',
                'services',
                'availability'
            ),
        ], 200);

    }

    // RESTORE USER
    public function restore($id)
{
    $companyId = auth()->user()->company_id;

    $staff = Staff::withTrashed()
        ->where('company_id', $companyId)
        ->find($id);

    if (!$staff) {
        return response()->json([
            'success' => false,
            'message' => 'Staff not found.',
            'data' => null,
        ], 404);
    }

    $staff->restore();

    return response()->json([
        'success' => true,
        'message' => 'Staff restored successfully.',
        'data' => $staff->fresh()->load(
            'role',
            'services',
            'availability'
        ),
    ], 200);
}
    // DELETE STAFF MEMEBER 
    public function destroy($id)
    {
        // get id
        $staff = Staff::where(
            'company_id',
            auth()->user()->company_id
        )->find($id);

        // if not found
        if (!$staff) {
        return response()->json([
            'success' => false,
            'message' => 'Staff not found.',
            'data' => null,
        ], 404);
        }

        $staff->delete();

        return response()->json([
            'success' => true,
            'message' => 'Staff deleted successfully.',
            'data' => null,
        ], 200);
    

    }
}
