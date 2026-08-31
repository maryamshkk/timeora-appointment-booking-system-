```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('staff_availability', function (Blueprint $table) {

            // First create a normal index for the foreign key
            $table->index('staff_id', 'staff_availability_staff_id_index');

            // Now old unique constraint can be removed
            $table->dropUnique(
                'staff_availability_staff_id_day_group_unique'
            );

            // Add correct unique constraint
            $table->unique(
                ['staff_id', 'day_of_week'],
                'staff_availability_staff_id_day_of_week_unique'
            );
        });
    }

    public function down(): void
    {
        Schema::table('staff_availability', function (Blueprint $table) {

            $table->dropUnique(
                'staff_availability_staff_id_day_of_week_unique'
            );

            $table->unique(
                ['staff_id', 'day_group'],
                'staff_availability_staff_id_day_group_unique'
            );

            $table->dropIndex(
                'staff_availability_staff_id_index'
            );
        });
    }
};
