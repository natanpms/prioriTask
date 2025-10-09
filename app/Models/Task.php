<?php

namespace App\Models;

use App\Enums\TaskPriority;
use App\Enums\TaskStep;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TasksFactory> */
    use HasFactory;

    /**
     * Campos que serão modificados
     */
    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'description',
        'priority',
        'step',
        'due_date',
        'is_completed',
    ];

    protected $casts = [
        'priority' => TaskPriority::class,
        'step' => TaskStep::class,
        'due_date' => 'datetime',
        'is_completed' => 'boolean'
    ];

    /**
     * 
     * Relacionamentos para consultas
     * 
     */

     // Task pertence a um usuário

    public function user(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

     // Task pertence a uma categoria
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
