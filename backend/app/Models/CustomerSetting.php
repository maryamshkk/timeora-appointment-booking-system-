<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerSetting extends Model
{
    protected $fillable = [
        'user_id',
        'email_notifications',
        'appointment_reminders',
        'booking_updates',
        'cancellation_updates',
    ];

    protected $casts = [
        'email_notifications' => 'boolean',
        'appointment_reminders' => 'boolean',
        'booking_updates' => 'boolean',
        'cancellation_updates' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
