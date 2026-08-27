<?php

namespace App\Services;

use App\Models\Otp;
use Illuminate\Support\Facades\Mail;

class OtpService
{
    public function sendOtp($ownerType, $ownerId, $email)
    {
        Otp::where('owner_type', $ownerType)
            ->where('owner_id', $ownerId)
            ->where('purpose', 'email_verification')
            ->whereNull('verified_at')
            ->delete();

        $otp = random_int(100000, 999999);

        Otp::create([
            'owner_type' => $ownerType,
            'owner_id' => $ownerId,
            'code' => $otp,
            'purpose' => 'email_verification',
            'attempts' => 0,
            'expires_at' => now()->addMinutes(10),
        ]);

        Mail::raw(
            "Your TIMEORA verification code is: {$otp}\n\nThis code will expire in 10 minutes.",
            function ($message) use ($email) {
                $message->to($email)
                    ->subject('TIMEORA Email Verification Code');
            }
        );
    }

        public function verifyOtp($ownerType, $ownerId, $code)
    {
        $otp = Otp::where('owner_type', $ownerType)
            ->where('owner_id', $ownerId)
            ->where('purpose', 'email_verification')
            ->whereNull('verified_at')
            ->latest()
            ->first();

        if (!$otp || $otp->expires_at->isPast()) {
            return [
                'success' => false,
                'message' => 'This code has expired. Please request a new one.',
            ];
        }

        if ($otp->attempts >= 5) {
            return [
                'success' => false,
                'message' => 'Too many incorrect attempts. Please request a new code.',
            ];
        }

        if ($otp->code != $code) {

            $otp->increment('attempts');

            return [
                'success' => false,
                'message' => 'Invalid code.',
            ];
        }

        $otp->update([
            'verified_at' => now(),
        ]);

        return [
            'success' => true,
            'message' => 'OTP verified successfully.',
        ];
    }


}