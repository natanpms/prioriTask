<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoriesFactory> */
    use HasFactory;

    /**
     * Campos que serão modificados
     */
    protected $fillable = [
        'user_id',
        'name',
        'color',
    ];

    protected $casts = [
        'name' => 'string',
        'color' => 'string'
    ];

    /**
     * 
     * Relacionamentos para consultas
     * 
     */

    // Categoria pertence a um usuário

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    // Um usuário pode ter várias tasks
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
