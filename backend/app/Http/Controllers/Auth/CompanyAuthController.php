<?php

namespace App\Http\Controllers\Auth\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Company;
use App\Models\CompanyAdmin;
use App\Models\Otp;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;




class CompanyAuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate(['company_name' => [
                'required'|
                'string'|
                'min:2'|
                'max:150'
            ],

            'business_email' => [
                'required'|
                'string'|
                'max:150'
            ],

            'phone_number' => [
                'required'|
                'string'|
                'regex:/^\+[1-9]\d{7,14}$/',
            ],

            'business_type' => [
                'required',
                'integer',
                function($attribute, $value, $fail){
                    $exists = Category::where('id', $value)
                    ->where('status', 'active')
                    ->exists();

                    if (! $exists) {
                        $fail('The selected business type is invalid.');
                    }
                },

            ],


            'full_name' => 'required|string|min:2|max:150',
            'admin_email' => 'required|email|unique:company_admins,email',

                'password' =>[
                    'required',
                    'min:8',
                    'regex:/[A-Z]/',
                    'regex:/[a-z]/',
                    'regex:/[0-9]/',
                    'regex:/[^A-Za-z0-9/]',
                ],
                'confirm_password' => 'required',
                    'same:password',

                'terms_accepted' => 
                    'required',
                    'accepted',
        ]);
    }
}
