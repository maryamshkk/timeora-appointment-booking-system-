<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use App\Models\User;
use App\Models\Staff;
use App\Models\Service;
use App\Models\Appointment;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'email',
        'phone',
        'logo_path',
        'description',
        'website',
        'address',
        'city',
        'country',
        'timezone',
        'status',
        'email_verified_at',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    
    public function staff(): HasMany
    {
        return $this->hasMany(Staff::class, 'company_id');
    }

    public function services(): HasMany
    {
        return $this->hasMany(Service::class, 'company_id');
    }

    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class, 'company_id');
    }
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function admins(): HasMany
    {
        return $this->hasMany(User::class, 'company_id')
        ->where('user_type', 'company_admin');
    }

    public function workingHours(): HasMany
    {
        return $this->hasMany(BusinessWorkingHour::class);
    }

    public function holidays(): HasMany
    {
        return $this->hasMany(Holiday::class);
    }

    public function settings(): HasOne
    {
        return $this->hasOne(CompanySetting::class);
    }
}