<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('admin_settings', function (Blueprint $table) {
            $table->id();

            $table->string('platform_name', 150)
                ->default('TIMEORA');

            $table->string('support_email', 150)
                ->nullable();

            $table->string('support_phone', 50)
                ->nullable();

            $table->string('timezone', 100)
                ->default('Asia/Karachi');

            $table->boolean('email_notifications')
                ->default(true);

            $table->boolean('system_notifications')
                ->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admin_settings');
    }
};