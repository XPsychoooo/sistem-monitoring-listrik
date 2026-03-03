"use client";

import { useState } from "react";
import { Clock, Zap, TrendingUp, Activity } from "lucide-react";
import ChartComponent from "@/components/ChartComponent";

const mockHourlyData = [
    { jam: "00:00", v: 221.2, a: 1.8, kw: 0.398, kwh: 2.8 },
    { jam: "01:00", v: 220.8, a: 1.4, kw: 0.309, kwh: 2.1 },
    { jam: "02:00", v: 221.5, a: 1.2, kw: 0.265, kwh: 1.9 },
    { jam: "03:00", v: 221.0, a: 1.0, kw: 0.221, kwh: 1.7 },
    { jam: "04:00", v: 220.5, a: 1.4, kw: 0.309, kwh: 2.0 },
    { jam: "05:00", v: 219.8, a: 3.4, kw: 0.747, kwh: 4.1 },
    { jam: "06:00", v: 218.3, a: 5.6, kw: 1.222, kwh: 6.8 },
    { jam: "07:00", v: 216.9, a: 8.8, kw: 1.909, kwh: 10.2 },
    { jam: "08:00", v: 215.4, a: 11.8, kw: 2.542, kwh: 13.5 },
    { jam: "09:00", v: 216.2, a: 13.2, kw: 2.854, kwh: 15.1 },
    { jam: "10:00", v: 217.1, a: 14.2, kw: 3.083, kwh: 16.3 },
    { jam: "11:00", v: 216.5, a: 14.8, kw: 3.208, kwh: 17.0 },
    { jam: "12:00", v: 215.8, a: 13.8, kw: 2.978, kwh: 15.8 },
    { jam: "13:00", v: 216.3, a: 12.6, kw: 2.725, kwh: 14.2 },
    { jam: "14:00", v: 217.4, a: 14.4, kw: 3.131, kwh: 16.4 },
    { jam: "15:00", v: 216.8, a: 15.6, kw: 3.382, kwh: 17.8 },
    { jam: "16:00", v: 215.9, a: 16.2, kw: 3.497, kwh: 18.5 },
    { jam: "17:00", v: 214.7, a: 17.0, kw: 3.650, kwh: 19.2 },
    { jam: "18:00", v: 213.8, a: 19.2, kw: 4.105, kwh: 21.6, peak: true },
    { jam: "19:00", v: 215.2, a: 16.2, kw: 3.486, kwh: 18.3 },
    { jam: "20:00", v: 217.6, a: 12.8, kw: 2.785, kwh: 14.7 },
    { jam: "21:00", v: 219.4, a: 8.6, kw: 1.887, kwh: 10.4 },
];

const labels = mockHourlyData.map(d => d.jam);
const totalKonsumsi = mockHourlyData.reduce((s, d) => s + d.kwh, 0);
const peakRow = mockHourlyData.reduce((m, d) => d.kwh > m.kwh ? d : m, mockHourlyData[0]);

export default function HourlyData() {
    const [activeChart, setActiveChart] = useState<"kwh" | "v" | "a">("kwh");

    const chartData = {
        kwh: {
            labels,
            datasets: [{
                fill: true,
                label: 'Konsumsi (kWh)',
                data: mockHourlyData.map(d => d.kwh),
                borderColor: 'rgb(37, 99, 235)',
                backgroundColor: 'rgba(37, 99, 235, 0.12)',
                tension: 0.4, pointRadius: 3,
            }],
        },
        v: {
            labels,
            datasets: [{
                fill: true,
                label: 'Tegangan (V)',
                data: mockHourlyData.map(d => d.v),
                borderColor: 'rgb(220, 38, 38)',
                backgroundColor: 'rgba(220, 38, 38, 0.08)',
                tension: 0.4, pointRadius: 3,
            }],
        },
        a: {
            labels,
            datasets: [{
                fill: true,
                label: 'Arus (A)',
                data: mockHourlyData.map(d => d.a),
                borderColor: 'rgb(22, 163, 74)',
                backgroundColor: 'rgba(22, 163, 74, 0.1)',
                tension: 0.4, pointRadius: 3,
            }],
        },
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Data Per Jam</h1>
                <p className="text-slate-500 mt-1">Akumulasi konsumsi listrik setiap jam — Senin, 3 Maret 2026</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                    { icon: Zap, color: "bg-blue-700", label: "Total Konsumsi Hari Ini", value: `${totalKonsumsi.toFixed(1)} kWh` },
                    { icon: TrendingUp, color: "bg-red-600", label: "Beban Puncak", value: `${peakRow.kwh} kWh`, sub: `Pukul ${peakRow.jam}` },
                    { icon: Activity, color: "bg-green-600", label: "Rata-rata / Jam", value: `${(totalKonsumsi / mockHourlyData.length).toFixed(2)} kWh` },
                ].map((c, i) => (
                    <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${c.color}`}>
                            <c.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-slate-500 text-sm">{c.label}</p>
                            <p className="text-2xl font-bold text-slate-800">{c.value}</p>
                            {c.sub && <p className="text-slate-400 text-xs">{c.sub}</p>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Chart with tab switcher */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-700" />
                        <h2 className="text-lg font-semibold text-slate-700">Grafik Per Jam</h2>
                    </div>
                    <div className="flex gap-2">
                        {([["kwh", "Konsumsi"], ["v", "Tegangan"], ["a", "Arus"]] as const).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => setActiveChart(key)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeChart === key
                                        ? "bg-blue-700 text-white"
                                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
                <ChartComponent data={chartData[activeChart]} />
            </div>

            {/* Tabel detail */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-700" />
                    <h2 className="text-lg font-semibold text-slate-700">Tabel Detail Per Jam</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                                <th className="px-5 py-3 text-left">Jam</th>
                                <th className="px-5 py-3 text-right">Tegangan (V)</th>
                                <th className="px-5 py-3 text-right">Arus (A)</th>
                                <th className="px-5 py-3 text-right">Daya (kW)</th>
                                <th className="px-5 py-3 text-right">Konsumsi (kWh)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockHourlyData.map((row, i) => (
                                <tr key={i} className={`hover:bg-blue-50/40 transition-colors ${row.peak ? "bg-amber-50" : ""}`}>
                                    <td className="px-5 py-2.5 font-mono font-semibold text-slate-700">
                                        {row.jam}
                                        {row.peak && <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">Puncak</span>}
                                    </td>
                                    <td className="px-5 py-2.5 text-right text-red-600 font-medium">{row.v}</td>
                                    <td className="px-5 py-2.5 text-right text-green-600 font-medium">{row.a}</td>
                                    <td className="px-5 py-2.5 text-right text-slate-600">{row.kw}</td>
                                    <td className="px-5 py-2.5 text-right font-bold text-blue-700">{row.kwh}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-slate-50 border-t-2 border-slate-200">
                                <td className="px-5 py-3 font-bold text-slate-700">Total</td>
                                <td className="px-5 py-3 text-right text-slate-400 text-xs">—</td>
                                <td className="px-5 py-3 text-right text-slate-400 text-xs">—</td>
                                <td className="px-5 py-3 text-right text-slate-400 text-xs">—</td>
                                <td className="px-5 py-3 text-right font-bold text-blue-700">{totalKonsumsi.toFixed(1)} kWh</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}
