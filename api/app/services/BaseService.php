<?php

namespace App\Services;

/**
 * Service Base para os serviços da aplicação
 */
class BaseService
{
    /**
     * Função para retornar responses de sucesso
     * @param mixed $data
     * @param string $message
     * @param int $code
     */
    protected function success($data = [], $message = 'Sucesso ao realizar ação', $code = 200)
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data
        ], $code);
    }


    /**
     * Função para retornar responses de erro
     * 
     * @param array $data
     * @param string $message
     * @param int $code
     */
    protected function error($data = [], $message = 'Erro ao realizar ação', $code = 400)
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'data' => $data
        ], $code);
    }
}
