<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\FacebookAuthController;

Route::get('/', function () {
    return view('welcome');
});

// Google OAuth routes (must have web middleware for session)
Route::middleware(['web'])->group(function () {
    Route::get('/google/redirect', [GoogleAuthController::class, 'redirectToGoogle']);
    Route::get('/google/callback', [GoogleAuthController::class, 'handleGoogleCallback']);
    
    Route::get('/facebook/redirect', [FacebookAuthController::class, 'redirectToFacebook']);
    Route::get('/facebook/callback', [FacebookAuthController::class, 'handleFacebookCallback']);
});

