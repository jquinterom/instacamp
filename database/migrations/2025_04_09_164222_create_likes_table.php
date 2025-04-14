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
    Schema::create('likes', function (Blueprint $table) {
      $table->id();

      // Clave foránea para users (con eliminación en cascada)
      $table->foreignId('user_id')
        ->constrained('users')
        ->onDelete('cascade');


      // Clave foránea para posts (con eliminación en cascada)
      $table->foreignId('post_id')
        ->constrained('posts')
        ->onDelete('cascade');

      $table->timestamps();

      $table->index('user_id');
      $table->index('post_id');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('likes');
  }
};
