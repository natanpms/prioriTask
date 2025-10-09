<?php

use App\Enums\TaskPriority;
use App\Enums\TaskStep;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
            Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('priority', array_map(fn($case) => $case->value, TaskPriority::cases()));
            $table->enum('step', array_map(fn($case) => $case->value, TaskStep::cases()));
            $table->dateTime('due_date')->nullable();
            $table->boolean('is_completed')->default(false);
            $table->timestamps();
        });
      
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
