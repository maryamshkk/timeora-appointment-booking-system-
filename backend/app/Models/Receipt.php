<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Receipt extends Model
{
    protected $fillable = [
        'appointment_id',
        'payment_id',
        'receipt_number',
    ];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }

    public function payment()
    {
        return $this->belongsTo(Payment::class);
    }
}