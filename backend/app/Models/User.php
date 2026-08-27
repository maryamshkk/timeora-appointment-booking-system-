<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;   

    protected $fillable = [
        'user_type',
        'company_id',
        'name',
        'email',
        'phone',
        'password',
        'profile_image',
        'status',
        'email_verified_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function otps(): MorphMany
    {
        return $this->morphMany(Otp::class, 'owner');
    }

    public function isCompanyAdmin(): bool
    {
        return $this->user_type === 'company_admin';
    }

    public function isCustomer(): bool
    {
        return $this->user_type === 'customer';
    }
}