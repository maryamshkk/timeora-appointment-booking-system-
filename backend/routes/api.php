<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\CompanyAuthController;
use App\Http\Controllers\Auth\CustomerAuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// COMPANEY APISSS
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





// CUSTOMER APIS
Route::post("auth/customer/register",[
    CustomerAuthController::class,
        'register'
]);

// verify otp 
Route::post('auth/customer/verifyOtp',[
    CustomerAuthController::class,
        'verifyOtp'
]);