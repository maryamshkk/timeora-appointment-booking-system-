<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Customer extends Authenticatable
{
        use HasApiTokens, Notifiable;

        protected $table = 'customers';

        protected $fillable = [
            'name',
            'email',
            'phone',
            'password_hash',
            'profile_image',
            'email_verified_at',
            'status',
        ];

        protected $hidden = [
            'password_hash',
        ];

        protected $casts = [
            'email_verified_at' => 'datetime',
        ];

        public function getAuthPassword()
        {
            return $this->password_hash;
        }

}
