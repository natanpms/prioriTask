<?php

namespace App\Controllers\Auth;

use App\Services\Auth\AccountService;

class AccountController extends Controller
{
    public function index()
    {
        response()->json([
            'message' => 'User account',
            'data' => auth()->user()->get(),
        ]);
    }

    public function update()
    {
        $data = $this->requestValidate([
            'email' => 'optional|email',
            'name' => 'optional|text',
        ]);

        $accountService = new AccountService($data);

        $accountService->updateUserInfo();
    }

    public function delete()
    {
        $user = auth()->user();

        if (!empty($user)) {
            $credentials = ["id" => $user->id, "email" => $user->email];
            $accountService = new AccountService($credentials);
            $accountService->deleteUser();
        } else {
            return response()->json([
                'message' => 'Erro ao buscar usuário para deletar conta.',
            ], 400);
        }
    }
}
