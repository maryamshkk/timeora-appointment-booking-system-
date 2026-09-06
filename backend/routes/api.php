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
use App\Http\Controllers\Admin\SuperAdminAuthController;
use App\Http\Controllers\ReceiptController;
use App\Http\Controllers\CompanyDashboardController;
use App\Http\Controllers\StaffDashboardController;
use App\Http\Controllers\CustomerDashboardController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\CompanySettingsController;
use App\Http\Controllers\StaffSettingsController;
use App\Http\Controllers\CustomerSettingsController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminCompanyController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AdminAppointmentController;
use App\Http\Controllers\Admin\AdminReceiptController;
use App\Http\Controllers\Admin\AdminCategoryController;
use App\Http\Controllers\Admin\AdminAnnouncementController;
use App\Http\Controllers\Company\CompanyReportController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

    // Super Admin Dashboard
Route::middleware(['auth:sanctum', 'super_admin'])
    ->group(function () {

    // admin profile
    Route::get('/profile', [AdminProfileController::class,'show']);
    Route::put('/profile', [AdminProfileController::class,'update']);
    Route::put('/profile/password', [AdminProfileController::class,'updatePassword']);

    // get dashboard
    Route::get('/admin/dashboard', [AdminDashboardController::class,'index']);
    
    // get companies data
    Route::get('/admin/companies', [AdminCompanyController::class,'index']);
    Route::get('/admin/companies/{id}', [AdminCompanyController::class,'show']);
    
    // get users data
    Route::get('/admin/users', [AdminUserController::class,'index']);
    Route::get('/admin/users/{id}', [AdminUserController::class,'show']);

    // list appointments
    Route::get('/admin/appointments', [AdminAppointmentController::class,'index']);
    Route::get('/admin/appointments/{id}', [AdminAppointmentController::class,'show']);

    // receipts api 
    Route::get('/admin/receipts', [AdminReceiptController::class,'index']);
    Route::get('/admin/receipts/{id}', [AdminReceiptController::class,'show']);
    Route::get('/admin/receipts/{id}/pdf', [AdminReceiptController::class,'pdf']);

    // categories panel
    Route::get('/admin/categories', [AdminCategoryController::class,'index']);
    Route::post('/admin/categories', [AdminCategoryController::class,'store']);
    Route::get('/admin/categories/{id}', [AdminCategoryController::class,'show']);
    Route::put('/admin/categories/{id}', [AdminCategoryController::class,'update']);
    Route::delete('/admin/categories/{id}', [AdminCategoryController::class,'destroy']);

    // announcements
    Route::get('/admin/announcements', [AdminAnnouncementController::class,'index']);
    Route::post('/admin/announcements', [AdminAnnouncementController::class,'store']);
    Route::get('/admin/announcements/{id}', [AdminAnnouncementController::class,'show']);
    Route::put('/admin/announcements/{id}', [AdminAnnouncementController::class,'update']);
    Route::delete('/admin/announcements/{id}', [AdminAnnouncementController::class,'destroy']);

    // admin settings
    Route::get('admin/settings', [AdminSettingsController::class,'show']);
    Route::put('/admin/settings', [AdminSettingsController::class,'update']);


});


    // {}
    // ===============================
    // COMPANY REGISTRATION
    // ===============================
    //
    Route::post('/auth/company/register', [AuthController::class, 'companyRegister']);
    Route::post('/auth/company/verify-otp', [AuthController::class, 'companyVerifyOtp']);
    Route::post('/auth/company/resend-otp', [AuthController::class, 'companyResendOtp']);


    // ===============================
    // CUSTOMER REGISTRATION
    // ===============================
    // 9

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


    // dashboard
    Route::get('/company/dashboard', [CompanyDashboardController::class, 'index']);


    // Get company profile data
    Route::get('/company', [CompanyController::class, 'show']);
    Route::put('/company', [CompanyController::class, 'update']);

    // Roles
    Route::get('/company/roles', [RoleController::class, 'index']);
    Route::post('/company/roles', [RoleController::class, 'store']);

    // Services 5
    Route::get('/company/services', [ServiceController::class, 'index']);
    Route::post('/company/services', [ServiceController::class, 'store']);
    Route::get('/company/services/{service}', [ServiceController::class, 'show']);
    Route::put('/company/services/{service}', [ServiceController::class, 'update']);
    Route::delete('/company/services/{service}', [ServiceController::class, 'destroy']);


    // Staff Management 6
    Route::get('company/staff', [StaffController::class, 'index']);
    Route::post('company/staff', [StaffController::class, 'store']);
    Route::get('company/staff/{id}', [StaffController::class, 'show']);
    Route::put('company/staff/{id}', [StaffController::class, 'update']);
    Route::put('company/staff/{id}/restore', [StaffController::class, 'restore']);
    Route::delete('company/staff/{id}', [StaffController::class, 'destroy']);

    // Staff invitation Send
    Route::post('/company/staff/invite', [StaffController::class, 'invite']);

    // Business working hour
    Route::get('/company/working-hours', [CompanyWorkingHoursController::class, 'index']);
    Route::put('/company/working-hours', [CompanyWorkingHoursController::class, 'update']);



    // Staff Working hours
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
    Route::get('/staff/{staffId}/blocked-times', [BlockedTimeController::class, 'index']);
    Route::post('/staff/{staffId}/blocked-times', [BlockedTimeController::class, 'store']);
    Route::put('/staff/{staffId}/blocked-times/{blockedTimeId}', [BlockedTimeController::class, 'update']);
    Route::delete('/staff/{staffId}/blocked-times/{blockedTimeId}', [BlockedTimeController::class, 'destroy']);


        // Check final availability slots
    Route::get('/availability', [AvailabilityController::class, 'index']);


    // Company Specific Appointment Apis
    Route::get("/company/appointments/upcoming", [CompanyAppointmentController::class, 'upcoming']);
 
    Route::get("/company/appointments", [CompanyAppointmentController::class, 'index']);
    Route::get("/company/appointments/{id}", [CompanyAppointmentController::class, 'show']);
   
    Route::put("/company/appointments/{id}/accept", [CompanyAppointmentController::class, 'accept']);
    Route::put("/company/appointments/{id}/reject", [CompanyAppointmentController::class, 'reject']);
    
    Route::put("/company/appointments/{id}/cancel", [CompanyAppointmentController::class, 'cancel']);
    Route::put('company/appointments/{id}/reschedule', [CompanyAppointmentController::class, 'reschedule']);

    // Company Calendar Apiss
    Route::get('/company/calendar', [CompanyAppointmentController::class, 'calendar']);


    // settings
    Route::get('/company/settings', [CompanySettingsController::class, 'show']);
    Route::put('/company/settings', [CompanySettingsController::class, 'update']);

    // reports and analytics
    Route::get('/company/reports/overview',[CompanyReportController::class, 'overview']);
    Route::get('/company/reports/bookings',[CompanyReportController::class, 'bookings']);
});




    // Staff accept invitation
    Route::post('/staff/accept-invitation', [StaffController::class, 'acceptInvitation']);

