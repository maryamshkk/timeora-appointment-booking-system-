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
        Schema::create('otps', function (Blueprint $table) {
            $table->id();

            $table->enum('owner_type', [
                'company_admin',
                'customer'
            ]);

            $table->UnsignedBigInteger('owner_id');

            $table->char('code', 6);
            $table->enum('purpose', [
                    'email_verification',
                    'password_reset']);

            $table->unsignedTinyInteger('attempts')->default(0);
            $table->timestamp('expires_at');
            $table->timestamp('verified_at')->nullable();
            $table->timestamps();

            $table->index(['owner_type', 'owner_id']);
            $table->index(['owner_type', 'owner_id', 'purpose']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('otps');
    }
};
