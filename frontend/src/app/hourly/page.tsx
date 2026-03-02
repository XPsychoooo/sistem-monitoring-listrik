"use client";

import ChartComponent from "@/components/ChartComponent";
import { Clock, Zap, TrendingUp, Activity } from "lucide-react";

const mockHourlyData = [
    { jam: "00:00", fasa_r: 1.1, fasa_s: 1.0, fasa_t: 1.2, total: 3.3 },
    { jam: "01:00", fasa_r: 0.9, fasa_s: 0.8, fasa_t: 1.0, total: 2.7 },
    { jam: "02:00", fasa_r: 0.8, fasa_s: 0.7, fasa_t: 0.9, total: 2.4 },
    { jam: "03:00", fasa_r: 0.7, fasa_s: 0.6, fasa_t: 0.8, total: 2.1 },
    { jam: "04:00", fasa_r: 0.8, fasa_s: 0.7, fasa_t: 0.9, total: 2.4 },
    { jam: "05:00", fasa_r: 1.2, fasa_s: 1.1, fasa_t: 1.3, total: 3.6 },
    { jam: "06:00", fasa_r: 1.8, fasa_s: 1.6, fasa_t: 1.9, total: 5.3 },
    { jam: "07:00", fasa_r: 2.5, fasa_s: 2.3, fasa_t: 2.6, total: 7.4 },
    { jam: "08:00", fasa_r: 3.2, fasa_s: 3.0, fasa_t: 3.3, total: 9.5 },
    { jam: "09:00", fasa_r: 3.8, fasa_s: 3.6, fasa_t: 3.9, total: 11.3 },
    { jam: "10:00", fasa_r: 4.1, fasa_s: 3.9, fasa_t: 4.2, total: 12.2 },
    { jam: "11:00", fasa_r: 4.5, fasa_s: 4.3, fasa_t: 4.6, total: 13.4 },
    { jam: "12:00", fasa_r: 4.8, fasa_s: 4.6, fasa_t: 4.9, total: 14.3 },
    { jam: "13:00", fasa_r: 4.6, fasa_s: 4.4, fasa_t: 4.7, total: 13.7 },
    { jam: "14:00", fasa_r: 4.3, fasa_s: 4.1, fasa_t: 4.4, total: 12.8 },
    { jam: "15:00", fasa_r: 3.9, fasa_s: 3.7, fasa_t: 4.0, total: 11.6 },
    { jam: "16:00", fasa_r: 4.2, fasa_s: 4.0, fasa_t: 4.3, total: 12.5 },
    { jam: "17:00", fasa_r: 5.1, fasa_s: 4.9, fasa_t: 5.2, total: 15.2 },
    { jam: "18:00", fasa_r: 5.5, fasa_s: 5.3, fasa_t: 5.6, total: 16.4 },
    { jam: "19:00", fasa_r: 5.2, fasa_s: 5.0, fasa_t: 5.3, total: 15.5 },
    { jam: "20:00", fasa_r: 4.8, fasa_s: 4.6, fasa_t: 4.9, total: 14.3 },
    { jam: "21:00", fasa_r: 4.0, fasa_s: 3.8, fasa_t: 4.1, total: 11.9 },
    { jam: "22:00", fasa_r: 3.0, fasa_s: 2.8, fasa_t: 3.1, total: 8.9 },
    { jam: "23:00", fasa_r: 1.8, fasa_s: 1.6, fasa_t: 1.9, total: 5.3 },
];

const totalHari = mockHourlyData.reduce((sum, d) => sum + d.total, 0);
const puncakLoad = Math.max(...mockHourlyData.map((d) => d.total));
const puncakJam = mockHourlyData.find((d) => d.total === puncakLoad)?.jam;

const chartData = {
    labels: mockHourlyData.map((d) => d.jam),
    datasets: [
        {
            label: "Fasa R (kWh)",
            data: mockHourlyData.map((d) => d.fasa_r),
            borderColor: "rgb(99, 102, 241)",
            backgroundColor: "rgba(99, 102, 241, 0.05)",
            tension: 0.4,
            fill: false,
            pointRadius: 2,
        },
        {
            label: "Fasa S (kWh)",
            data: mockHourlyData.map((d) => d.fasa_s),
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.05)",
            tension: 0.4,
            fill: false,
            pointRadius: 2,
        },
        {
            label: "Fasa T (kWh)",
            data: mockHourlyData.map((d) => d.fasa_t),
            borderColor: "rgb(14, 165, 233)",
            backgroundColor: "rgba(14, 165, 233, 0.05)",
            tension: 0.4,
            fill: false,
            pointRadius: 2,
        },
    ],
};

export default function HourlyData() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Data Per Jam</h1>
                <p className="text-slate-500 mt-1">Akumulasi konsumsi listrik setiap jam — {new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-blue-700 shadow-blue-700/30 shadow-md">
                        <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm">Total Konsumsi Hari Ini</p>
                        <p className="text-2xl font-bold text-slate-800">{totalHari.toFixed(1)} kWh</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-indigo-600 shadow-indigo-600/30 shadow-md">
                        <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm">Beban Puncak</p>
                        <p className="text-2xl font-bold text-slate-800">{puncakLoad.toFixed(1)} kWh</p>
                        <p className="text-xs text-slate-400">Pukul {puncakJam}</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-sky-500 shadow-sky-500/30 shadow-md">
                        <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm">Rata-rata per Jam</p>
                        <p className="text-2xl font-bold text-slate-800">{(totalHari / 24).toFixed(2)} kWh</p>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-slate-700">Grafik Konsumsi Per Jam (Semua Fasa)</h2>
                </div>
                <ChartComponent data={chartData} />
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                    <h2 className="text-lg font-semibold text-slate-700">Rincian Data Per Jam</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                                <th className="px-6 py-3 text-left">Jam</th>
                                <th className="px-6 py-3 text-right">Fasa R (kWh)</th>
                                <th className="px-6 py-3 text-right">Fasa S (kWh)</th>
                                <th className="px-6 py-3 text-right">Fasa T (kWh)</th>
                                <th className="px-6 py-3 text-right font-bold">Total (kWh)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockHourlyData.map((row, i) => (
                                <tr key={i} className={`hover:bg-blue-50/50 transition-colors ${row.total === puncakLoad ? "bg-indigo-50" : ""}`}>
                                    <td className="px-6 py-3 font-medium text-slate-700">{row.jam}</td>
                                    <td className="px-6 py-3 text-right text-slate-600">{row.fasa_r.toFixed(1)}</td>
                                    <td className="px-6 py-3 text-right text-slate-600">{row.fasa_s.toFixed(1)}</td>
                                    <td className="px-6 py-3 text-right text-slate-600">{row.fasa_t.toFixed(1)}</td>
                                    <td className="px-6 py-3 text-right font-semibold text-slate-800">{row.total.toFixed(1)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-blue-700 text-white font-bold text-sm">
                                <td className="px-6 py-3">Total</td>
                                <td className="px-6 py-3 text-right">{mockHourlyData.reduce((s, d) => s + d.fasa_r, 0).toFixed(1)}</td>
                                <td className="px-6 py-3 text-right">{mockHourlyData.reduce((s, d) => s + d.fasa_s, 0).toFixed(1)}</td>
                                <td className="px-6 py-3 text-right">{mockHourlyData.reduce((s, d) => s + d.fasa_t, 0).toFixed(1)}</td>
                                <td className="px-6 py-3 text-right">{totalHari.toFixed(1)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}
