<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    //Category model
    protected $fillable = [
        'parent_id',
        'name',
        'slug',
        'status',
    ];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }
    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function companies(): HasMany
    {
        return $this->hasMany(Company::class);
    }

}
