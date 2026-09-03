<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        
            $user = $request->user();

            if(!$user){
                return response()->json([
                    'success' => false,
                    'message' => 'Unathenticated.',
                    'data' => null,
                    'errors' => null,
                ], 401);
            }
                        // Staff
            if ($user instanceof \App\Models\Staff) {

                if (in_array('staff', $roles)) {
                    return $next($request);
                }

                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized.',
                    'data' => null,
                    'errors' => null,
                ], 403);
            }

            if (!in_array($user->user_type, $roles)) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized.',
                'data' => null,
                'errors' => null,
            ], 403);
        }

        return $next($request);
    }
}
