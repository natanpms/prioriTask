<?php

namespace App\Controllers\Auth;

/**
 * This is a base controller for the auth namespace
 */
class Controller extends \App\Controllers\Controller
{
    public function requestValidate($rules = [])
    {
        return request()->validate($rules);
    }
}
