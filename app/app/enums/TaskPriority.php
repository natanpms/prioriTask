<?php

namespace App\Enums;

enum TaskPriority: string
{
    case Baixa = 'baixa';
    case Media = 'media';
    case Alta = 'alta';
}
