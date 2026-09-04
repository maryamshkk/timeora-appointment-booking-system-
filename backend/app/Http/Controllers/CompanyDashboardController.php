<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Appointment;
use Illuminate\Http\Request;

class CompanyDashboardController extends Controller
{
    // get data
    public function index(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'message' => 'Company dashboard',
            'user_id' => $user->id,
        ]);

        // Appointment Statistics
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


        // Today's Appointments
        $todayAppointments = Appointment::where('company_id', $companyId)
            ->whereDate('appointment_date', today())
            ->orderBy('start_time')
            ->get();

        // Total Customers
        $totalCustomers = Customer::where('company_id', $companyId)
            ->count();

        // Total Staff
        $totalStaff = Staff::where('company_id', $companyId)
            ->count();

        // Total Services
        $totalServices = Service::where('company_id', $companyId)
            ->count(); 
            
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
                    'pending_appointments' => $pendingAppointments,
                    'accepted_appointments' => $acceptedAppointments,
                    'completed_appointments' => $completedAppointments,
                    'cancelled_appointments' => $cancelledAppointments,
                    'total_customers' => $totalCustomers,
                    'total_staff' => $totalStaff,
                    'total_services' => $totalServices,
                    'today_appointments' => $todayAppointments,
                ],

                'upcoming_appointments' => $upcomingAppointments,
            ],
        ]);
    }

}