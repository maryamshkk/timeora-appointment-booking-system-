<?php

namespace App\Http\Controllers;

use App\Models\BusinessWorkingHour;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CompanyWorkingHoursController extends Controller
{
    public function index(Request $request)
    {
        $companyId = $request->user()->company_id;

        $workingHours = BusinessWorkingHour::where('company_id', $companyId)
                        ->orderBy('day_of_week')
                        ->get();

            return response()->json([
                'success' => true,
                'data' => $workingHours,
            ]);
    }

    
    
}
