<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Holiday;

class HolidayController extends Controller
{
    // Get holiday schedule
    public function index(Request $request)
    {
        $companyId = auth()->user()->company_id;

        $holidays = Holiday::where('company_id', $companyId)
                    ->orderBy('holiday_date')
                    ->get();
        
        return response()->json([
            'success' => true, 
            'message' => 'Holidays fetched completely',
            'data' => $holidays,
        ]);
    }

    // Poost new holiday 
    public function store(Request $request)
    {
        $companyId = auth()->user()->company_id;

        $validated = $request->validate([
            'holiday_date' => [
                'required',
                'date',
            ],

            'name' => [
                'required',
                'string',
                'max:150',
            ],        
        ]);

        // Holiday existence check
        $exists = Holiday::where('company_id', $companyId)
                    ->where('holiday_date', $validated['holiday_date'])
                    ->exists();
            if($exists) {
                return response()->json([
                    'success' => false,
                    'message' => 'A holiday already exists for this date.',
                ], 422);
            }

        $holiday = Holiday::create([
            'company_id' => $companyId,
            'holiday_date' => $validated['holiday_date'],
            'name' => $validated['name'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Holiday created successfully.',
            'data' => $holiday,
        ], 201);
    }

    
    // Update existing holiday 
    public function update(Request $request, $holidayId)
    {
        $companyId = auth()->user()->company_id;
        
        $holiday = Holiday::where('id', $holidayId)
                ->where('company_id', $companyId)
                ->firstOrFail();

        $validated = $request->validate([
            'holiday_date' => [
                'required',
                'date',
            ],

            'name' => [
                'required',
                'string',
                'max:150',
            ],        
        ]);

        
        $holiday->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Holiday updated successfully.',
            'data' => $holiday,
        ], 201);
    }

    // Delete existing holiday 
    public function destroy(Request $request, $holidayId)
    {
        $companyId = auth()->user()->company_id;
        
        $holiday = Holiday::where('id', $holidayId)
                ->where('company_id', $companyId)
                ->firstOrFail();
        
        $holiday->delete();

        return response()->json([
            'success' => true,
            'message' => 'Holiday deleted successfully.',
        ]);
    }




}
