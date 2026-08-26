<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Customer extends Authenticatable
{
        use HasApiTokens, HasFactory, Notifiable;

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

        public function otps(): MorphMany
        {
            return $this->morphMany(Otp::class, 'owner');
        }

        public function getAuthPassword()
        {
            return $this->password_hash;
        }

}
