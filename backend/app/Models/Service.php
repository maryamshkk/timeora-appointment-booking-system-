<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Service extends Model
{
     use HasFactory;

    protected $fillable = [
        'name',
        'company_id',
        'category_id',
        'description',
        'duration',
        'price',
        'status',
    ];

    /**
     * Service belongs to a company.
     */
    public function company(): BelongsTo
    {
        return $this->belongTo(Company::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
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
