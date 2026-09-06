<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'platform_name',
        'support_email',
        'support_phone',
        'timezone',
        'email_notifications',
        'system_notifications',
    ];

    protected $casts = [
        'email_notifications' => 'boolean',
        'system_notifications' => 'boolean',
    ];
}