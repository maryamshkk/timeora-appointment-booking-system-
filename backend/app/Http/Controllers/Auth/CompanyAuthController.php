<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Company;
use App\Models\CompanyAdmin;
use App\Models\Otp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Models\AuditLog;

class CompanyAuthController extends Controller
{
    // company + admin details 
    public function register(Request $request)
    {
        $request->validate([
            'company_name' => 'required|string|min:2|max:150',
            'business_email' => 'required|email|max:150',
            'phone_number' => 'required|string|max:30',
            'business_type' => [
                'required',
                'integer',
                function ($attribute, $value, $fail) {
                    $exists = Category::where('id', $value)
                        ->where('status', 'active')
                        ->exists();

                    if (! $exists) {
                        $fail('The selected business type is invalid.');
                    }
                },
            ],
            'full_name' => 'required|string|min:2|max:150',
            'admin_email' => 'required|email|unique:company_admins,email',
            'password' => [
                'required',
                'min:8',
                'regex:/[A-Z]/',
                'regex:/[a-z]/',
                'regex:/[0-9]/',
                'regex:/[^A-Za-z0-9]/',
            ],
            'confirm_password' => 'required|same:password',
            'terms_accepted' => 'required|accepted',
        ]);

        try {
            $result = DB::transaction(function () use ($request) {

                $company = Company::create([
                    'category_id' => $request->business_type,
                    'name' => $request->company_name,
                    'slug' => Str::slug($request->company_name) . '-' . Str::random(6),
                    'email' => $request->business_email,
                    'phone' => $request->phone_number,
                    'status' => 'pending',
                    'email_verified_at' => null,
                ]);

                $admin = CompanyAdmin::create([
                    'company_id' => $company->id,
                    'name' => $request->full_name,
                    'email' => $request->admin_email,
                    'password_hash' => Hash::make($request->password),
                    'status' => 'pending',
                    'email_verified_at' => null,
                ]);

                $otp = random_int(100000, 999999);

                Otp::create([
                    'owner_type' => 'company_admin',
                    'owner_id' => $admin->id,
                    'code' => $otp,
                    'purpose' => 'email_verification',
                    'attempts' => 0,
                    'expires_at' => now()->addMinutes(10),
                    'verified_at'=>null,
                ]);

                return [
                    'company_id' => $company->id,
                    'admin_email' => $admin->email,
                    'otp' => $otp,
                ];
            });

            // OTP email will be added in the next step.
            MAIL::raw(
                "Your TIMEORA verification code is:{$result['otp']}\n\nThis code will expire in 10 minutes",
                function ($message) use ($result) {
                    $message->to($result['admin_email'])
                            ->subject('TIMEORA Email verification Code');
                }
            );



            return response()->json([
                'success' => true,
                'message' => 'Registration successful. Please verify your email.',
                'data' => [
                    'company_id' => $result['company_id'],
                    'admin_email' => $result['admin_email'],
                    'otp_expires_in_seconds' => 600,
                ],
                'errors' => null,
            ], 201);

        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
                'data' => null,
                'errors' => null,
            ], 500);
        }
    }

    // email +OTP
    public function verifyOtp(Request $request)
    {
        // check credentials
        $validated = $request->validate([
            'email' => 'required|email',
            'otp' => 'required|digits:6',
        ]);

        // check admin email from table
        $admin = CompanyAdmin::where('email', $validated->email)->first();

        // if admin doesnt exist
        if($admin){
            return response()->json([
                'success' => false,
                'message' => 'Invalid verification request',
            ], 404);
        }

        // otp find krna
        $otp = Otp::where('owner_type', 'company_admin')
        ->where('owner_id', $admin->id)
        ->where('purpose', 'email_verfication')
        ->whereNull('verified_at')
        ->latest()
        ->first();

        // otp time check
        if($otp || $otp->expires_at->isPast())
            {
                return response()->json([
                    'success' => false,
                    'message' => 'This code is expired. Please request a new one', 
                ], 422);
            }

        // otp compare
        if ($otp->code != $validated->otp){
            $otp->increment('attempts');

            return response()->json([
                'success' => false,
                'message' => 'Invalid code.',
            ], 422);
        }
        
            $otp->update([
                'verified_at' => now(),
            ]);

            $admin->update([
                'email_verfied_at' => now(),
                'status' => 'active',
            ]);

            $admin->company->update([
                'email_verfied_at' => now(),
                'status' => 'active',
            ]);

            // log create
            AuditLog::create([
                'actor_type' => 'company_admin',
                'actor_id' => $admin->id,
                'action' => 'Registered and verified Company',
                'target_type' => 'Company',
                'target_id' => $admin->company_id,
            ]);

            // create sanctum token 
            $token = $admin->createToken('comapny-admin')->plainTextToken;

            return response().json([
                'success' => true,
                'message' => 'Email verified successfully',
                'data' => [
                    'token' => $token,
                    'company_admin' =>$admin,
                    'company' => $admin->company,
                ],
            ], 200);
    }

}