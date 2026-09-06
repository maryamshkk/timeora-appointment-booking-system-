<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\User;
use App\Models\Appointment;
use App\Models\Receipt;

class AdminReportController extends Controller
{
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
    
}
