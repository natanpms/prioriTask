<?php

namespace App\Services\Auth;

use App\Services\BaseService;

class LoginService extends BaseService
{   
    protected $data;

    public function __construct($data){
        $this->data = $data;
    }

    /**
     * FUnção que realiza login de usuários
     * @return void
     */
    public function login()
    {
        if (!$this->data) {
            $this->error(request()->errors(), 'Erro ao validar campos de login.', 400);
        }

        $success = auth()->login($this->data);

        if (!$success) {
            $this->error(auth()->errors(), 'Falha ao realizar login.', 400);
        }

        $this->success(auth()->data(), 'Login efetuado com sucesso.', 200);
    }

    /**
     * FUnção que realiza logout de usuários
     * @return void
     */
    public function logout()
    {
        auth()->logout();
    }
}
