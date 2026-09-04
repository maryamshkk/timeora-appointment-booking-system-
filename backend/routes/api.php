<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CompanyWorkingHoursController;
use App\Http\Controllers\StaffAvailabilityController;
use App\Http\Controllers\HolidayController;
use App\Http\Controllers\BlockedTimeController;
use App\Http\Controllers\AvailabilityExceptionController;
use App\Http\Controllers\AvailabilityController;
use App\Http\Controllers\Customer\AppointmentController;
use App\Http\Controllers\Company\AppointmentController as CompanyAppointmentController;
use App\Http\Controllers\Staff\AppointmentController as StaffAppointmentController;
use App\Http\Controllers\ReceiptController;


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


    // Staff Management
    Route::get('/company/staff', [StaffController::class, 'index']);
    Route::post('/company/staff', [StaffController::class, 'store']);
    Route::get('/company/staff/{id}', [StaffController::class, 'show']);
    Route::put('/company/staff/{id}', [StaffController::class, 'update']);
    Route::put('/company/staff/{id}/restore', [StaffController::class, 'restore']);
    Route::delete('/company/staff/{id}', [StaffController::class, 'destroy']);

    // Staff invitation Send
    Route::post('/company/staff/invite', [StaffController::class, 'invite']);

    // Business working hour
    Route::get('/company/working-hours', [CompanyWorkingHoursController::class, 'index']);
    Route::put('/company/working-hours', [CompanyWorkingHoursController::class, 'update']);

    // Staff Availability Timing
    Route::get('/company/staff/{staffId}/availability', [StaffAvailabilityController::class, 'index']);
    Route::post('/company/staff/{staffId}/availability', [StaffAvailabilityController::class, 'store']);
    Route::put('/company/staff/{staffId}/availability/{availabilityId}', [StaffAvailabilityController::class, 'update']);
    Route::put('/company/staff/{staffId}/availability', [StaffAvailabilityController::class, 'updateAll']);

    // Delete availability
    Route::delete('/company/staff/{staffId}/availability/{availabilityId}',[StaffAvailabilityController::class, 'destroy']);


    // Holidays Controller
    Route::get('company/holidays', [HolidayController::class, 'index']);
    Route::post('company/holidays', [HolidayController::class, 'store']);
    Route::put('company/holidays/{holidayId}', [HolidayController::class, 'update']);
    Route::delete('company/holidays/{holidayId}', [HolidayController::class, 'destroy']);

    // Staff blocked times
    Route::get('/company/staff/{staffId}/blocked-times', [BlockedTimeController::class, 'index']);
    Route::post('/company/staff/{staffId}/blocked-times', [BlockedTimeController::class, 'store']);
    Route::put('/company/staff/{staffId}/blocked-times/{blockedTimeId}', [BlockedTimeController::class, 'update']);
    Route::delete('/company/staff/{staffId}/blocked-times/{blockedTimeId}', [BlockedTimeController::class, 'destroy']);


    // Avilability Excpetion Apis
    Route::get('/company/staff/{staffId}/exceptions', [AvailabilityExceptionController::class, 'index']);
    Route::post('/company/staff/{staffId}/exceptions', [AvailabilityExceptionController::class, 'store']);
    Route::put('/company/staff/{staffId}/exceptions/{exceptionId}', [AvailabilityExceptionController::class, 'update']);
    Route::delete('/company/staff/{staffId}/exceptions/{exceptionId}', [AvailabilityExceptionController::class, 'destroy']);

    // Company Specific Appointment Apis
    Route::get("/company/appointments", [CompanyAppointmentController::class, 'index']);
    Route::get("/company/appointments/{id}", [CompanyAppointmentController::class, 'show']);
    Route::put("/company/appointments/{id}/accept", [CompanyAppointmentController::class, 'accept']);
    Route::put("/company/appointments/{id}/accept", [CompanyAppointmentController::class, 'accept']);
    Route::put("/company/appointments/{id}/reject", [CompanyAppointmentController::class, 'reject']);
    Route::put("/company/appointments/{id}/cancel", [CompanyAppointmentController::class, 'cancel']);

});

    // Staff invitation
    Route::post('/staff/accept-invitation', [StaffController::class, 'acceptInvitation']);

    Route::middleware(['auth:sanctum', 'role:staff'])->group(function()
    {
        Route::get('/staff/appointments', [StaffAppointmentController::class,'index']);
        Route::get('/staff/appointments/{id}', [StaffAppointmentController::class,'show']);
        Route::put('/staff/appointments/{id}/accept', [StaffAppointmentController::class,'accept']);
        Route::put('/staff/appointments/{id}/reject', [StaffAppointmentController::class,'reject']);
    });

    // Availability Slots Engine Api for booking
    Route::get('/availability',[AvailabilityController::class, 'index']);


    // Customer Route Apis
Route::middleware(['auth:sanctum', 'role:customer'])->group(function () {
    Route::post('/customer/appointments', [AppointmentController::class, 'store']);
    Route::get('/customer/appointments', [AppointmentController::class, 'index']);
    Route::get('/customer/appointments/{id}', [AppointmentController::class, 'singleShow']);
    Route::put('/customer/appointments/{id}', [AppointmentController::class, 'cancel']);
});

// Payment Apis
Route::middleware(['auth:sanctum', 'role:company_admin,staff,'])->group(function () {

    Route::put('/appointments/{id}/payment', [AppointmentController::class, 'markPaymentPaid']);
    
});

// Receipt Id
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/receipts', [ReceiptController::class, 'index']);

    Route::get('/receipts/{id}', [ReceiptController::class, 'show']);
    Route::get('/receipts/{id}/pdf', [ReceiptController::class, 'pdf']);

});