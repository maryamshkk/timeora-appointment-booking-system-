<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;

class AdminCompanyController extends Controller
{
     /**
     * List all companies
     */
    public function index(Request $request)
    {
        $query = Company::query();

        // Search
        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        // Status filter
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $companies = $query
            ->orderByDesc('created_at')
            ->paginate(15);

        return response()->json([
            'success' => true,
            'message' => 'Companies fetched successfully.',
            'data' => $companies,
            'errors' => null,
        ], 200);
    }

    /**
     * Show single company with statistics
     */
    public function show($id)
    {
        $company = Company::with([
            'admins',
            'staff',
            'services',
        ])->find($id);

        if (!$company) {
            return response()->json([
                'success' => false,
                'message' => 'Company not found.',
                'data' => null,
                'errors' => null,
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Company details fetched successfully.',
            'data' => [
                'company' => $company,

                'statistics' => [
                    'total_company_users' => $company->admins()->count(),
                    'total_staff' => $company->staff()->count(),
                    'total_services' => $company->services()->count(),
                    'total_appointments' => $company->appointments()->count(),
                    'total_receipts' => $company->appointments()
                        ->whereHas('receipt')
                        ->count(),
                ],
            ],
            'errors' => null,
        ], 200);
    }
}
