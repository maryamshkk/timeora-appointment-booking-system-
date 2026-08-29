<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CompanyController extends Controller
{
    //GET COMPANY
    public function show(Request $request)
    {
        $user = $request->user();

        $company = $user->company;

        if(!$company)
            {
                return response()->json([
                    'success' => false,
                    'message' => 'Company not found',
                    'data' => null,
                    'errors' => null,
                ], 404);
            }
        
            return response()->json([
                'success' => true,
                'message' => 'Company fetched successfully',
                'data' => [
                    'company' => $company,
                ],
                'errors' => null,
            ], 200);
    }

}
