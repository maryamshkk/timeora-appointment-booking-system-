<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Appointment;
use App\Models\Customer;
use App\Models\Staff;
use App\Models\Service;
use App\Models\Payment;
use App\Models\Receipt;


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
            $query->whereDate(
                'appointment_date',
                '>=',
                $request->from
            );
        }

        if ($request->filled('to')) {
            $query->whereDate(
                'appointment_date',
                '<=',
                $request->to
            );
        }
        

        $bookings = (clone $query)
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


        // Status breakdown
        $statusBreakdown = (clone $query)
            ->select('status')
            ->selectRaw('COUNT(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        $cancellationCount = (clone $query)
            ->where('status', 'cancelled')
            ->count();

        return response()->json([
            'success' => true,
            'data' => [
            'daily_trends' => $bookings,

            'status_breakdown' => $statusBreakdown,

            'cancellation_count' => $cancellationCount,
        ],
        ]);
    }

    // Customer analytics
    public function customers(Request $request)
    {
        $companyId = Auth::user()->company_id;

        $request->validate([
            'from' => 'nullable|date',
            'to' => 'nullable|date|after_or_equal:from',
        ]);

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

        $totalCustomers = Appointment::where('company_id', $companyId)
            ->distinct('customer_id')
            ->count('customer_id');

        $customersWithAppointments = (clone $appointmentsQuery)
            ->whereNotNull('customer_id')
            ->distinct('customer_id')
            ->count('customer_id');

        $topCustomers = (clone $appointmentsQuery)
            ->select('customer_id')
            ->selectRaw('COUNT(*) as appointment_count')
            ->whereNotNull('customer_id')
            ->groupBy('customer_id')
            ->orderByDesc('appointment_count')
            ->with('customer')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'total_customers' => $totalCustomers,
                'customers_with_appointments' => $customersWithAppointments,
                'top_customers' => $topCustomers,
            ],
        ]);
    }

    // staff analytics
    public function staff(Request $request)
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

        $staff = Staff::where('company_id', $companyId)
            ->withCount([
                'appointments as total_appointments' => function ($q) use ($request) {
                    if ($request->filled('from')) {
                        $q->whereDate('appointment_date', '>=', $request->from);
                    }

                    if ($request->filled('to')) {
                        $q->whereDate('appointment_date', '<=', $request->to);
                    }
                },

                'appointments as completed_appointments' => function ($q) use ($request) {
                    $q->where('status', 'completed');

                    if ($request->filled('from')) {
                        $q->whereDate('appointment_date', '>=', $request->from);
                    }

                    if ($request->filled('to')) {
                        $q->whereDate('appointment_date', '<=', $request->to);
                    }
                },

                'appointments as cancelled_appointments' => function ($q) use ($request) {
                    $q->where('status', 'cancelled');

                    if ($request->filled('from')) {
                        $q->whereDate('appointment_date', '>=', $request->from);
                    }

                    if ($request->filled('to')) {
                        $q->whereDate('appointment_date', '<=', $request->to);
                    }
                },

                'appointments as rejected_appointments' => function ($q) use ($request) {
                    $q->where('status', 'rejected');

                    if ($request->filled('from')) {
                        $q->whereDate('appointment_date', '>=', $request->from);
                    }

                    if ($request->filled('to')) {
                        $q->whereDate('appointment_date', '<=', $request->to);
                    }
                },

                'appointments as pending_appointments' => function ($q) use ($request) {
                    $q->where('status', 'pending');

                    if ($request->filled('from')) {
                        $q->whereDate('appointment_date', '>=', $request->from);
                    }

                    if ($request->filled('to')) {
                        $q->whereDate('appointment_date', '<=', $request->to);
                    }
                },
            ])
            ->get();

        $staff->each(function ($member) {
            $member->completion_rate = $member->total_appointments > 0
                ? round(
                    ($member->completed_appointments / $member->total_appointments) * 100,
                    2
                )
                : 0;
        });

        return response()->json([
            'success' => true,
            'data' => $staff,
        ]);
    }

    public function payments(Request $request)
    {
        $companyId = Auth::user()->company_id;

        $request->validate([
            'from' => 'nullable|date',
            'to' => 'nullable|date|after_or_equal:from',
        ]);

        $query = Payment::whereHas('appointment', function ($q) use ($companyId, $request) {
            $q->where('company_id', $companyId);

            if ($request->filled('from')) {
                $q->whereDate('appointment_date', '>=', $request->from);
            }

            if ($request->filled('to')) {
                $q->whereDate('appointment_date', '<=', $request->to);
            }
        });

        $totalPayments = (clone $query)->count();

        $paidAppointments = (clone $query)
            ->where('status', 'paid')
            ->count();

        $unpaidAppointments = (clone $query)
            ->where('status', 'unpaid')
            ->count();

        $statusBreakdown = (clone $query)
            ->select('status')
            ->selectRaw('COUNT(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        $receiptCount = Receipt::whereHas('appointment', function ($q) use ($companyId, $request) {
            $q->where('company_id', $companyId);

            if ($request->filled('from')) {
                $q->whereDate('appointment_date', '>=', $request->from);
            }

            if ($request->filled('to')) {
                $q->whereDate('appointment_date', '<=', $request->to);
            }
        })->count();

        return response()->json([
            'success' => true,
            'data' => [
                'total_payments' => $totalPayments,
                'paid_appointments' => $paidAppointments,
                'unpaid_appointments' => $unpaidAppointments,
                'status_breakdown' => $statusBreakdown,
                'receipt_count' => $receiptCount,
            ],
        ]);
    }
    
}
