<?php

namespace App\Enums;

enum TaskStep: string
{
    case Pendente = 'pendente';
    case Andamento = 'andamento';
    case Concluido = 'concluido';
}
