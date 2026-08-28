<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'company_id',
        'staff_id',
        'first_name',
        'last_name',
        'photo_path',
        'role_id',
        'phone',
        'account_email',
        'password_hash',
        'title',
        'bio',
        'experience_years',
        'rating_avg',
        'invitation_status',
        'invitation_token',
        'invitation_sent_at',
        'invitation_accepted_at',
        'email_verified_at',
        'status',
        'is_active',
    ];
}
