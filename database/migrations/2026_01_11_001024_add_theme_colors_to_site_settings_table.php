<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            // Kita gunakan nilai default HEX yang mirip dengan OKLCH di CSS kamu
            $table->string('color_primary')->default('#000000')->after('favicon');
            $table->string('color_primary_foreground')->default('#ffffff')->after('color_primary');
            $table->string('color_background')->default('#ffffff')->after('color_primary_foreground');
            $table->string('color_foreground')->default('#171717')->after('color_background');
            $table->string('color_card')->default('#ffffff')->after('color_foreground');
            $table->string('color_border')->default('#e5e5e5')->after('color_card');
            $table->string('color_radius')->default('0.625rem')->after('color_border');
        });
    }

    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $table->dropColumn([
                'color_primary',
                'color_primary_foreground',
                'color_background',
                'color_foreground',
                'color_card',
                'color_border',
                'color_radius'
            ]);
        });
    }
};