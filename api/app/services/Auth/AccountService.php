<?php

namespace App\Services\Auth;

use App\Services\BaseService;

class AccountService extends BaseService
{
    protected $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * FUnção que atualiza dados da conta do usuário
     * @return void
     */
    public function updateUserInfo()
    {
        if (!$this->data) {
            $this->error(request()->errors(), "Erro ao validar campos.", 400);
        }

        $success = auth()->update($this->data);

        if (!$success) {
            $this->error(auth()->errors(), "Erro ao atualizar informações.", 400);
        }

        $this->success(auth()->user()->get(), "Dados da conta atualizados com sucesso.", 200);
    }
}
