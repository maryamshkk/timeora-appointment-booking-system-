<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Drop audit_logs
        Schema::dropIfExists('audit_logs');

        // Drop company_admins
        Schema::dropIfExists('company_admins');

        // Drop customers
        Schema::dropIfExists('customers');

        // Modify users table
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone', 30)->nullable()->after('email');
            $table->string('profile_image', 255)->nullable()->after('password');
            $table->enum('user_type', ['customer', 'company_admin'])->default('customer')->after('id');
            $table->foreignId('company_id')->nullable()->after('user_type')->constrained('companies')->cascadeOnDelete();
            $table->enum('status', ['active', 'pending', 'suspended'])->default('pending')->after('profile_image');
        });

        // Remove unwanted columns from companies
        Schema::table('companies', function (Blueprint $table) {
            $table->dropColumn([
                'slug',
                'logo_path',
                'description',
                'website',
                'city',
                'country',
                'longitude',
                'latitude',
                'currency',
                'suspended_reason',
            ]);
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->dropColumn(['phone', 'profile_image', 'user_type', 'company_id', 'status']);
        });

        Schema::table('companies', function (Blueprint $table) {
            $table->string('slug')->unique();
            $table->string('logo_path')->nullable();
            $table->string('description')->nullable();
            $table->string('website')->nullable();
            $table->string('city')->nullable();
            $table->string('country')->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->string('currency', 3)->nullable();
            $table->text('suspended_reason')->nullable();
        });
    }
};