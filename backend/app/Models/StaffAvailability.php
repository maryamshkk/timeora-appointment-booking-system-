<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class StaffAvailability extends Model
{
    use HasFactory;

    protected $table = 'staff_availability';

    protected $fillable = [ 
        'staff_id', 
        'day_of_week', 
        'is_working', 
        'start_time', 
        'end_time', 
        'break_start', 
        'break_end', 
        ];

    protected $casts = [
        'day_of_week' => 'integer', 
        'is_working' => 'boolean',
    ];

    /**
     * Availability belongs to a staff member.
     */
    public function staff(): BelongsTo
    {
        return $this->belongsTo(Staff::class);
    }
}
