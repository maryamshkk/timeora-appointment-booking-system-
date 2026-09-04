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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();

            $table->foreignId('appointment_id')
                ->unique()
                ->constrained('appointments')
                ->cascadeOnDelete();

            $table->decimal('amount', 10, 2);

            $table->enum('method', ['cash'])
                    ->default('cash');

            $table->enum('status', 
                    ['paid', 'unpaid'])
                    ->default('unpaid');

            $table->enum('received_by_type', ['company_admin', 'staff'])
                    ->nullable();
                
            $table->unsignedBigInteger('reieved_by_id')
                    ->nullable();
                
            $table->timestamp('paid_at')
                    ->nullable();
                    
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
