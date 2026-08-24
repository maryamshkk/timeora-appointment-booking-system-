<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;


class Otp extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'owner_type',
        'owner_id',
        'code',
        'purpose',
        'attempts',
        'expires_at',
        'verified_at',
    ];

    protected $hidden = [
        'code'
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'verified_at' => 'datetime'
    ];

    public function owner(): MorphTo
    {
        return $this->morphTo();
    }

}
