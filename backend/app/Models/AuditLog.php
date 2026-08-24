<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    //
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'actor_type',
        'actor_id',
        'action',
        'target_type',
        'target_id',
        'old_value',
        'new_value',
        'created_at',
    ];

    protected $casts = [
        'old_value' => 'array',
        'new_value' => 'array',
        'created_at' => 'datetime'
    ];

    public function actor(): MorphTo
    {
        return $this->morphTo();
    }
    public function target(): MorphTo
    {
        return $this->morphTo();
    }
}
