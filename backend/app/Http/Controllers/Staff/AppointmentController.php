<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;
use App\Models\Staff;

class AppointmentController extends Controller
{
     /**
     * Get logged-in staff's appointments.
     */
    public function index(Request $request)
    {
        $staff = $request->user();

        

        if (!$staff) {
            return response()->json([
                'success' => false,
                'message' => 'Staff profile not found.',
            ], 404);
        }

        $appointments = Appointment::with([
            'customer:id,name,email',
            'company:id,name',
            'service:id,name,duration',
        ])
            ->where('staff_id', $staff->id)
            ->latest('appointment_date')
            ->latest('start_time')
            ->get();
            return response()->json([
            'success' => true,
            'message' => 'Staff appointments retrieved successfully.',
            'data' => $appointments,
        ]);
    }
}
