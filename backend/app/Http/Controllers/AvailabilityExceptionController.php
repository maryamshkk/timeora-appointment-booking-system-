<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AvailabilityException;
use App\Models\Staff;


class AvailabilityExceptionController extends Controller
{
    // Get availability exception row
    public function index(Request $request, $staffId)
    {
        $companyId = $request->user()->company_id;

        $staff = Staff::where('id', $staffId)
            ->where('company_id', $companyId)
            ->firstOrFail();

        $exceptions = AvailabilityException::where('staff_id', $staff->id)
            ->orderBy('exception_date')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $exceptions,
        ]);
    }
}
