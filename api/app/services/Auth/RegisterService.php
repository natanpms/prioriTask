<?php

namespace App\Services\Auth;

use App\Services\BaseService;

class RegisterService extends BaseService
{
    protected $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * FUnção que realiza cadastro de usuários
     * @return void
     */
    public function register()
    {
        if (!$this->data) {
            $this->error(request()->errors(), 'Erro ao validar campos de cadastro.', 400);
        }

        $success = auth()->register($this->data);

        if (!$success) {
            $this->error(auth()->errors(), 'Falha ao realizar cadastro.', 400);
        }

        $this->success(auth()->data(), 'Cadastro efetuado com sucesso.', 200);
    }
}
