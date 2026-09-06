<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\User;
use App\Models\Staff;
use App\Models\Appointment;
use App\Models\Receipt;

class AdminReportController extends Controller
{
    // all data
    public function overview(Request $request)
    {
 
        $totalCompanies = Company::count();

        $activeCompanies = Company::where('status', 'active')
            ->count();

        $totalUsers = User::count();

        $totalAppointments = Appointment::count();

        $totalReceipts = Receipt::count();

        $statusBreakdown = Appointment::select('status')
            ->selectRaw('COUNT(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        return response()->json([
            'success' => true,
            'data' => [
                'companies' => [
                    'total' => $totalCompanies,
                    'active' => $activeCompanies,
                ],

                'users' => [
                    'total' => $totalUsers,
                ],

                'appointments' => [
                    'total' => $totalAppointments,
                    'status_breakdown' => $statusBreakdown,
                ],

                'receipts' => [
                    'total' => $totalReceipts,
                ],
            ],
        ]);

        
    }

    // companies data
    public function companies(Request $request)
    {
        $request->validate([
            'from' => 'nullable|date',
            'to' => 'nullable|date|after_or_equal:from',
            'status' => 'nullable|string',
        ]);

        $query = Company::query();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $companies = $query
            ->withCount([
                'appointments as total_appointments',
                'staff as total_staff',
                'services as total_services',
            ])
            ->get();

        return response()->json([
            'success' => true,
            'data' => $companies,
        ]);
    }

    // users data
    public function users(Request $request)
    {
        $request->validate([
            'from' => 'nullable|date',
            'to' => 'nullable|date|after_or_equal:from',
        ]);

        $query = User::query();

        $totalUsers = (clone $query)->count();

        $usersByType = (clone $query)
            ->select('user_type')
            ->selectRaw('COUNT(*) as total')
            ->groupBy('user_type')
            ->pluck('total', 'user_type');

        // Staff table
        $totalStaff = Staff::count();

        // Combined users + staff
        $totalUsersAndStaff = $totalUsers + $totalStaff;
        
        return response()->json([
            'success' => true,
            'data' => [
            'total_users' => $totalUsers,
            'total_staff' => $totalStaff,
            'total_users_and_staff' => $totalUsersAndStaff,

            'users_by_type' => $usersByType,

            'staff' => [
                'total' => $totalStaff,
            ],
        ],
        ]);
    }

    // appointments anaytics
    public function appointments(Request $request)
    {
        $request->validate([
            'from' => 'nullable|date',
            'to' => 'nullable|date|after_or_equal:from',
            'status' => 'nullable|string',
            'company_id' => 'nullable|integer|exists:companies,id',
            'staff_id' => 'nullable|integer|exists:staff,id',
            'service_id' => 'nullable|integer|exists:services,id',
        ]);

        $query = Appointment::query();

        if ($request->filled('from')) {
            $query->whereDate('appointment_date', '>=', $request->from);
        }

        if ($request->filled('to')) {
            $query->whereDate('appointment_date', '<=', $request->to);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('company_id')) {
            $query->where('company_id', $request->company_id);
        }

        if ($request->filled('staff_id')) {
            $query->where('staff_id', $request->staff_id);
        }

        if ($request->filled('service_id')) {
            $query->where('service_id', $request->service_id);
        }

        $statusBreakdown = (clone $query)
            ->select('status')
            ->selectRaw('COUNT(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        $bookingTrends = (clone $query)
            ->selectRaw('DATE(appointment_date) as date')
            ->selectRaw('COUNT(*) as total')
            ->groupByRaw('DATE(appointment_date)')
            ->orderBy('date')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'total_appointments' => (clone $query)->count(),
                'status_breakdown' => $statusBreakdown,
                'booking_trends' => $bookingTrends,
            ],
        ]);
    }

    // receipts analytics
    public function receipts(Request $request)
    {
        $request->validate([
            'from' => 'nullable|date',
            'to' => 'nullable|date|after_or_equal:from',
            'company_id' => 'nullable|integer|exists:companies,id',
        ]);

        $query = Receipt::whereHas('appointment', function ($q) use ($request) {

            if ($request->filled('from')) {
                $q->whereDate('appointment_date', '>=', $request->from);
            }

            if ($request->filled('to')) {
                $q->whereDate('appointment_date', '<=', $request->to);
            }

            if ($request->filled('company_id')) {
                $q->where('company_id', $request->company_id);
            }
        });

        $totalReceipts = (clone $query)->count();

        return response()->json([
            'success' => true,
            'data' => [
                'total_receipts' => $totalReceipts,
            ],
        ]);
    }
}
