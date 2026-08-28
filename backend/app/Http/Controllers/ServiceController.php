<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::where(
            'company_id',
            auth()->user()->company_id
        )->get();

        return response()->json([
            'data'=> $services
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
        ]);

        $service = Service::create([
            'name' => $validated['name'],
            'company_id' => auth()->user()->company_id,
        ]);

        return response()->json([
            'message' => 'Service created Successfully',
            'data' => $service,
        ], 201);

    }
}
