<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\Staff;
use App\Models\Service;


class AvailabilityController extends Controller
{
    // Get availability
    public function index(Request $request)
    {
        $validated = $request->validate([
        'company_id' => [
            'required',
            'integer',
            'exists:companies,id',
        ],

        'staff_id' => [
            'required',
            'integer',
            'exists:staff,id',
        ],

        'service_id' => [
            'required',
            'integer',
            'exists:services,id',
        ],

        'date' => [
            'required',
            'date',
            'date_format:Y-m-d',
        ],
    ]);

            // check authenticated company  
            $company = Company::findOrFail(
                    $validated['company_id']
                );

            // check staff belongs to sepcified company
            $staff = Staff::where('id', $validated['staff_id'])
                        ->where('company_id', $company->id)
                    ->first();

                if (!$staff) {
                    return response()->json([
                        'success' => false,
                        'message' => 'The selected staff member does not belong to this company.',
                    ], 422);
            }

            // check service belongs to sepcified company
            $service = Service::where('id', $validated['service_id'])
                ->where('company_id', $company->id)
                ->first();

                if (!$service) {
                    return response()->json([
                        'success' => false,
                        'message' => 'The selected service does not belong to this company.',
                    ], 422);
                }

                // 5. Verify staff is assigned to service
                $staffHasService = $staff->services()
                        ->where('services.id', $service->id)
                        ->exists();

                    if(!$staffHasService) {
                        return response()->json([
                            'success' => false,
                            'message' => 'The selected service is not assigned to this staff member.',
                        ], 422);
                    }

            return response()->json([
                'success' => true,
                'message' => 'Availability request is valid.',
                'data' => [
                    'company_id' => $company->id,
                    'staff_id' => $staff->id,
                    'service_id' => $service->id,
                    'date' => $validated['date'],
                ],
        ]);
    }

}
