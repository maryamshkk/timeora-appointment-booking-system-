<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;



class CompanyAdmin extends Model
{
    //

    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [ 
        'company_id',
        'name',
        'email',
        'password_hash',
        'email_verified_at',
        'status',
    ];
    protected $hidden = [
        'password_hash',
    ];
    protected $casts = [
        'email_verified_at' =>'datetime',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function otps(): MorphMany
    {
        return $this->morphMany(Otp::class, 'owner');
    }

    public function auditLogs(): MorphMany
    {
        return $this->morphMany(AuditLog::class, 'actor');
    }
    public function getAuthPassword()
    {
        return $this->password_hash; 
    }
}

