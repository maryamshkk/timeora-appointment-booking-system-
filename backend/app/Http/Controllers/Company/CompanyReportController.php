<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Appointment;
use App\Models\Customer;
use App\Models\Staff;
use App\Models\Service;


class CompanyReportController extends Controller
{
    /**
     * Company Reports Overview
     */
    public function overview(Request $request)
    {
        $companyId = Auth::user()->company_id;

        // Validate filters
        $request->validate([
            'from' => ['nullable', 'date'],
            'to' => ['nullable', 'date', 'after_or_equal:from'],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Appointment Query
        |--------------------------------------------------------------------------
        */

        $appointmentsQuery = Appointment::where('company_id', $companyId);

        if ($request->filled('from')) {
            $appointmentsQuery->whereDate(
                'appointment_date',
                '>=',
                $request->from
            );
        }

        if ($request->filled('to')) {
            $appointmentsQuery->whereDate(
                'appointment_date',
                '<=',
                $request->to
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Appointment Statistics
        |--------------------------------------------------------------------------
        */

        $totalAppointments = (clone $appointmentsQuery)->count();

        $completed = (clone $appointmentsQuery)
            ->where('status', 'completed')
            ->count();

        $pending = (clone $appointmentsQuery)
            ->where('status', 'pending')
            ->count();

        $accepted = (clone $appointmentsQuery)
            ->where('status', 'accepted')
            ->count();

        $upcoming = (clone $appointmentsQuery)
            ->whereDate('appointment_date', '>=', now()->toDateString())
            ->whereIn('status', ['pending', 'accepted'])
            ->count();

        $cancelled = (clone $appointmentsQuery)
            ->where('status', 'cancelled')
            ->count();

        $rejected = (clone $appointmentsQuery)
            ->where('status', 'rejected')
            ->count();

        $rescheduled = (clone $appointmentsQuery)
            ->where('status', 'rescheduled')
            ->count();


            /*
        |--------------------------------------------------------------------------
        | Company Resources
        |--------------------------------------------------------------------------
        */

        $totalCustomers = Appointment::where('company_id', $companyId)
            ->distinct('customer_id')
            ->count('customer_id');

        $totalStaff = Staff::where('company_id', $companyId)
            ->count();

        $totalServices = Service::where('company_id', $companyId)
            ->count();



             /*
        |--------------------------------------------------------------------------
        | Response
        |--------------------------------------------------------------------------
        */

        return response()->json([
            'success' => true,
            'message' => 'Company reports overview fetched successfully.',
            'data' => [
                'appointments' => [
                    'total' => $totalAppointments,
                    'completed' => $completed,
                    'pending' => $pending,
                    'upcoming' => $upcoming,
                    'cancelled' => $cancelled,
                    'rejected' => $rejected,
                    'rescheduled' => $rescheduled,
                ],

                'customers' => [
                    'total' => $totalCustomers,
                ],

                'staff' => [
                    'total' => $totalStaff,
                ],

                'services' => [
                    'total' => $totalServices,
                ],

                'filters' => [
                    'from' => $request->from,
                    'to' => $request->to,
                ],
            ],
        ]);
    }

    // Booking analytics
    public function bookings(Request $request)
    {
        $companyId = Auth::user()->company_id;

        $request->validate([
            'from' => 'nullable|date',
            'to' => 'nullable|date|after_or_equal:from',
        ]);

        $query = Appointment::where('company_id', $companyId);

        if ($request->filled('from')) {
            $query->whereDate('appointment_date', '>=', $request->from);
        }

        if ($request->filled('to')) {
            $query->whereDate('appointment_date', '<=', $request->to);
        }

        $bookings = $query
            ->selectRaw('
                DATE(appointment_date) as date,
                COUNT(*) as total,
                SUM(CASE WHEN status = "completed" THEN 1 ELSE 0 END) as completed,
                SUM(CASE WHEN status = "cancelled" THEN 1 ELSE 0 END) as cancelled,
                SUM(CASE WHEN status = "pending" THEN 1 ELSE 0 END) as pending
            ')
            ->groupByRaw('DATE(appointment_date)')
            ->orderBy('date')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $bookings,
        ]);
    }
}
