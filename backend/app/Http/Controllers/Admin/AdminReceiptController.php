<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Receipt;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class AdminReceiptController extends Controller
{
    /**
     * List all receipts
     */
    public function index(Request $request)
    {
        $query = Receipt::with([
            'appointment.company',
            'appointment.customer',
            'appointment.staff',
            'appointment.service',
            'payment',
        ]);

        // Search by receipt number
        if ($request->filled('search')) {
            $search = $request->search;

            $query->where('receipt_number', 'like', "%{$search}%");
        }

        // Filter by appointment
        if ($request->filled('appointment_id')) {
            $query->where(
                'appointment_id',
                $request->appointment_id
            );
        }

        // Filter by payment
        if ($request->filled('payment_id')) {
            $query->where(
                'payment_id',
                $request->payment_id
            );
        }

        // Filter by company
        if ($request->filled('company_id')) {
            $query->whereHas(
                'appointment',
                function ($q) use ($request) {
                    $q->where(
                        'company_id',
                        $request->company_id
                    );
                }
            );
        }

        // Filter by date
        if ($request->filled('date')) {
            $query->whereHas(
                'appointment',
                function ($q) use ($request) {
                    $q->whereDate(
                        'appointment_date',
                        $request->date
                    );
                }
            );
        }

        $receipts = $query
            ->orderByDesc('created_at')
            ->paginate(15);

        return response()->json([
            'success' => true,
            'message' => 'Receipts fetched successfully.',
            'data' => $receipts,
            'errors' => null,
        ], 200);
    }

    /**
     * Show single receipt
     */
    public function show($id)
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
                'success' => false,
                'message' => 'Receipt not found.',
                'data' => null,
                'errors' => null,
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Receipt details fetched successfully.',
            'data' => $receipt,
            'errors' => null,
        ], 200);
    }

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
                'success' => false,
                'message' => 'Receipt not found.',
                'data' => null,
                'errors' => null,
            ], 404);
        }

        $pdf = Pdf::loadView('receipts.pdf', [
            'receipt' => $receipt
        ]);

        $fileName = $receipt->receipt_number . '.pdf';

        $path = 'receipts/' . $fileName;

        Storage::disk('public')->put(
            $path,
            $pdf->output()
        );

        return response()->json([
            'success' => true,
            'message' => 'Receipt PDF saved successfully.',
            'data' => [
                'file' => $fileName,
                'url' => Storage::url($path),
            ],
            'errors' => null,
        ], 200);
    }
}
