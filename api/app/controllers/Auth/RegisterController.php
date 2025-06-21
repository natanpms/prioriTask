<?php

namespace App\Controllers\Auth;

use App\Services\Auth\RegisterService;

class RegisterController extends Controller
{
    public function store()
    {
        $credentials = $this->requestValidate([
            'name' => 'string',
            'email' => 'email',
            'password' => 'min:8',
        ]);

        $auth = new RegisterService($credentials);

        $auth->register();
    }
}
