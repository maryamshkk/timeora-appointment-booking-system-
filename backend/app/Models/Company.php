<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'logo_path',
        'description',
        'email',
        'phone',
        'website',
        'address',
        'city',
        'country',
        'latitude',
        'longitude',
        'timezone',
        'currency',
        'status',
        'suspended_reason',
        'email_verified_at',
    ];

    protected $casts = [ 
        'email_verified_at' => 'array',
        'longitude' =>'decimal:7',
        'latitude' => 'decimal:7',
    ];

    public function category(): BelongTO 
    {
        return $this->belongsTo(Category::class)
    }

    
}
