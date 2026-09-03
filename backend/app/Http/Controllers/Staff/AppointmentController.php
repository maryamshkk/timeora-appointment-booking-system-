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

    /**
     * Get single appointment.
     */
    public function show(Request $request, $id)
    {
        $staff = $request->user();

        if (!$staff) {
            return response()->json([
                'success' => false,
                'message' => 'Staff profile not found.',
            ], 404);
        }

        $appointment = Appointment::with([
            'customer:id,name,email',
            'company:id,name',
            'service:id,name,duration',
        ])
            ->where('staff_id', $staff->id)
            ->find($id);

        if (!$appointment) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment not found.',
            ], 404);
        }
         return response()->json([
            'success' => true,
            'message' => 'Appointment retrieved successfully.',
            'data' => $appointment,
        ]);
    }

     /**
     * Accept appointment.
     */
    public function accept(Request $request, $id)
    {
        $staff = $request->user();
 

        if (!$staff) {
            return response()->json([
                'success' => false,
                'message' => 'Staff profile not found.',
            ], 404);
        }

        $appointment = Appointment::where('staff_id', $staff->id)
            ->find($id);

        if (!$appointment) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment not found.',
            ], 404);
        }

        if ($appointment->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Only pending appointments can be accepted.',
            ], 422);
        }

        $appointment->update([
            'status' => 'accepted',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Appointment accepted successfully.',
            'data' => $appointment->fresh(),
        ]);
    }


    /**
     * Reject appointment.
     */
    public function reject(Request $request, $id)
    {
        $staff = $request->user();


        if (!$staff) {
            return response()->json([
                'success' => false,
                'message' => 'Staff profile not found.',
            ], 404);
        }

        $appointment = Appointment::where('staff_id', $staff->id)
            ->find($id);

        if (!$appointment) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment not found.',
            ], 404);
        }

        if ($appointment->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Only pending appointments can be rejected.',
            ], 422);
        }

        $appointment->update([
            'status' => 'rejected',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Appointment rejected successfully.',
            'data' => $appointment->fresh(),
        ]);
    }
}
