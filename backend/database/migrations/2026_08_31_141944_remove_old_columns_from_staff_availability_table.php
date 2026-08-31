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
            $table->dropColumn([
                'day_group',
                'is_off',
            ]);
        });
    }

    public function down(): void
    {
        Schema::table('staff_availability', function (Blueprint $table) {
            $table->string('day_group')->nullable();
            $table->boolean('is_off')->default(false);
        });
    }
};
