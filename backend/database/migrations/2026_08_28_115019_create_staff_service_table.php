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
        Schema::create('staff_service', function (Blueprint $table) {
            $table->id();

            $table->foreignId('staff_id')
            ->constrained('staff')
            ->cascadeOnDelete();


            $table->foreignId('service_id')
            ->constrained('services')
            ->cascadeOnDelete();


            // Prevent the same service from being assigned
            // to the same staff member more than once.
            $table->unique(['staff_id', 'service_id']);

            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staff_service');
    }
};
