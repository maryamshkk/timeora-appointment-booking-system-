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
    {
        Schema::create('company_settings', function (Blueprint $table) {
            $table->id();

            $table->foreignId('company_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('timezone')->default('Asia/Karachi');

            $table->boolean('booking_enabled')->default(true);

            $table->boolean('auto_accept_appointments')->default(false);

            $table->boolean('email_notifications')->default(true);

            $table->boolean('appointment_reminders')->default(true);

            $table->boolean('booking_updates')->default(true);

            $table->boolean('cancellation_updates')->default(true);

            $table->timestamps();

            $table->unique('company_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_settings');
    }
};
