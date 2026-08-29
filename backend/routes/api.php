<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\CompanyController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// ===============================
// COMPANY REGISTRATION
// ===============================

Route::post('/auth/company/register', [AuthController::class, 'companyRegister']);
Route::post('/auth/company/verify-otp', [AuthController::class, 'companyVerifyOtp']);
Route::post('/auth/company/resend-otp', [AuthController::class, 'companyResendOtp']);


// ===============================
// CUSTOMER REGISTRATION
// ===============================
Route::post('/auth/customer/register', [AuthController::class, 'customerRegister']);
Route::post('/auth/customer/verify-otp', [AuthController::class, 'customerVerifyOtp']);
Route::post('/auth/customer/resend-otp', [AuthController::class, 'customerResendOtp']);


// ===============================
// LOGIN
// ===============================

Route::post('/auth/login', [AuthController::class, 'login']);

// ===============================
// PASSWORD
// ===============================

Route::post('/auth/forget-password', [AuthController::class, 'forgetPassword']);
Route::post('/auth/reset-password', [AuthController::class, 'resetPassword']);



// ===============================
// AUTHENTICATED
// ===============================


Route::middleware('auth:sanctum')->group(function () {

    Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

    Route::get('/profile', [AuthController::class, 'profile'])->middleware('auth:sanctum');

});

// ===============================
// COMPANY ADMIN APIS
// ===============================

Route::middleware(['auth:sanctum', 'role:company_admin'])->group(function () {

    // Get company profile data
    Route::get('/company', [CompanyController::class, 'show']);
    Route::put('/company', [CompanyController::class, 'update']);

    // Roles
    Route::get('/roles', [RoleController::class, 'index']);
    Route::post('/roles', [RoleController::class, 'store']);

    // Services
    Route::get('/services', [ServiceController::class, 'index']);
    Route::post('/services', [ServiceController::class, 'store']);

    // Staff
    Route::post('/staff', [StaffController::class, 'store']);

});