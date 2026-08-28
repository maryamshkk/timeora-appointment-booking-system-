<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index()
    {
        $roles=Role::where(
            'company_id',
            $auth()->user->company_id
        )->get();

        return response()->json([
            'data'=> $roles
        ]);
    }
    
}
