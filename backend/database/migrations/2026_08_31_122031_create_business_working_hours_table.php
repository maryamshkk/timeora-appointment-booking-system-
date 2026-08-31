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
        Schema::create('business_working_hours', function (Blueprint $table) {
            $table->id();

            $table->foreignId('company_id')
            ->constrained('companies')
            ->cascadeOnDelete();

            $table->unsignedTinyInteger('day_of_week');
            $table->boolean('is_open')->default(false);

            $table->time('opening_time')->nullable();
            $table->time('closing_time')->nullable();

            $table->timestamps();

            $table->unique(['company_id', 'day_of_week']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('business_working_hours');
    }
};
