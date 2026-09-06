<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\User;
use App\Models\Appointment;
use App\Models\Receipt;
use app\Models\Staff;
use app\Models\Service;
use app\Models\Role;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    // get dashboard data 
    public function index(Request $request)
    {
        $totalCompanies = Company::count();

        $totalUsers = User::count();

        $totalAppointments = Appointment::count();

        $totalReceipts = Receipt::count();

        $recentAppointments = Appointment::with([
            'company',
            'customer',
            'staff',
            'service',
        ])
        ->orderByDesc('created_at')
        ->limit(10)
        ->get();

        $upcomingAppointments = Appointment::with([
            'company',
            'customer',
            'staff',
            'service',
        ])
        ->where('appointment_date', '>=', now()->toDateString())
        ->orderBy('appointment_date')
        ->orderBy('start_time')
        ->limit(10)
        ->get();

        return response()->json([
            'success' => true,
            'message' => 'Super Admin dashboard data fetched successfully.',
            'data' => [
                'statistics' => [
                    'total_companies' => $totalCompanies,
                    'total_users' => $totalUsers,
                    'total_appointments' => $totalAppointments,
                    'total_receipts' => $totalReceipts,
                ],

                'recent_appointments' => $recentAppointments,

                'upcoming_appointments' => $upcomingAppointments,
            ],
            'errors' => null,
        ], 200);
    
    }
}
