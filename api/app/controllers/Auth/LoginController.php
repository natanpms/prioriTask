<?php

namespace App\Controllers\Auth;

use App\Services\Auth\LoginService;

class LoginController extends Controller
{
    public function store()
    {
        $data = request()->validate([
            'email' => 'email',
            'password' => 'string',
        ]);

        $auth = new LoginService($data);

        $auth->login();
    }

    public function logoutUser()
    {
        $auth = new LoginService(request()->user());
        
        $auth->logout();
    }
}
