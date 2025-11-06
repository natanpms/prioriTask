<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\UseCases\Category\DestroyCategoryUseCase;
use App\UseCases\Category\StoreCategoryUseCase;
use App\UseCases\Category\UpdateCategoryUseCase;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{

    public function store(Request $request, StoreCategoryUseCase $storeCategoryUseCase)
    {
        $validated = $request->validate([
            'nome-categoria' => [
                'required',
                'string',
                'min:2',
                'max:255',
                Rule::unique('categories', 'name')
                    ->where('user_id', auth()->id()),
            ],
            'color' => 'required|string|size:7',
        ]);

        try {
            $storeCategoryUseCase->execute($validated);
            return redirect()->route('categories')
                ->with('success', 'Categoria criada com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->route('categories')
                ->with('error', 'Erro ao criar categoria: ' . $th->getMessage());
        }
    }

    public function destroy(Category $category, DestroyCategoryUseCase $destroyCategoryUseCase)
    {
        try {
            $destroyCategoryUseCase->execute($category);
            return redirect()->route('categories')
                ->with('success', 'Categoria deletada com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->route('categories')
                ->with('error', 'Erro ao deletar categoria: ' . $th->getMessage());
        }
    }

    public function update(Request $request, Category $category, UpdateCategoryUseCase $updateCategoryUseCase)
    {
        $validated = $request->validate([
            'nome-categoria' => [
                'required',
                'string',
                'min:5',
                'max:255',
                Rule::unique('categories', 'name')
                    ->where('user_id', auth()->id())
                    ->ignore($category->id),
            ],
            'color' => 'required|string|size:7',
        ]);

        try {
            $updateCategoryUseCase->execute($category, $validated);
            return redirect()->route('categories')
                ->with('success', 'Categoria atualizada com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->route('categories')
                ->with('error', 'Erro ao atualizar categoria: ' . $th->getMessage());
        }
    }
}
