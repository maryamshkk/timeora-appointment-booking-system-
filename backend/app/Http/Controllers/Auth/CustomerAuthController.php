<?php

namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Otp;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Services\OtpService;

class CustomerAuthController extends Controller
{
    public function register(Request $request)
    {
        // enter credentials
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'email' => 'required|email|max:150|unique:customers,email',
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

        try{
        // all details at once
            $result = DB::transaction(function() use ($validated) {
            
                $customer = Customer::create([
                    'name' => $validated['name'],
                    'email' => $validated['email'],
                    'phone' => $validated['phone'] ?? null,
                    'password_hash' => Hash::make($validated['password']),
                    
                    // Customer OTP verify hone tak pending rahega
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
                        'verified_at'=>null,
                    ]);

                return [
                    'customer_id' => $customer->id,
                    'customer_email' => $customer->email,
                    'otp' => $otp,
                ];
            });

                // OTP email will be added in the next step.
                MAIL::raw(
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

        }
            catch(\Exception $e)
            {
                return response()->json([
                        'success' => false,
                        'message' => $e->getMessage(),
                        'data' => null,
                        'errors' => null,
                    ], 500);

            };
    }

    protected $otpService;

    public function __construct(OtpService $otpService)
    {
        $this->otpService = $otpService;
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|digits:6',
        ]);

        $customer = Customer::where('email', $request->email)->first();

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

    public function resendOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $customer = Customer::where('email', $request->email)->first();

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
                'otp_expires_in_seconds' => 600,
            ],
        ], 200);
    }
}
