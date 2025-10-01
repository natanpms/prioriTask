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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();

            //relacionando com tabela de usuarios e caso do usuario ser deletado, os registros relacionados serao deletados
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->string('name');
            $table->string('color')->nullable(); // cor escolhida para compor o frontend 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
