<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;


class RoleController extends Controller
{
    public function index()
    {
        $roles=Role::where(
            'company_id',
            $auth()->user()->company_id
        )->get();

        return response()->json([
            'data'=> $roles
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
        ]);

        $role = Role::create([
            'name' => $validated['name'],
            'company_id' => auth()->user()->company_id,
        ]);

        return response()->json([
            'message' => 'Role created Successfully',
            'data' => $role,
        ], 201);

    }
}
