<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;

class ServiceController extends Controller
{
    // GET ALL SERVICES
    public function index()
    {
        $services = Service::where(
            'company_id',
            auth()->user()->company_id
        )->with('category', 'staff')->get();

        return response()->json([
            'success' => true,
            'message' => 'Services fetched successfully',
            'data'=> $services,
        ]);
    }

    // CREATE SERVICE
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'nullable|string',
            'category_id' => 'nullable|exists:categories,id',
            'duration' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'status' => 'nullable|in:active,disabled',
            'staff_ids' => 'nullable|array',
            'staff_ids.*' => 'exists:staff,id',
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
