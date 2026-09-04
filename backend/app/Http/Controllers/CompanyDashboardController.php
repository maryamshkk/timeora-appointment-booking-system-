<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Appointment;
use App\Models\User;
use App\Models\Staff;
use App\Models\Service;
use Illuminate\Http\Request;

class CompanyDashboardController extends Controller
{
    // get data
    public function index(Request $request)
    {
        $user = $request->user();

        //1. Company ID
        $companyId = $user->company_id;

        // 2. Date filters
        $date = $request->query('date');
        $start = $request->query('start');
        $end = $request->query('end');


        //3. Appointment Statistics
        $pendingAppointments = Appointment::where('company_id', $companyId)
            ->where('status', 'pending')
            ->count();

            $acceptedAppointments = Appointment::where('company_id', $companyId)
            ->where('status', 'accepted')
            ->count();

            $completedAppointments = Appointment::where('company_id', $companyId)
            ->where('status', 'completed')
            ->count();

            $cancelledAppointments = Appointment::where('company_id', $companyId)
            ->where('status', 'cancelled')
            ->count();

            
            // Total Appointments
        $totalAppointments = Appointment::where('company_id', $companyId)
            ->count();

            // 5. Today's Appointments
        $todayQuery = Appointment::where('company_id', $companyId)
            ->whereDate('appointment_date', today());
        
            if ($date === 'today') {
            $todayQuery->whereDate('appointment_date', today());
        }

            $todayAppointments = $todayQuery
            ->orderBy('start_time')
            ->get();

        // Date Range Filter
        $dateRangeAppointments = null;

        if ($start && $end) {
            $dateRangeAppointments = Appointment::where('company_id', $companyId)
                ->whereBetween('appointment_date', [$start, $end])
                ->orderBy('appointment_date')
                ->orderBy('start_time')
                ->get();
        }



        // Total Customers
        $totalCustomers = User::where('company_id', $companyId)
            ->count();

        // Total Staff
        $totalStaff = Staff::where('company_id', $companyId)
            ->count();

        // Total Services
        $totalServices = Service::where('company_id', $companyId)
            ->count();



                    // Recent Activity
        $recentActivity = Appointment::where('company_id', $companyId)
                ->latest('created_at')
                ->limit(5)
                ->get();

        // Upcoming Appointments
        $upcomingAppointments = Appointment::where('company_id', $companyId)
            ->where(function ($query) {
                $query->whereDate('appointment_date', '>', today())
                    ->orWhere(function ($query) {
                        $query->whereDate('appointment_date', today())
                                ->where('start_time', '>=', now()->format('H:i:s'));
                    });
    })
            ->whereIn('status', ['pending', 'accepted'])
            ->orderBy('appointment_date')
            ->orderBy('start_time')
            ->limit(5)
            ->get();


            // Return Dashboard Response
        return response()->json([
            'success' => true,

            'data' => [
                'statistics' => [
                    'total_appointments' => $totalAppointments,
                    'today_appointments' => $todayAppointments,
                    'pending_appointments' => $pendingAppointments,
                    'accepted_appointments' => $acceptedAppointments,
                    'completed_appointments' => $completedAppointments,
                    'cancelled_appointments' => $cancelledAppointments,
                    'total_customers' => $totalCustomers,
                    'total_staff' => $totalStaff,
                    'total_services' => $totalServices,
                    'today_appointments' => $todayAppointments,
                ],

                'date_range_appointments' => $dateRangeAppointments,
                'recent_activity' => $recentActivity,                
                'upcoming_appointments' => $upcomingAppointments,
            ],
        ]);
    }

}