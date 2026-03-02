<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SensorController extends Controller
{
    public function store(Request $request)
    {
        // Placeholder for storing data to Firebase
        // Validasi payload sensor ESP32
        $validated = $request->validate([
            'volts' => 'required|array',
            'currents' => 'required|array',
            'kwh' => 'required|array',
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Data sensor (placeholder) berhasil diterima.',
            'data' => $validated
        ], 201);
    }
}
