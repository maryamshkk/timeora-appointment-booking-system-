<?php

namespace App\Http\Controllers;

use App\Models\BusinessWorkingHour;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CompanyWorkingHoursController extends Controller
{
    // GET COMPANY BUSINESS WORKING HOURS
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

    // PUT COMPANY BUSINESS WORKING HOURS
    public function update(Request $request)
    {
        $companyId = auth()->user()->company_id;

        // validate format
        $validated = $request->validate([
            'working_hours' => ['required', 'array', 'size:7'],

             'working_hours.*.day_of_week' => [
                'required',
                'integer',
                'between:0,6',
            ],

            'working_hours.*.is_open' => [
                'required',
                'boolean',
            ],

            'working_hours.*.opening_time' => [
                'nullable',
                'date_format:H:i',
            ],

            'working_hours.*.closing_time' => [
                'nullable',
                'date_format:H:i',
            ],
            ]);

            DB::transaction(function() use ($validated, $companyId){
            
            foreach($validated['working_hours'] as $day)
            {
            // If shop is open, both times are required
                if($day['is_open'])
                {
                    if(!$day['opening_time'] || !$day['closing_time'])
                    {
                        return response()->json([
                            'success' => false,
                            'message' => 'Opening and closing time are required',
                        ], 422);
                        }
                                
                    if($day['opening_time'] >= $day['closing_time'])
                    {
                        return response()->json([
                        'success' => false,
                        'message' => 'Opening time must be before closing time',
                        ], 422);
                    }
                }
            }

            BusinessWorkingHour::updateOrCreate(
                [
                    'company_id' => $companyId,
                    'day_of_week' => $day['day_of_week']
                ],
                [
                    'is_open' => $day['is_open'],
                    'opening_time' => $day['is_open'] ? $day['opening_time'] : null,
                    'closing_time' => $day['is_open'] ? $day['closing_time'] : null,
                ],
            );

        });
        return response()->json([
            'success' => true,
            'message' => 'Business Working Hours updated successfully',
        ]);
    
        

    }
    
}

