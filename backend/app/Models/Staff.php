<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'company_id',
        'staff_id',
        'first_name',
        'last_name',
        'photo_path',
        'role_id',
        'phone',
        'account_email',
        'password_hash',
        'bio',
        'invitation_status',
        'invitation_token',
        'invitation_sent_at',
        'email_verified_at',
        'status',
        'is_active',
    ];

    protected $hidden = [
        'password_hash',
        'invitation_token',
    ];

    protected $casts = [
        'invitation_sent_at' => 'datetime',
        'email_verified_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    /**
     * Staff belongs to a company.
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Staff belongs to a role.
     */
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * Staff can provide many services.
     */
    public function services(): BelongsToMany
    {
        return $this->belongsToMany(
            Service::class,
            'staff_service'
        );
    }

    /**
     * Staff has many availability records.
     */
    public function availability(): HasMany
    {
        return $this->hasMany(StaffAvailability::class);
    }
}
