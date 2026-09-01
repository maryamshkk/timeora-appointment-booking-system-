<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AvailabilityException extends Model
{
     protected $fillable = [
        'staff_id',
        'exception_date',
        'is_working',
        'start_time',
        'end_time',
        'break_start',
        'break_end',
        'reason',
    ];

    protected $casts = [
        'exception_date' => 'date',
        'is_working' => 'boolean',
    ];

    public function staff(): BelongsTo
    {
        return $this->belongsTo(Staff::class);
    }
    
}
