<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    // {
    //     Schema::create('staff', function (Blueprint $table) {
    //         $table->id();

    //         $table->string('staff_id', 20)->unique();

    //         $table->foreignId('company_id')
    //                 ->constrained('companies')
    //                 ->cascadeOnDelete();

    //         $table->string('first_name', 100);
    //         $table->string('last_name', 100);

    //         $table->string('phone', 30)->nullable()->unique();
    //         $table->string('account_email', 150)->unique();

    //         $table->string('password_hash', 255)->nullable()->unique();

    //         $table->string('photo_path', 255)->nullable();

    //         $table->foreignId('role_id')
    //             ->constrained('roles')
    //             ->restrictOnDelete();

    //         $table->enum('invitation_status', [
    //             'not_sent',
    //             'pending',
    //             'accepted'
    //         ])->default('not_sent');

    //         $table->string('invitation_token', 255)->nullable();

    //         $table->timestamp('invitation_sent_at')->nullable();

    //         $table->timestamp('email_verified_at')->nullable();
            
    //         $table->enum('status', [
    //             'active',
    //             'pending',
    //             'deactivated'
    //         ])->default('pending');

    //         $table->boolean('is_active')->default(true);

    //         $table->timestamps();
    //     });
    // }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staff');
    }
};
