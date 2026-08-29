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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')
                    ->constrained('categories')
                    ->restrictOnDelete();

            $table->string('name', 150);

            $table->string('logo_path')->nullable();
            $table->string('description')->nullable();

            $table->string('email',150)->unique();
            $table->string('phone', 30);

            $table->string('website')->nullable();
            $table->text('address')->nullable();
            $table->string('city')->nullable();
            $table->string('country')->nullable();

            $table->string('timezone')->nullable();
            $table->string('currency', 3)->nullable();

            $table->enum('status',[
                'active',
                'pending',
                'suspended'
            ])->default('pending');

            $table->text('suspended_reason')->nullable();

            $table->timestamp('email_verified_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
