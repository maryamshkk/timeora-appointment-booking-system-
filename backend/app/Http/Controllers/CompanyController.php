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

    public function update(Request $request)
    {
        $user = $request->user();

        $company = $user->company;

        // 
        if (!$company) {
            return response()->json([
                'success' => false,
                'message' => 'Company not found.',
                'data' => null,
                'errors' => null,
            ], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|min:2|max:150',
            'email' => 'sometimes|email|max:150|unique:companies,email,' . $company->id,
            'phone' => 'sometimes|string|max:30',

            'address' => 'sometimes|string|max:255',
            'city' => 'sometimes|string|max:100',
            'country' => 'sometimes|string|max:100',

            'description' => 'sometimes|string',
            'website' => 'sometimes|nullable|url|max:255',
            'timezone' => 'sometimes|string|max:100',

            'logo' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]); 

        // Update normal fields
        $company->update([
            'name' => $validated['name'] ?? $company->name,
            'email' => $validated['email'] ?? $company->email,
            'phone' => $validated['phone'] ?? $company->phone,
            'address' => $validated['address'] ?? $company->address,
            'city' => $validated['city'] ?? $company->city,
            'country' => $validated['country'] ?? $company->country,
            'description' => $validated['description'] ?? $company->description,
            'website' => $validated['website'] ?? $company->website,
            'timezone' => $validated['timezone'] ?? $company->timezone,
        ]);

        // Upload photo
        if($request->hasFile('logo')){

        $path = $request->file('logo')
        ->store('companies/logos', 'public');

        $company->update([
            'logo_path' => $path
        ]);
    }



    return response()->json([
        'success' => true,
        'message' => 'company updated successfully',
        'data' => [
            'company' => $company->fresh(),
        ],
        'errors' => null,
    ], 200);


    }

}
