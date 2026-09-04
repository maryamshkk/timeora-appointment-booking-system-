<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\StaffAvailability;
use App\Models\Staff;
use Illuminate\Http\Request;

class StaffDashboardController extends Controller
{
    public function index(Request $request)
    {
         // Logged-in Staff
        $staff = $request->user();

        if (!$staff || !($staff instanceof Staff)) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized.',
                'data' => null,
                'errors' => null,
            ], 401);
        }

        $staffId = $staff->id;


        // Today's Availability
        $todayAvailability = StaffAvailability::where('staff_id', $staffId)
            ->where('day_of_week', now()->dayOfWeekIso)
            ->first();

        // Today's Appointments
        $todayAppointments = Appointment::where('staff_id', $staffId)
            ->whereDate('appointment_date', today())
            ->orderBy('start_time')
            ->get();

        // Upcoming Appointments
        $upcomingAppointments = Appointment::where('staff_id', $staffId)
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

        // Appointment Statistics
        $pendingAppointments = Appointment::where('staff_id', $staffId)
            ->where('status', 'pending')
            ->count();

        $completedAppointments = Appointment::where('staff_id', $staffId)
            ->where('status', 'completed')
            ->count();

        $cancelledAppointments = Appointment::where('staff_id', $staffId)
            ->where('status', 'cancelled')
            ->count();

        $totalAppointments = Appointment::where('staff_id', $staffId)
            ->count();

        // Recent Activity
        $recentActivity = Appointment::where('staff_id', $staffId)
            ->latest('created_at')
            ->limit(5)
            ->get();

        // Dashboard Response
        return response()->json([
            'success' => true,

            'data' => [
                'statistics' => [
                    'today_appointments' => $todayAppointments,
                    'pending_appointments' => $pendingAppointments,
                    'completed_appointments' => $completedAppointments,
                    'cancelled_appointments' => $cancelledAppointments,
                    'total_appointments' => $totalAppointments,
                ],

                'upcoming_appointments' => $upcomingAppointments,
                'recent_activity' => $recentActivity,
                'today_availability' => $todayAvailability,
            ],
        ]);
    }
}