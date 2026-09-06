<?php

namespace App\Http\Middleware;


use App\Models\SuperAdmin;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SuperAdminMiddleware
{
    public function handle(
        Request $request,
        Closure $next
    ): Response {

        $user = $request->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated.',
                'data' => null,
                'errors' => null,
            ], 401);
        }

        if (!$user instanceof SuperAdmin) {
            return response()->json([
                'success' => false,
                'message' => 'Forbidden. Super Admin access required.',
                'data' => null,
                'errors' => null,
            ], 403);
        }

        if ($user->status !== 'active') {
            return response()->json([
                'success' => false,
                'message' => 'Super Admin account is disabled.',
                'data' => null,
                'errors' => null,
            ], 403);
        }

        return $next($request);
    }
}
