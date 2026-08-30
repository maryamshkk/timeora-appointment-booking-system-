<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->text('description')
                ->nullable()
                ->after('name');

            $table->integer('duration')
                ->default(60)
                ->after('description');

            $table->decimal('price', 10, 2)
                ->default(0)
                ->after('duration');

            $table->enum('status', ['active', 'disabled'])
                ->default('active')
                ->after('price');
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->dropColumn([
                'description',
                'duration',
                'price',
                'status',
            ]);
        });
    }
};