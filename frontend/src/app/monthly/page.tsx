"use client";

import ChartComponent from "@/components/ChartComponent";
import { CalendarDays, Zap, TrendingUp, BarChart3 } from "lucide-react";

const mockMonthlyData = [
    { bulan: "Apr 2024", kwh: 6420, biaya: 9277350 },
    { bulan: "Mei 2024", kwh: 6850, biaya: 9899125 },
    { bulan: "Jun 2024", kwh: 7100, biaya: 10261550 },
    { bulan: "Jul 2024", kwh: 7480, biaya: 10810820 },
    { bulan: "Agu 2024", kwh: 7250, biaya: 10479375 },
    { bulan: "Sep 2024", kwh: 6980, biaya: 10090790 },
    { bulan: "Okt 2024", kwh: 7320, biaya: 10577820 },
    { bulan: "Nov 2024", kwh: 7650, biaya: 11054625 },
    { bulan: "Des 2024", kwh: 8100, biaya: 11704650 },
    { bulan: "Jan 2025", kwh: 7900, biaya: 11415350 },
    { bulan: "Feb 2025", kwh: 7450, biaya: 10767625 },
    { bulan: "Mar 2025", kwh: 3520, biaya: 5087120, partial: true },
];

const fullMonths = mockMonthlyData.filter((d) => !d.partial);
const totalKwh = fullMonths.reduce((s, d) => s + d.kwh, 0);
const totalBiaya = fullMonths.reduce((s, d) => s + d.biaya, 0);
const avgKwh = totalKwh / fullMonths.length;
const maxMonth = fullMonths.reduce((a, b) => (a.kwh > b.kwh ? a : b));
const growthPct = ((fullMonths[fullMonths.length - 1].kwh - fullMonths[0].kwh) / fullMonths[0].kwh * 100).toFixed(1);

const chartData = {
    labels: mockMonthlyData.map((d) => d.bulan),
    datasets: [
        {
            fill: true,
            label: "Konsumsi Bulanan (kWh)",
            data: mockMonthlyData.map((d) => d.kwh),
            borderColor: "rgb(99, 102, 241)",
            backgroundColor: "rgba(99, 102, 241, 0.1)",
            tension: 0.4,
        },
    ],
};

export default function MonthlyData() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Data Bulanan</h1>
                <p className="text-slate-500 mt-1">Rekapitulasi konsumsi listrik per bulan — Apr 2024 s/d Mar 2025</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-blue-700"><Zap className="w-4 h-4 text-white" /></div>
                        <p className="text-slate-500 text-sm">Total Konsumsi (11 bln)</p>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">{totalKwh.toLocaleString("id-ID")} kWh</p>
                    <p className="text-xs text-slate-400 mt-1">Rp {totalBiaya.toLocaleString("id-ID")}</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-indigo-600"><CalendarDays className="w-4 h-4 text-white" /></div>
                        <p className="text-slate-500 text-sm">Rata-rata Bulanan</p>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">{avgKwh.toFixed(0)} kWh</p>
                    <p className="text-xs text-slate-400 mt-1">Per bulan</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-sky-500"><TrendingUp className="w-4 h-4 text-white" /></div>
                        <p className="text-slate-500 text-sm">Konsumsi Tertinggi</p>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">{maxMonth.kwh.toLocaleString("id-ID")} kWh</p>
                    <p className="text-xs text-slate-400 mt-1">{maxMonth.bulan}</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-blue-500"><BarChart3 className="w-4 h-4 text-white" /></div>
                        <p className="text-slate-500 text-sm">Pertumbuhan (11 bln)</p>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">+{growthPct}%</p>
                    <p className="text-xs text-slate-400 mt-1">Dibanding bulan pertama</p>
                </div>
            </div>

            {/* Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-700 mb-4">Grafik Tren Konsumsi Bulanan</h2>
                <ChartComponent data={chartData} />
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                    <h2 className="text-lg font-semibold text-slate-700">Rincian Data Bulanan</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                                <th className="px-6 py-3 text-left">Bulan</th>
                                <th className="px-6 py-3 text-right">Konsumsi (kWh)</th>
                                <th className="px-6 py-3 text-right">Estimasi Tagihan</th>
                                <th className="px-6 py-3 text-right">vs Rata-rata</th>
                                <th className="px-6 py-3 text-center">Keterangan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockMonthlyData.map((row, i) => {
                                const diff = row.kwh - avgKwh;
                                const diffPct = ((diff / avgKwh) * 100).toFixed(1);
                                return (
                                    <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                                        <td className="px-6 py-3 font-medium text-slate-700">{row.bulan}</td>
                                        <td className="px-6 py-3 text-right font-semibold text-slate-800">{row.kwh.toLocaleString("id-ID")}</td>
                                        <td className="px-6 py-3 text-right text-slate-600">Rp {row.biaya.toLocaleString("id-ID")}</td>
                                        <td className={`px-6 py-3 text-right font-medium ${diff >= 0 ? "text-blue-600" : "text-slate-500"}`}>
                                            {diff >= 0 ? "+" : ""}{diffPct}%
                                        </td>
                                        <td className="px-6 py-3 text-center">
                                            {row.partial ? (
                                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">Berjalan</span>
                                            ) : diff > avgKwh * 0.05 ? (
                                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Tinggi</span>
                                            ) : (
                                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">Normal</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr className="bg-blue-700 text-white font-bold text-sm">
                                <td className="px-6 py-3">Total (11 bulan penuh)</td>
                                <td className="px-6 py-3 text-right">{totalKwh.toLocaleString("id-ID")}</td>
                                <td className="px-6 py-3 text-right">Rp {totalBiaya.toLocaleString("id-ID")}</td>
                                <td colSpan={2}></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}
