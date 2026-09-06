<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class CompanySetting extends Model
{
     protected $fillable = [
        'company_id',
        'timezone',
        'booking_enabled',
        'auto_accept_appointments',
        'email_notifications',
        'appointment_reminders',
        'booking_updates',
        'cancellation_updates',
    ];

     protected $casts = [
        'booking_enabled' => 'boolean',
        'auto_accept_appointments' => 'boolean',
        'email_notifications' => 'boolean',
        'appointment_reminders' => 'boolean',
        'booking_updates' => 'boolean',
        'cancellation_updates' => 'boolean',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}