Route::middleware(['auth:sanctum', 'role:staff'])->group(function()
    {
        Route::get('/staff/dashboard', [StaffDashboardController::class, 'index']);
        
        Route::get('/staff/appointments/upcoming',[StaffAppointmentController::class, 'upcoming']);

        Route::get('/staff/appointments', [StaffAppointmentController::class,'index']);
        Route::get('/staff/appointments/{id}', [StaffAppointmentController::class,'show']);
        Route::put('/staff/appointments/{id}/accept', [StaffAppointmentController::class,'accept']);
        Route::put('/staff/appointments/{id}/reject', [StaffAppointmentController::class,'reject']);
        Route::put('/staff/appointments/{id}/reschedule', [StaffAppointmentController::class, 'reschedule']);
        Route::put('staff/appointments/{id}/cancel', [StaffAppointmentController::class, 'cancel']);
        Route::put('/staff/appointments/{id}/complete', [StaffAppointmentController::class, 'complete']);

        // Staff Calendar 
        Route::get('staff/calendar', [StaffAppointmentController::class, 'calendar']);

        // staff settings
        Route::get('/staff/settings', [StaffSettingsController::class, 'show']);

        Route::put('/staff/settings', [StaffSettingsController::class, 'update']);

    });

    


    // Customer Route Apis
Route::middleware(['auth:sanctum', 'role:customer'])->group(function () {
    
    Route::get('/customer/dashboard', [CustomerDashboardController::class, 'index']);
  
      // Upcoming appointment Api
    Route::get('/customer/appointments/upcoming', [AppointmentController::class, 'upcoming']);

    Route::post('/customer/appointments', [AppointmentController::class, 'store']);
    Route::get('/customer/appointments', [AppointmentController::class, 'index']);
    Route::get('/customer/appointments/{id}', [AppointmentController::class, 'singleShow']);
    Route::put('/customer/appointments/{id}', [AppointmentController::class, 'cancel']);
    Route::put('/customer/appointments/{id}/reschedule', [AppointmentController::class, 'reschedule']);

    // Customer Calendar Apis
    Route::get('customer/calendar', [AppointmentController::class, 'calendar']);

    // customer settings
    Route::get('/customer/settings', [CustomerSettingsController::class, 'show']);
    Route::put('/customer/settings', [CustomerSettingsController::class, 'update']);
    });




    // Payment Apis
Route::middleware(['auth:sanctum', 'role:company_admin,staff,'])->group(function () {

        Route::get('/appointments/{id}/payment', [AppointmentController::class, 'payment']);
        Route::put('/appointments/{id}/payment/mark-paid', [AppointmentController::class, 'markPaymentPaid']);
        
    });




    // Receipt Id
    Route::middleware('auth:sanctum')->group(function () {

        Route::get('/receipts', [ReceiptController::class, 'index']);

        Route::get('/receipts/{id}', [ReceiptController::class, 'show']);
        Route::get('/receipts/{id}/pdf', [ReceiptController::class, 'pdf']);

    });




Route::middleware('auth:sanctum')->group(function () {

    Route::get('/notifications', [NotificationController::class, 'index']);

    Route::put('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);

    Route::get('/notifications/{id}', [NotificationController::class, 'show']);

    Route::put('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);

});