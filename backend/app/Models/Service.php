<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
     use HasFactory;

    protected $fillable = [
        'name',
        'company_id',
    ];

    /**
     * Service belongs to a company.
     */
    public function company(): BelongsTo
    {
        return $this->belongTo(Company::class);
    }

    // Service can belong to staff members
    public function staff(): BelongsToMany
    {
        return $this->belongTo(
            Staff::class,
            'staff_service' 
            );
    }
}
