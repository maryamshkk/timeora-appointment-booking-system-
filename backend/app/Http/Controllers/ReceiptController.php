<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Receipt;
use Barryvdh\DomPDF\Facade\Pdf;

class ReceiptController extends Controller
{
    // show receipt details
    public function show(Request $request, $id)
    {
        $receipt = Receipt::with([
            'appointment.customer',
            'appointment.company',
            'appointment.staff',
            'appointment.service',
            'payment'
        ])->find($id);

        if(!$receipt)
            {
                return response()->json([
                    'message' => 'Receipt not found',
                ]);
            }
        
            $user = $request->user();


            // Super Admin
            if($user instanceof User && $user->user_type === 'super_admin') 
            {
                return response()->json($receipt);
            }

            // Customer
            if($user instanceof User && $user->user_type === 'customer')
            {
                if($receipt->appointment->customer_id != $user->id) 
                {
                    return response()->json([
                            'message' => 'Unauthorized'
                    ], 403);
                }
            }

            // Company Admin
            if($user instanceof User && $user->user_type === 'company_admin')
            {
                if($receipt->appointment->company_id != $user->company_id) 
                    {
                        return response()->json([
                            'message' => 'Unauthorized'
                        ], 403);
                    }
            }

            // Staff
            if($user instanceof Staff)
            {
                if($receipt->appointment->staff_id != $user->id) 
                    {
                        return response()->json([
                            'message' => 'Unauthorized'
                        ], 403);
                    }
            }

        return response()->json([
            'message' => 'Receipt retrieved successfully',

            'receipt' => [
                'receipt_number' => $receipt->receipt_number,
                'company' => $receipt->appointment->company,
                'customer' => $receipt->appointment->customer,
                'staff' => $receipt->appointment->staff,
                'service' => $receipt->appointment->service,

                'appointment_date' => $receipt->appointment->date,
                'appointment_time' => $receipt->appointment->start_time,

                'payment_amount' => $receipt->payment->amount,
                'payment_method' => $receipt->payment->method,
                'payment_status' => $receipt->payment->status,
                'paid_at' => $receipt->payment->paid_at,
            ]
        ]);
            
    }
    
    // get receipt
    public function index()
    {
        $user = auth()->user();

        $query = Receipt::with([
            'appointment.company',
            'appointment.customer',
            'appointment.staff',
            'appointment.service',
            'payment',
        ]);

        // Customer
        if ($user instanceof \App\Models\User && $user->user_type === 'customer') {
            $query->whereHas('appointment', function ($q) use ($user) {
                $q->where('customer_id', $user->id);
            });
        }

        // Company Admin
        if ($user instanceof \App\Models\User && $user->user_type === 'company_admin') {
            $query->whereHas('appointment', function ($q) use ($user) {
                $q->where('company_id', $user->company_id);
            });
        }

        // Staff
        if ($user instanceof \App\Models\Staff) {
            $query->whereHas('appointment', function ($q) use ($user) {
                $q->where('staff_id', $user->id);
            });
        }

        $receipts = $query->latest()->get();

        return response()->json([
            'message' => 'Receipts retrieved successfully',
            'receipts' => $receipts,
        ]);
    }

    // pdf details
    public function pdf($id)
    {
            $receipt = Receipt::with([
            'appointment.company',
            'appointment.customer',
            'appointment.staff',
            'appointment.service',
            'payment',
        ])->find($id);

        if (!$receipt) {
            return response()->json([
                'message' => 'Receipt not found'
            ], 404);
        }

        $pdf = Pdf::loadView('receipts.pdf', [
            'receipt' => $receipt
        ]);

        return $pdf->stream(
            $receipt->receipt_number . '.pdf'
        );

    }

}
