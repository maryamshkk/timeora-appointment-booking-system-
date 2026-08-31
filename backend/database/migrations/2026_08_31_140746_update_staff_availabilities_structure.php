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
        Schema::table('staff_availability', function (Blueprint $table) {

            $table->unsignedTinyInteger('day_of_week')
                ->nullable()
                ->after('staff_id');

            $table->boolean('is_working')
                ->default(true)
                ->after('day_of_week');

            $table->time('break_start')
                ->nullable()
                ->after('end_time');

            $table->time('break_end')
                ->nullable()
                ->after('break_start');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('staff_availability', function (Blueprint $table) {
            $table->dropColumn([
            'day_of_week',
            'is_working',
            'break_start',
            'break_end',
            ]);
        });
    }
};
