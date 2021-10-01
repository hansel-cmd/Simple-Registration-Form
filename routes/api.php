<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;

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


// Authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/auth', [AuthController::class, 'verify']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/get-user-info', [AuthController::class, 'getUserInfo']);
Route::post('/get-token', [AuthController::class, 'getToken']);


// Post
Route::post('/create-post', [PostController::class, 'createPost']);
Route::post('/get-all-posts', [PostController::class, 'getAllPost']);





Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
