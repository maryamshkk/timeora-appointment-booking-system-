<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Receipt;


class ReceiptController extends Controller
{
    public function show(Request $request, $id)
    {
        $receipt = Receipt::with([
            'appointment.customer',
            'appointment.company',
            'appointment.staff',
            'appointment.service',
            'payment'
        ])->find($id);

        if(!$receipt)
            {
                return response()->json([
                    'message' => 'Receipt not found',
                ]);
            }
        
            $user = $request->user();


            if($user instanceof User && $user->user_type === 'super_admin') 
            {
                return response()->json($receipt);
            }


            if($user instanceof User && $user->user_type === 'customer')
            {
                if($receipt->appointment->customer_id != $user->id) 
                {
                    return response()->json([
                            'message' => 'Unauthorized'
                    ], 403);
                }
            }

            if($user instanceof User && $user->user_type === 'company_admin')
            {
                if($receipt->appointment->company_id != $user->company_id) 
                    {
                        return response()->json([
                            'message' => 'Unauthorized'
                        ], 403);
                    }
            }
            if($user instanceof Staff)
            {
                if($receipt->appointment->staff_id != $user->id) 
                    {
                        return response()->json([
                            'message' => 'Unauthorized'
                        ], 403);
                    }
            }

        return response()->json($receipt);
            
    }
    
}
