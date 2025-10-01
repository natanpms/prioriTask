<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\User;
use App\Models\Category;
use App\Enums\TaskPriority;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'title' => $this->faker->sentence(6, true),
            'description' => $this->faker->paragraph(3, true),
            'priority' => $this->faker->randomElement([
                TaskPriority::Baixa,
                TaskPriority::Media,
                TaskPriority::Alta,
            ]),
            'due_date' => $this->faker->dateTimeBetween('now', '+1 month'),
            'is_completed' => $this->faker->boolean(30),
        ];
    }
}
