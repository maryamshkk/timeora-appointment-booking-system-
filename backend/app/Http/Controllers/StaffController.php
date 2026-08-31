<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class StaffController extends Controller
{
    // GET STAFF DATA
    public function index()
    {
        $staff = Staff::where(
            'company_id',
            auth()->user()->company_id,
        )
        ->with('role', 'services', 'availability')
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

        $validated = $request->validate([
            // Personal Information
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'photo' => 'nullable|image|max:2048',

            // Professional Information
            'role_id' => [ 
                'required', 
                Rule::exists('roles', 'id') 
                ->where(function ($query) use ($companyId) { 
                    $query->where('company_id', $companyId); 
                    }), 
                ],
            
            'service_ids' => ['nullable', 'array'],

            'service_ids.*' => [ 
                Rule::exists('services', 'id') 
                ->where(function ($query) use ($companyId) { 
                    $query->where('company_id', $companyId); 
                }), 
            ],

            // Contact Information
            'phone' => 'required|string|max:30',
             // Account Information
            'account_email' => 'required|email|max:150|unique:staff,account_email',

            // Availability
            'availability.*.day_of_week' => [ 
                'required', 'integer', 'between:0,6', 'distinct'
            ],

            'availability.*.is_working' => [ 
                'required', 'boolean', ], 
            
            'availability.*.start_time' => [ 
                'nullable', 'date_format:H:i', 
            ], 
            
            'availability.*.end_time' => [ 
                'nullable', 'date_format:H:i', 
            ], 

            'availability.*.break_start' => [ 
                'nullable', 'date_format:H:i', 
            ], 
            
            'availability.*.break_end' => [ 
                'nullable', 'date_format:H:i', 
            ],
        ]);

            $staff = DB::transaction(function () use ($validated, $request, $companyId) {
            
            // Generate Staff ID
            $lastStaff = Staff::where('company_id', $companyId)
                    ->latest('id')
                    ->first();

            $number = $lastStaff 
                        ? ((int) str_replace('STF-', '', $lastStaff->staff_id)) + 1 
                        : 1;

            $staffId = 'STF-' . str_pad($number, 4, '0', STR_PAD_LEFT);
            
            // Create staff
            $staff = Staff::create([
                'company_id' => $companyId,
                'staff_id' => $staffId,
                'first_name' => $validated['first_name'], 
                'last_name' => $validated['last_name'], 
                'role_id' => $validated['role_id'], 
                'phone' => $validated['phone'], 
                'account_email' => $validated['account_email'],
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
            $staff->services()->sync( 
                $validated['service_ids'] ?? [] 
            );

            //Create Availability
            foreach ($validated['availability'] as $day) {
                
                if (!$day['is_working']) { 
                    
                $day['start_time'] = null; 
                $day['end_time'] = null; 
                $day['break_start'] = null; 
                $day['break_end'] = null; 
                }

                $staff->availability()->create([ 
                    'day_of_week' => $day['day_of_week'], 
                    'is_working' => $day['is_working'], 
                    'start_time' => $day['start_time'] ?? null, 
                    'end_time' => $day['end_time'] ?? null, 
                    'break_start' => $day['break_start'] ?? null, 
                    'break_end' => $day['break_end'] ?? null, 
                ]);
            }

            return $staff;
            });

        return response()->json([
            'success' => true,
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

        'availability.*.day_of_week' => [ 
            'required', 'integer', 'between:0,6', 'distinct', 
        ], 
        
        'availability.*.is_working' => [ 
            'required', 'boolean', 
        ], 
        
        'availability.*.start_time' => [ 
            'nullable', 'date_format:H:i', 
        ], 
        
        'availability.*.end_time' => [ 
            'nullable', 'date_format:H:i', 
        ], 
        
        'availability.*.break_start' => [ 
            'nullable', 'date_format:H:i', 
        ], 
        
        'availability.*.break_end' => [ 
            'nullable', 'date_format:H:i', 
        ],

        ]);

        DB::transaction(function () use ($request, $validated, $staff) {
            
            // Update staff
            $staffData = collect($validated)
                    ->except([ 'service_ids', 
                                'availability', 
                                'photo', 
                            ])->toArray(); 
                        
            $staff->update($staffData);

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

                $staff->services()->sync(
                    $validated['service_ids'] ?? []
                );
            }

            // Update Availability 
            if ($request->has('availability')) {
            
            // remove old availability
                $staff->availability()->delete();

                foreach ($validated['availability'] as $day) { 
                    // If staff is not working, 
                    // // remove all time values 
                    if (!$day['is_working']) { 
                        
                        $day['start_time'] = null; 
                        $day['end_time'] = null; 
                        $day['break_start'] = null; 
                        $day['break_end'] = null; 
                    } 
                    
                    $staff->availability()->create([ 
                        'day_of_week' => $day['day_of_week'], 
                        'is_working' => $day['is_working'], 
                        'start_time' => $day['start_time'] ?? null, 
                        'end_time' => $day['end_time'] ?? null, 
                        'break_start' => $day['break_start'] ?? null, 
                        'break_end' => $day['break_end'] ?? null, 
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

    // CREATE INVITATION
    public function invite(Request $request)
    {
        // find company admin id
        $companyId = auth()->user()->company_id;

        // find staff id
        $request->validate([
            'staff_id' => 'required|exists:staff,id',
        ]);

        // save staff id
        $staff = Staff::where('company_id', $companyId)
            ->find($request->staff_id);

        // if not found id
        if(!$staff){
            return response()->json([
            'success' => false,
            'message' => 'Staff not found.',
            'data' => null,
            ], 404);
        }

        // if invitation is accepted
        if($staff->invitation_status === 'accepted') {
            return response()->json([
                'success' => true,
                'message' => 'Staff invitation has already been accepted',
                'data' => null,
            ], 422);
        }

        // token generate
        $token = Str::random(64);

        $staff->update([
            'invitation_token' => $token,
            'invitation_status' => 'pending',
            'invitation_sent_at' => now(),
            'status' => 'pending',
            'is_active' => false,
        ]);

        // Create invitation link
        $link = env('FRONTEND_URL')
                .'/staff/accept-invitation?token='
                .$token;

        // send email
        Mail::raw(

        "Hello {$staff->first_name},\n\n"
        ."You have been invited to Join TIMEORA as a Staff member.\n\n"
        ."Click the link below to activate your account:\n\n"
        .$link ."\n\n"

        ."This invitation link can be used to create your password and activate your account.\n\n"
        ."Thank you,\n"
        . "TIMEORA Team",
        function ($message) use ($staff){

            $message->to($staff->account_email)
                ->subject('TIMEORA Staff Invitation');
            }
        );

        // invitation response
        return response()->json([
            'success' => true,
            'message' => 'Staff invitation sent successfully',
            'data' => [
                "staff_id" => $staff->staff_id,
                "account_email"=> $staff->account_email,
                "invitation_status" => $staff->invitation_status,
                "invitation_sent_at" => $staff->invitation_sent_at,
            ],
        ], 200);
    }

    // ACCPET INVITATION
    public function acceptInvitation(Request $request)
    {
        $request->validate([
            'token' => 'required|string',

            'password' => [
                'required',
                'min:8',
                'regex:/[A-Z]/',
                'regex:/[a-z]/',
                'regex:/[0-9]/',
                'regex:/[^A-Za-z0-9]/',
            ],

            "confirm_password" => 'required|same:password',
        ]);

        $staff = Staff::where('invitation_token', $request->token)
                ->where('invitation_status', 'pending')
                ->first();

            if (!$staff) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid or expired invitation.',
                    'data' => null,
                    'errors' => null,
                ], 422);
            }

            $staff->update([
                'password_hash' => Hash::make($request->password),

                'invitation_status' => 'accepted',
                'invitation_token' => null,
                'email_verified_at' => now(),
                'status' => 'active',
                'is_active' => true,
            ]);

            return response()->json([
        'success' => true,
        'message' => 'Invitation accepted. Your account is now active.',
        'data' => [
            'staff_id' => $staff->staff_id,
            'email' => $staff->account_email,
            'status' => $staff->status,
        ],
            'errors' => null,
        ], 200);
    }


}
