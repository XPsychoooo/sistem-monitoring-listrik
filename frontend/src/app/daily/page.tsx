"use client";

import ChartComponent from "@/components/ChartComponent";
import { Calendar, Zap, TrendingUp, TrendingDown } from "lucide-react";

const mockDailyData = [
    { tanggal: "01 Mar", hari: "Sabtu", kwh: 210.5, biaya: 304225 },
    { tanggal: "02 Mar", hari: "Minggu", kwh: 198.2, biaya: 286349 },
    { tanggal: "03 Mar", hari: "Senin", kwh: 245.8, biaya: 355281 },
    { tanggal: "04 Mar", hari: "Selasa", kwh: 238.1, biaya: 344124 },
    { tanggal: "05 Mar", hari: "Rabu", kwh: 252.4, biaya: 364818 },
    { tanggal: "06 Mar", hari: "Kamis", kwh: 260.3, biaya: 376234 },
    { tanggal: "07 Mar", hari: "Jumat", kwh: 249.7, biaya: 360932 },
    { tanggal: "08 Mar", hari: "Sabtu", kwh: 205.1, biaya: 296434 },
    { tanggal: "09 Mar", hari: "Minggu", kwh: 190.8, biaya: 275806 },
    { tanggal: "10 Mar", hari: "Senin", kwh: 268.9, biaya: 388630 },
    { tanggal: "11 Mar", hari: "Selasa", kwh: 275.2, biaya: 397739 },
    { tanggal: "12 Mar", hari: "Rabu", kwh: 283.4, biaya: 409612 },
    { tanggal: "13 Mar", hari: "Kamis", kwh: 271.6, biaya: 392561 },
    { tanggal: "14 Mar", hari: "Jumat", kwh: 265.0, biaya: 383025 },
];

const totalKwh = mockDailyData.reduce((s, d) => s + d.kwh, 0);
const totalBiaya = mockDailyData.reduce((s, d) => s + d.biaya, 0);
const avgKwh = totalKwh / mockDailyData.length;
const maxKwh = Math.max(...mockDailyData.map((d) => d.kwh));
const minKwh = Math.min(...mockDailyData.map((d) => d.kwh));

const chartData = {
    labels: mockDailyData.map((d) => d.tanggal),
    datasets: [
        {
            fill: true,
            label: "Konsumsi Harian (kWh)",
            data: mockDailyData.map((d) => d.kwh),
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.4,
        },
    ],
};

export default function DailyData() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Data Harian</h1>
                <p className="text-slate-500 mt-1">Akumulasi konsumsi listrik setiap hari — Maret 2025</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-blue-700"><Zap className="w-4 h-4 text-white" /></div>
                        <p className="text-slate-500 text-sm">Total Bulan Ini</p>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">{totalKwh.toFixed(1)} kWh</p>
                    <p className="text-xs text-slate-400 mt-1">Rp {totalBiaya.toLocaleString("id-ID")}</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-indigo-600"><Calendar className="w-4 h-4 text-white" /></div>
                        <p className="text-slate-500 text-sm">Rata-rata Harian</p>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">{avgKwh.toFixed(1)} kWh</p>
                    <p className="text-xs text-slate-400 mt-1">Per hari</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-sky-500"><TrendingUp className="w-4 h-4 text-white" /></div>
                        <p className="text-slate-500 text-sm">Konsumsi Tertinggi</p>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">{maxKwh.toFixed(1)} kWh</p>
                    <p className="text-xs text-slate-400 mt-1">{mockDailyData.find((d) => d.kwh === maxKwh)?.tanggal}</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-blue-500"><TrendingDown className="w-4 h-4 text-white" /></div>
                        <p className="text-slate-500 text-sm">Konsumsi Terendah</p>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">{minKwh.toFixed(1)} kWh</p>
                    <p className="text-xs text-slate-400 mt-1">{mockDailyData.find((d) => d.kwh === minKwh)?.tanggal}</p>
                </div>
            </div>

            {/* Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-700 mb-4">Grafik Konsumsi Harian</h2>
                <ChartComponent data={chartData} />
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                    <h2 className="text-lg font-semibold text-slate-700">Rincian Data Harian</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                                <th className="px-6 py-3 text-left">Tanggal</th>
                                <th className="px-6 py-3 text-left">Hari</th>
                                <th className="px-6 py-3 text-right">Konsumsi (kWh)</th>
                                <th className="px-6 py-3 text-right">Estimasi Biaya</th>
                                <th className="px-6 py-3 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockDailyData.map((row, i) => {
                                const isAboveAvg = row.kwh > avgKwh;
                                return (
                                    <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                                        <td className="px-6 py-3 font-medium text-slate-700">{row.tanggal}</td>
                                        <td className="px-6 py-3 text-slate-500">{row.hari}</td>
                                        <td className="px-6 py-3 text-right font-semibold text-slate-800">{row.kwh.toFixed(1)}</td>
                                        <td className="px-6 py-3 text-right text-slate-600">Rp {row.biaya.toLocaleString("id-ID")}</td>
                                        <td className="px-6 py-3 text-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${isAboveAvg ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}>
                                                {isAboveAvg ? "Di atas rata-rata" : "Normal"}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr className="bg-blue-700 text-white font-bold text-sm">
                                <td className="px-6 py-3" colSpan={2}>Total</td>
                                <td className="px-6 py-3 text-right">{totalKwh.toFixed(1)}</td>
                                <td className="px-6 py-3 text-right">Rp {totalBiaya.toLocaleString("id-ID")}</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}
