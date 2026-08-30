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
            'description' => $validated['description'] ?? null,
            'category_id' => $validated['category_id'] ?? null,
            'duration' => $validated['duration'],
            'price' => $validated['price'],
            'status' => $validated['status'] ?? 'active',
        ]);

        // Assign staff
        if(!empty($validated['staff_ids'])) {
            $service->staff()->sync($validated['staff_ids']);
        }

        return response()->json([
            'message' => 'Service created Successfully',
            'data' => $service,
        ], 201);

    }

    // GET SINGLE SERVICE
    public function show($id)
    {
        $service = Service::where('company_id', 
                    auth()->user()->company_id)
                    ->with('category', 'staff')
                    ->find($id);

                    if(!$service)
                        {
                            return response()->json([
                                'success' => false,
                                'message' => 'Service not found',
                                'data' => null,
                            ], 404);
                        }
        return response()->json([
            'success' => true,
            'message' => 'Service fetched sucessfully',
            'data' => $service,
        ]);
    }

    // UPDATE SERVICE
    public function update(Request $request, $id)
    {
        $service = Service::where(
            'company_id',
            auth()->user()->company_id
        )->find($id);

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Service not found.',
                'data' => null,
            ], 404);
        }

        $validated = $request->validate([
        'name' => 'sometimes|string|max:150',
        'description' => 'nullable|string',
        'category_id' => 'nullable|exists:categories,id',
        'duration' => 'sometimes|integer|min:1',
        'price' => 'sometimes|numeric|min:0',
        'status' => 'sometimes|in:active,disabled',
        'staff_ids' => 'nullable|array',
        'staff_ids.*' => 'exists:staff,id',
    ]);

        $service->update($validated);

        if(isset($validated['staff_ids'])) {
            $service->staff()->sync($validated['staff_ids']);
        }

        return  response()->json([
            'success' => true,
            'message' => 'Service updated successfully.',
            'data' => $service->fresh()->load('category', 'staff'),
        ]);

    }

    // DELETE SERVICE
    public function destroy($id)
    {
        $service = Service::where('company_id',
            auth()->user()->company_id)
            ->find($id);

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Service not found.',
                'data' => null,
            ], 404);
        }

        $service->delete();

        return response()->json([
            'success' => true,
            'message' => 'Service deleted successfully.',
            'data' => null,
        ]);


    }
}
