<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id();
            $table->enum('actor_type', [
                'super_admin',
                'company_admin',
                'staff',
                'customer',
                'system'
            ]);

            $table->unsignedBigInteger('actor_id')->nullable();
            $table->string('action', 150);

            $table->string('target_type', 60)->nullable();
            $table->unsignedBigInteger('target_id')->nullable();

            $table->json('old_value')->nullable();
            $table->json('new_value')->nullable();

            $table->index(['actor_type', 'actor_id']);
            $table->index(['target_type', 'target_id']);

            $table->timestamp('created_at')->useCurrent();


            $table->index('action');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
    }
};
