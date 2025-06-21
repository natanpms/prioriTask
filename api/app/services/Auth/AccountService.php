<?php

namespace App\Services\Auth;

use App\Models\User;
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

    /**
     * Função que remove usuário da aplicação
     * @return void
     */
    public function deleteUser()
    {
        $user = User::where('id', $this->data['id']);

        if($user){
            $hasDeleted = $user->delete();

            if(!$hasDeleted){
                $this->error([],'Erro ao deletar conta.',400);
            }

                $this->success([],'Sucesso ao deletar conta.',200);

        }
    }
}
