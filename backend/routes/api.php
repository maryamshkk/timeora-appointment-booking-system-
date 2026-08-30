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
    Route::get('/company/roles', [RoleController::class, 'index']);
    Route::post('/company/roles', [RoleController::class, 'store']);

    // Services
    Route::get('/company/services', [ServiceController::class, 'index']);
    Route::post('/company/services', [ServiceController::class, 'store']);
    Route::get('/company/services/{service}', [ServiceController::class, 'show']);
    Route::put('/company/services/{service}', [ServiceController::class, 'update']);
    Route::delete('/company/services/{service}', [ServiceController::class, 'destroy']);


    // Staff
    Route::get('/company/staff', [StaffController::class, 'index']);
    Route::post('/company/staff', [StaffController::class, 'store']);
    Route::get('/company/staff/{id}', [StaffController::class, 'show']);
    Route::put('/company/staff/{id}', [StaffController::class, 'update']);
    Route::put('/company/staff/{id}/restore', [StaffController::class, 'restore']);
    Route::delete('/company/staff/{id}', [StaffController::class, 'destroy']);

});