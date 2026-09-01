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
        Schema::create('availability_exceptions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('staff_id')
                ->constrained('staff')
                ->cascadeOnDelete();

            $table->date('exception_date');

            $table->boolean('is_working')->default(false);

            $table->time('start_time')->nullable();

            $table->time('end_time')->nullable();

            $table->time('break_start')->nullable();

            $table->time('break_end')->nullable();

            $table->string('reason', 255)->nullable();

            $table->timestamps();

            $table->unique([
                'staff_id',
                'exception_date',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('availability_exceptions');
    }
};
