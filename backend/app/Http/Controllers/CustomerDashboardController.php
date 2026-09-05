<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Customer;
use App\Models\Service;
use Illuminate\Http\Request;

class CustomerDashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Customer ID
        $customerId = $user->id;

        // Upcoming Appointment
        $upcomingAppointment = Appointment::where('customer_id', $customerId)
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
            ->first();

        // Pending Bookings
        $pendingBookings = Appointment::where('customer_id', $customerId)
            ->where('status', 'pending')
            ->count();

        // Accepted Appointments
        $acceptedAppointments = Appointment::where('customer_id', $customerId)
            ->where('status', 'accepted')
            ->count();

        // Completed Appointments
        $completedAppointments = Appointment::where('customer_id', $customerId)
            ->where('status', 'completed')
            ->count();

        // Cancelled Appointments
        $cancelledAppointments = Appointment::where('customer_id', $customerId)
            ->where('status', 'cancelled')
            ->count();

        // Recent Appointments
        $recentAppointments = Appointment::where('customer_id', $customerId)
            ->latest('created_at')
            ->limit(5)
            ->get();


        // Available Services
        $availableServices = Service::where('status', 'active')
            ->limit(5)
            ->get();




        // Dashboard Response
        return response()->json([
            'success' => true,

            'data' => [
                'upcoming_appointment' => $upcomingAppointment,

                'statistics' => [
                    'pending_bookings' => $pendingBookings,
                    'accepted_appointments' => $acceptedAppointments,
                    'completed_appointments' => $completedAppointments,
                    'cancelled_appointments' => $cancelledAppointments,
                ],

                'recent_appointments' => $recentAppointments,
                'available_services' => $availableServices,
            ],
        ]);
    }


}