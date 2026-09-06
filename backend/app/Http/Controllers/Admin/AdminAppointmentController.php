<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;


class AdminAppointmentController extends Controller
{
    /**
     * List all appointments
     */
    public function index(Request $request)
    {
        $query = Appointment::with([
            'company',
            'customer',
            'staff',
            'service',
        ]);

        // Search by company/customer/staff/service
        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {

                $q->whereHas('company', function ($company) use ($search) {
                    $company->where('name', 'like', "%{$search}%");
                })

                ->orWhereHas('customer', function ($customer) use ($search) {
                    $customer->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                })

                ->orWhereHas('staff', function ($staff) use ($search) {
                    $staff->where('first_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%")
                        ->orWhere('account_email', 'like', "%{$search}%");
                })

                ->orWhereHas('service', function ($service) use ($search) {
                    $service->where('name', 'like', "%{$search}%");
                });
            });
        }

        // Company filter
        if ($request->filled('company_id')) {
            $query->where('company_id', $request->company_id);
        }

        // Staff filter
        if ($request->filled('staff_id')) {
            $query->where('staff_id', $request->staff_id);
        }

        // Customer filter
        if ($request->filled('customer_id')) {
            $query->where('customer_id', $request->customer_id);
        }

        // Specific date
        if ($request->filled('date')) {
            $query->whereDate(
                'appointment_date',
                $request->date
            );
        }

        // Date range
        if ($request->filled('from_date')) {
            $query->whereDate(
                'appointment_date',
                '>=',
                $request->from_date
            );
        }

        if ($request->filled('to_date')) {
            $query->whereDate(
                'appointment_date',
                '<=',
                $request->to_date
            );
        }

        $appointments = $query
            ->orderBy('appointment_date')
            ->orderBy('start_time')
            ->paginate(15);

        return response()->json([
            'success' => true,
            'message' => 'Appointments fetched successfully.',
            'data' => $appointments,
            'errors' => null,
        ], 200);

    }

        /**
     * Show single appointment
     */
    public function show($id)
    {
        $appointment = Appointment::with([
            'company',
            'customer',
            'staff',
            'service',
            'payment',
            'receipt',
        ])->find($id);

        if (!$appointment) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment not found.',
                'data' => null,
                'errors' => null,
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Appointment details fetched successfully.',
            'data' => $appointment,
            'errors' => null,
        ], 200);
    }
}
