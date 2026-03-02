<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => 'success',
            'data' => [
                'tarif_per_kwh' => 1444.70,
                'batas_kwh_harian' => 50
            ]
        ]);
    }

    public function update(Request $request)
    {
        return response()->json([
            'status' => 'success',
            'message' => 'Pengaturan tarif berhasil diperbarui (placeholder)'
        ]);
    }
}
