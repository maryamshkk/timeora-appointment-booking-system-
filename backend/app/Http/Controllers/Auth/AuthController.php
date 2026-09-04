<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Company;
use App\Models\User;
use App\Models\Staff;
use App\Models\Otp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Services\OtpService;

class AuthController extends Controller
{
    protected $otpService;

    public function __construct(OtpService $otpService)
    {
        $this->otpService = $otpService;
    }

    // COMPANY REGISTER
    public function companyRegister(Request $request)
    {
        $request->validate([
            'company_name' => 'required|string|min:2|max:150',
            'business_email' => 'required|email|max:150|unique:companies,email',
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
            'admin_email' => 'required|email|unique:users,email',
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
                    'email' => $request->business_email,
                    'phone' => $request->phone_number,
                    'status' => 'pending',
                    'email_verified_at' => null,
                ]);

                $admin = User::create([
                    'user_type' => 'company_admin',
                    'company_id' => $company->id,
                    'name' => $request->full_name,
                    'email' => $request->admin_email,
                    'password' => Hash::make($request->password),
                    'status' => 'pending',
                    'email_verified_at' => null,
                ]);

                $otp = random_int(100000, 999999);

                Otp::create([
                    'owner_type'=> 'company_admin',
                    'owner_id' => $admin->id,
                    'code' => $otp,
                    'purpose' => 'email_verification',
                    'attempts' => 0,
                    'expires_at' => now()->addMinutes(10),
                    'verified_at' => null,
                ]);

                return [
                    'company_id' => $company->id,
                    'admin_email' => $admin->email,
                    'otp' => $otp,
                ];
            });

            Mail::raw(
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


    // COMPANY VERIFY OTP
    public function companyVerifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|digits:6',
        ]);

        $admin = User::where('email', $request->email)
            ->where('user_type', 'company_admin')
            ->first();

        if (!$admin) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid verification request.',
            ], 404);
        }

        $result = $this->otpService->verifyOtp(
            'company_admin',
            $admin->id,
            $request->otp
        );

        if (!$result['success']) {
            return response()->json($result, 422);
        }

        $admin->update([
            'email_verified_at' => now(),
            'status' => 'active',
        ]);

        $admin->company->update([
            'email_verified_at' => now(),
            'status' => 'active',
        ]);

        $token = $admin->createToken('company-admin')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Email verified successfully.',
            'data' => [
                'token' => $token,
                'company_admin' => $admin,
                'company' => $admin->company,
            ],
        ], 200);
    }

    // COMPANY RESEND OTP
    public function companyResendOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $admin = User::where('email', $request->email)
            ->where('user_type', 'company_admin')
            ->first();

        if (!$admin) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid request.',
            ], 404);
        }

        $this->otpService->sendOtp(
             'company_admin',
            $admin->id,
            $admin->email
        );

        return response()->json([
            'success' => true,
            'message' => 'A new verification code has been sent.',
            'data' => [
                'admin_email' => $admin->email,
                'otp_expires_in_seconds' => 600,
            ],
        ], 200);
    }

    // CUSTOMER REGISTER
    public function customerRegister(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'email' => 'required|email|max:150|unique:users,email',
            'phone' => 'nullable|string|max:30',
            'password' => [
                'required',
                'min:8',
                'regex:/[A-Z]/',
                'regex:/[a-z]/',
                'regex:/[0-9]/',
                'regex:/[^A-Za-z0-9]/',
            ],
            'password_confirmation' => 'required|same:password',
        ]);

        try {
            $result = DB::transaction(function () use ($validated) {
                $customer = User::create([
                    'user_type' => 'customer',
                    'name' => $validated['name'],
                    'email' => $validated['email'],
                    'phone' => $validated['phone'] ?? null,
                    'password' => Hash::make($validated['password']),
                    'status' => 'pending',
                    'email_verified_at' => null,
                ]);

                $otp = random_int(100000, 999999);

                Otp::create([
                    'owner_type' => 'customer',
                    'owner_id' => $customer->id,
                    'code' => $otp,
                    'purpose' => 'email_verification',
                    'attempts' => 0,
                    'expires_at' => now()->addMinutes(10),
                    'verified_at' => null,
                ]);

                return [
                    'customer_id' => $customer->id,
                    'customer_email' => $customer->email,
                    'otp' => $otp,
                ];
            });

            Mail::raw(
                "Your TIMEORA verification code is:{$result['otp']}\n\nThis code will expire in 10 minutes",
                function ($message) use ($result) {
                    $message->to($result['customer_email'])
                            ->subject('TIMEORA Email verification Code');
                }
            );

            return response()->json([
                'success' => true,
                'message' => 'Registration successful. Please verify your email.',
                'data' => [
                    'customer_id' => $result['customer_id'],
                    'customer_email' => $result['customer_email'],
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



    // CUSTOMER VERIFY OTP
    public function customerVerifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|digits:6',
        ]);

        $customer = User::where('email', $request->email)
            ->where('user_type', 'customer')
            ->first();

        if (!$customer) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid verification request.',
            ], 404);
        }

        $result = $this->otpService->verifyOtp(
            'customer', 
            $customer->id,
            $request->otp
        );

        if (!$result['success']) {
            return response()->json($result, 422);
        }

        $customer->update([
            'email_verified_at' => now(),
            'status' => 'active'
        ]);

        $token = $customer->createToken('customer')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Email verified successfully.',
            'data' => [
                'token' => $token,
                'customer' => $customer,
            ],
        ], 200);
    }

    // CUSTOMER RESEND OTP
    public function customerResendOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $customer = User::where('email', $request->email)
            ->where('user_type', 'customer')
            ->first();

        if (!$customer) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid request.',
            ], 404);
        }

        $this->otpService->sendOtp(
             'customer',
            $customer->id,
            $customer->email
        );

        return response()->json([
            'success' => true,
            'message' => 'A new verification code has been sent.',
            'data' => [
                'email' => $email,
                'otp_expires_in_seconds' => 600,
            ],
        ], 200);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // Check users table
        $user = User::where('email', $request->email)->first();

        if ($user) {

            if (!Hash::check($request->password, $user->password)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid credentials.',
                    'data' => null,
                    'errors' => null,
                ], 401);
            }

            if ($user->status === 'pending') {
                return response()->json([
                    'success' => false,
                    'message' => 'Email not verified. Please verify your email first.',
                    'data' => null,
                    'errors' => null,
                ], 403);
            }

            if ($user->status === 'suspended') {
                return response()->json([
                    'success' => false,
                    'message' => 'Account suspended. Contact support.',
                    'data' => null,
                    'errors' => null,
                ], 403);
            }

            if ($user->status === 'deactivated') {
                return response()->json([
                    'success' => false,
                    'message' => 'Account deactivated.',
                    'data' => null,
                    'errors' => null,
                ], 403);
            }

            $token = $user->createToken($user->user_type)->plainTextToken;

            $responseData = [
                'token' => $token,
                'user' => $user,
            ];

            if ($user->isCompanyAdmin()) {
                $responseData['company'] = $user->company;
            }

            return response()->json([
                'success' => true,
                'message' => 'Login successful.',
                'data' => $responseData,
                'errors' => null,
            ], 200);
        }

        // Check staff table
        $staff = Staff::where('account_email', $request->email)->first();

        if ($staff) {

            if (
                empty($staff->password_hash) ||
                !Hash::check($request->password, $staff->password_hash)
            ) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid credentials.',
                    'data' => null,
                    'errors' => null,
                ], 401);
            }

            if ($staff->status !== 'active') {
                return response()->json([
                    'success' => false,
                    'message' => 'Staff account is not active.',
                    'data' => null,
                    'errors' => null,
                ], 403);
            }

            if (!$staff->email_verified_at) {
                return response()->json([
                    'success' => false,
                    'message' => 'Staff email is not verified.',
                    'data' => null,
                    'errors' => null,
                ], 403);
            }

            $token = $staff->createToken('staff')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Staff login successful.',
                'data' => [
                    'token' => $token,
                    'staff' => $staff,
                ],
                'errors' => null,
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'Invalid credentials.',
            'data' => null,
            'errors' => null,
        ], 401);
    }

    // LOGOUT
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully.',
            'data' => null,
            'errors' => null,
        ], 200);
    }

    // PROFILE
    public function profile(Request $request)
    {
        $user = $request->user();

        $responseData = [
            'user' => $user,
        ];

        if ($user->isCompanyAdmin()) {
            $responseData['company'] = $user->company;
        }

        return response()->json([
            'success' => true,
            'message' => 'Profile fetched successfully.',
            'data' => $responseData,
            'errors' => null,
        ], 200);
    }

    // Forget Password
    public function forgetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required'
        ]);
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'No account found with this email.',
                'data' => null,
                'errors' => null,
            ], 404);
        }

        $ownerType = $user->user_type === 'company_admin' ? 'company_admin' : 'customer';

            $otp = random_int(100000, 999999);

            Otp::create([
                'owner_type' => $ownerType,
                'owner_id' => $user->id,
                'code' => $otp,
                'purpose' => 'password_reset',
                'attempts' => 0,
                'expires_at' => now()->addMinutes(10),
                'verified_at' => null,
            ]);

            Mail::raw(
                "Your TIMEORA password reset code is: {$otp}\n\nThis code will expire in 10 minutes",
                function ($message) use ($user) {
                    $message->to($user->email)
                            ->subject('TIMEORA Password Reset Code');
                }
            );

            return response()->json([
                'success' => true,
                'message' => 'Password reset code sent to your email.',
                'data' => [
                    'email' => $user->email,
                    'otp_expires_in_seconds' => 600,
                ],
                'errors' => null,
            ], 200);
    }

    // RESET PASSWORD
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|digits:6',
            'password' => [
                'required',
                'min:8',
                'regex:/[A-Z]/',
                'regex:/[a-z]/',
                'regex:/[0-9]/',
                'regex:/[^A-Za-z0-9]/',
            ],
            'password_confirmation' => 'required|same:password',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'No account found with this email.',
                'data' => null,
                'errors' => null,
            ], 404);
        }

        $result = $this->otpService->verifyOtp(
            $user->email,
            $user->id,
            $request->otp,
            'password_reset'
        );

        if (!$result['success']) {
            return response()->json($result, 422);
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        // Delete all tokens after password reset
        $user->tokens()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Password reset successfully. Please login with your new password.',
            'data' => null,
            'errors' => null,
        ], 200);
    }
}