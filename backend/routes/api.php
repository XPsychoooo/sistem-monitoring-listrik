<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SensorController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\SettingsController;

Route::prefix('sensor')->group(function () {
    Route::post('/store', [SensorController::class, 'store']);
});

Route::prefix('data')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::get('/hourly', [DashboardController::class, 'hourly']);
    Route::get('/daily', [DashboardController::class, 'daily']);
    Route::get('/monthly', [DashboardController::class, 'monthly']);
    Route::get('/raw', [DashboardController::class, 'raw']);
});

Route::prefix('settings')->group(function () {
    Route::get('/', [SettingsController::class, 'index']);
    Route::post('/tariffs', [SettingsController::class, 'update']);
});
