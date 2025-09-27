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

        Category::create($dataForDatabase);

        return redirect()->route('categories')
            ->with('success', 'Categoria criada com sucesso!');

    }

    public function destroy(Category $category)
    {
        if ($category->user_id !== auth()->id()) {
            return redirect()->route('categories')
                ->with('error', 'Categoria não encontrada.');
        }

        try {
            $category->tasks()->delete();

            $isDeleted = $category->delete();
           
            if ($isDeleted) {
                return redirect()->route('categories')
                    ->with('success', 'Categoria deletada com sucesso!');
            }

        } catch (\Throwable $th) {
            return redirect()->route('categories')
                ->with('error', 'Erro ao deletar categoria: ' . $th->getMessage());
        }
    }

    public function update(Request $request, Category $category)
    {
        if ($category->user_id !== auth()->id()) {
            return redirect()->route('categories')
                ->with('error', 'Categoria não encontrada.');
        }

        $validated = $request->validate([
            'nome-categoria' => [
                'required',
                'string',
                'min:5',
                'max:255',
                // valida se essa categoria ja existe para o usuario logado
                Rule::unique('categories', 'name')
                    ->where('user_id', auth()->id())
                    ->ignore($category->id),
            ],
            'color' => 'required|string|size:7',
        ]);

        $dataForDatabase = [
            'name' => $validated['nome-categoria'],
            'color' => $validated['color'],
        ];

        $isUpdated = $category->update($dataForDatabase);

        if ($isUpdated) {
            return redirect()->route('categories')
                ->with('success', 'Categoria atualizada com sucesso!');
        }

        return redirect()->route('categories')
            ->with('error', 'Erro ao atualizar categoria.');
    }
}
