<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{

    public function store(Request $request)
    {

        $validated = $request->validate([
            'nome-categoria' => [
                'required',
                'string',
                'min:5',
                'max:255',
                // valida se essa categoria ja existe para o usuario logado
                Rule::unique('categories', 'name')
                    ->where('user_id', auth()->id()),
            ],
            'color' => 'required|string|size:7',
        ]);

        $dataForDatabase = [
            'name' => $validated['nome-categoria'],
            'color' => $validated['color'],
            'user_id' => auth()->id(),
        ];

        $categoryCreated = Category::create($dataForDatabase);

        return redirect()->route('categories')
            ->with('success', 'Categoria criada com sucesso!');

    }
}
