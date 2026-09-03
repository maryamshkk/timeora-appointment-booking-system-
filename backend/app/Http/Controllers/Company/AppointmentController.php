<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Customer;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    // Get Appointments
    public function index(Request $request)
    {
        $user = $request->user();

        $appointment = Appointment::with([
            'customer:id,name,email',
            'staff:id,first_name,last_name',
            'service:id,name,duration'
        ])
        ->where('company_id', $user->company_id)
        ->latest('appointment_date')
        ->latest('start_time')
        ->get();

        return response()->json([
            'success' => true,
            'message' => 'Company appointments retrieved successfully.',
            'data' => $appointment,
        ]);
    }

     /**
     * Get single appointment.
     */
    
    public function show(Request $request, $id)
    {
        $user = $request->user();

        $appointment = Appointment::with([
            'customer:id,name,email',
            'staff:id,first_name,last_name',
            'service:id,name,duration'
        ])
        ->where('company_id', $user->company_id)
        ->find($id);

        if(!$appointment){
            return response()->json([
                'success' => false,
                'message' => 'Appointment not found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Company appointments retrieved successfully.',
            'data' => $appointment,
        ]);
    }

     /**
     * Accept appointment.
     */

    public function accept(Request $request, $id)
    {
        $user = $request->user();

        $appointment = Appointment::where('company_id', $user->company_id)
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
        $user = $request->user();

        $appointment = Appointment::where('company_id', $user->company_id)
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

     /**
     * Cancel appointment.
     */
    public function cancel(Request $request, $id)
    {
        $user = $request->user();

        $appointment = Appointment::where('company_id', $user->company_id)
            ->find($id);

        if (!$appointment) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment not found.',
            ], 404);
        }

        if (in_array($appointment->status, [
            'cancelled',
            'rejected',
            'completed',
        ])) {
            return response()->json([
                'success' => false,
                'message' => 'This appointment cannot be cancelled.',
            ], 422);
        }

        $appointment->update([
            'status' => 'cancelled',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Appointment cancelled successfully.',
            'data' => $appointment->fresh(),
        ]);
    }
}
