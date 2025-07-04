<?php

auth()->middleware('auth.required', function () {
    response()->exit([
        'message' => 'Unauthorized',
        'data' => auth()->errors(),
    ], 401);
});

app()->group('/auth', function () {
    app()->post('/login', 'Auth\LoginController@store');
    app()->post('/register', 'Auth\RegisterController@store');
    // Reset and recover account will be added later
});

app()->post('/auth/logout', [
    'middleware' => 'auth.required',
    'Auth\LoginController@logoutUser'
]);

app()->group('/user', [
    'middleware' => 'auth.required',
    function () {
        app()->get('', 'Auth\AccountController@index');
        app()->patch('', 'Auth\AccountController@update');
        app()->delete('', 'Auth\AccountController@delete');
    },
]);
