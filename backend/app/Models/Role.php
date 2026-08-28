<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Role extends Model
{
     use HasFactory;

    protected $fillable = [
        'name',
        'company_id',
    ];

    /**
     * Role belongs to a company.
     */

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    // Role has many staff
    public function staff(): HasMany
    {
        return $this->hasMany(Staff::class);
    }
}
