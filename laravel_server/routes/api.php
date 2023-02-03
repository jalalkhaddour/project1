<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('test', 'Api\RegistratioController@test');


Route::post('login', 'Api\AuthController@login');

Route::post('register', 'Api\AuthController@register');

Route::get('articles', 'Api\articleController@getArticles');
Route::get('ads', 'Api\AdvertisementsController@getAds');

Route::group(['middleware' => 'auth:api'], function () {
    Route::post('registrationForm', 'Api\RegistratioController@store');
    Route::get('getRegistrationForm', 'Api\RegistratioController@show');
    Route::post('objection', 'Api\ObjectionController@store');
    Route::get('objections', 'Api\ObjectionController@getObjection');
    Route::get('student_years_info', 'Api\RegistratioController@studentYearsInfo');
});
