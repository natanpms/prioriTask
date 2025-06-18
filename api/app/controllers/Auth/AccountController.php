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
        $data = request()->validate([
            'email' => 'optional|email',
            'name' => 'optional|text',
        ]);

        $accountService = new AccountService($data);

        $accountService->updateUserInfo();
    }
}
