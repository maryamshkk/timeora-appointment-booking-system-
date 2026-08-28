<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\RoleController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// COMPANY APIS
Route::post('/auth/company/register', [AuthController::class, 'companyRegister']);
Route::post('/auth/company/verify-otp', [AuthController::class, 'companyVerifyOtp']);
Route::post('/auth/company/resend-otp', [AuthController::class, 'companyResendOtp']);

// CUSTOMER APIS
Route::post('/auth/customer/register', [AuthController::class, 'customerRegister']);
Route::post('/auth/customer/verify-otp', [AuthController::class, 'customerVerifyOtp']);
Route::post('/auth/customer/resend-otp', [AuthController::class, 'customerResendOtp']);

//Login
Route::post('/auth/login', [AuthController::class, 'login']);

// FORGET PASSWORD 
Route::post('/auth/forget-password', [AuthController::class, 'forgetPassword']);
Route::post('/auth/reset-password', [AuthController::class, 'resetPassword']);



// LOGOUT (Authenticated)
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// PROFILE (Authenticated)
Route::get('/profile', [AuthController::class, 'profile'])->middleware('auth:sanctum');


// Add Roles
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/roles', [RoleController::class, 'index']);
    Route::post('/roles', [RoleController::class, 'store']);
});

// 

