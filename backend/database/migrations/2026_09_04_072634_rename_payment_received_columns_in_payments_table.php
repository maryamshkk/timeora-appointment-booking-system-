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
        Schema::table('payments', function (Blueprint $table) {
            $table->renameColumn(
                'recieved_by_type',
                'received_by_type'
            );

            $table->renameColumn(
                'reieved_by_id',
                'received_by_id'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->renameColumn(
                'received_by_type',
                'recieved_by_type'
            );

            $table->renameColumn(
                'received_by_id',
                'reieved_by_id'
            );
        });
    }
};