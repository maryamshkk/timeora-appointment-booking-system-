<?php

namespace App\Http\Controllers\Auth\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Company;
use App\Models\CompanyAdmin;
use App\Models\Otp;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;




class CompanyAuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'company_name' => [
                'required'|
                'string'|
                'min:2'|
                'max:150'
            ],

            'business_email' => [
                'required'|
                'string'|
                'max:150'
            ],

            'phone_number' => [
                'required'|
                'string'|
                'regex:/^\+[1-9]\d{7,14}$/',
            ],

            'business_type' => [
                'required',
                'integer',
                function($attribute, $value, $fail){
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

            'password' =>[
                    'required',
                    'min:8',
                    'regex:/[A-Z]/',
                    'regex:/[a-z]/',
                    'regex:/[0-9]/',
                    'regex:/[^A-Za-z0-9/]',
                ],
            'confirm_password' => 'required',
                    'same:password',

            'terms_accepted' => 
                    'required|accepted',
        ]);

        try{
            $result = DB::transaction(function() use ($validated){
                $company = Company::create([
                    'category_id' => $validated->business_type,
                    'name' => $validated->company_name,
                    'slug' => Str::slug($request->company_name) . '-' . Str::random(6),
                    'email' => $validated->business_email,
                    'phone' => $validated->phone_number,
                    'status' => 'pending',
                    'email_verified_at' => null,
                ]);

                $admin = CompanyAdmin::create([
                    'company_id'=> $company->$id,
                    'name' => $validated->full_name,
                    'email' => $validated->admin_email,
                    'password_hash' => Hash::make($validated->password),
                    'status' => 'pending',
                    'email_verified_at' => null,
                ]);


                $otp = random_int(100000, 999999);
                Otp::create([
                    'owner_type'=> 'company_admin',
                    'owner_id'=> $admin->id, 
                    'code' => $otp,
                    'purpose' => 'email_verification',
                    'attempts' => 0,
                    'expires_at' => now()->addMinutes(10),
                ]);

                });


                return [
                    'company_id' => $company->id,
                    'admin_email' => $admin->email,
                    'otp' => $otp,
                    ];

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
            
        }
        catch(\Exception $e){
            return response()->json([
                'success' => false,
                'message' => 'Registration failed. Please try again.',
                'data' => null,
                'error' => null,
            ], 500);

        }


    }
}
