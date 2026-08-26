<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\CompanyAuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// register page route
Route::post('/auth/company/register',  [
    CompanyAuthController::class,
        'register'
    ]);

// verify otp route
Route::post('/auth/company/verify-otp',[
    CompanyAuthController::class,
        'verifyOtp',
]);

// Resend Otp
Route::post('auth/company/resend-otp', [
    CompanyAuthController::class,
        'resendOtp',
]);



