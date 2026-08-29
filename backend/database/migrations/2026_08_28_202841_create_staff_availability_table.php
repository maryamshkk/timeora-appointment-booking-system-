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
        Schema::create('staff_availability', function (Blueprint $table) {
            $table->id();

            $table->foreignId('staff_id')
                ->constrained('staff')
                ->cascadeOnDelete();

            // Examples: mon, tue, wed, thu, fri, sat, sun
            $table->string('day_group', 20);

            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();

            $table->boolean('is_off')->default(false);

            // One availability record per staff member per day/group
            $table->unique(['staff_id', 'day_group']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staff_availability');
    }
};
