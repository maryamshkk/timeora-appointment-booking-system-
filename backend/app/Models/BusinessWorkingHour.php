<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class BusinessWorkingHour extends Model
{
    protected $fillable = [
        'company_id',
        'day_of_week',
        'is_open',
        'opening_time',
        'closing_time',
    ];

    protected $casts = [
        'is_open' => 'boolean',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}
