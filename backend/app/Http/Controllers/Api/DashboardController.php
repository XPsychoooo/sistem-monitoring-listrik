<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => 'success',
            'message' => 'Dashboard data (Mock)',
            'data' => [
                'total_kwh' => 1245,
                'estimasi_tagihan' => 1805250,
                'fasa_r' => ['v' => 220, 'a' => 4.2, 'kwh' => 120],
                'fasa_s' => ['v' => 218, 'a' => 3.8, 'kwh' => 115],
                'fasa_t' => ['v' => 221, 'a' => 4.0, 'kwh' => 118],
                'chart_today' => [
                    'labels' => ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
                    'data' => [12, 19, 30, 45, 38, 50, 42]
                ],
                'last_updated' => now()->format('H:i:s')
            ]
        ]);
    }

    public function hourly()
    {
        return response()->json(['status' => 'success', 'data' => []]);
    }

    public function daily()
    {
        return response()->json(['status' => 'success', 'data' => []]);
    }

    public function monthly()
    {
        return response()->json(['status' => 'success', 'data' => []]);
    }

    public function raw()
    {
        return response()->json(['status' => 'success', 'data' => []]);
    }
}
