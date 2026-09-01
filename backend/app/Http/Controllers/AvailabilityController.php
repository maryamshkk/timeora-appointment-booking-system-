<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AvailabilityController extends Controller
{
    // Get availability
    public function index(Request $request)
    {
        return response()->json([
            'success' => true,
            'message' => 'Availability API is working.',
        ]);
    }

}
