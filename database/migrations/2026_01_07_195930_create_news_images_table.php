<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
     public function up(): void
     {
         Schema::create('news_images', function (Blueprint $table) {
             $table->id();
             // nullable agar saat upload via editor bisa disimpan tanpa news_id dulu
             $table->foreignId('news_id')->nullable()->constrained()->onDelete('cascade');
             $table->string('path');
             // Tambahkan status
             $table->enum('status', ['active', 'inactive'])->default('inactive');
             $table->timestamps();
         });
     }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news_images');
    }
};
