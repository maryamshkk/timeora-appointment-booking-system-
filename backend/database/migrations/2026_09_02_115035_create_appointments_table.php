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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();

             // Company
            $table->foreignId('company_id')
                ->constrained('companies')
                ->cascadeOnDelete();

            // Customer
            $table->foreignId('customer_id')
                ->constrained('users')
                ->cascadeOnDelete();

            // Staff
            $table->foreignId('staff_id')
                ->constrained('staff')
                ->cascadeOnDelete();

            // Service
            $table->foreignId('service_id')
                ->constrained('services')
                ->cascadeOnDelete();

            // Appointment date & time
            $table->date('appointment_date');
            $table->time('start_time');
            $table->time('end_time');

            // Appointment Status
            $table->enum('status', [
                'pending',
                'accepted',
                'rejected',
                'cancelled',
                'completed'
            ])->default('pending');

            $table->timestamps();

            // Useful index for appointment availability/conflict checks

            $table->index([
                'staff_id',
                'appointment_date',
                'start_time',
                'end_time'
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
