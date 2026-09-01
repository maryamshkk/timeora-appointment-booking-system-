<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BlockedTime extends Model
{
    protected $fillable = [
        'staff_id',
        'blocked_date',
        'start_time',
        'end_time',
        'reason'
    ];

    protected $casts = [
        'blocked_date' => 'date'
    ];

    public function staff(): BelongsTo
    {
        return $this->belongsTo(Staff::class);
    }
}
