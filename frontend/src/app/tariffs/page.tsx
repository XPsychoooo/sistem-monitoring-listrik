"use client";

import { useState } from "react";
import { Zap, Receipt } from "lucide-react";

// Mock data harian (30 hari)
const mockHarian = [
    { tgl: "01 Mar 2026", hari: "Senin", kwh: 213.4 },
    { tgl: "02 Mar 2026", hari: "Selasa", kwh: 198.7 },
    { tgl: "03 Mar 2026", hari: "Rabu", kwh: 221.3 },
    { tgl: "04 Mar 2026", hari: "Kamis", kwh: 235.6 },
    { tgl: "05 Mar 2026", hari: "Jumat", kwh: 241.2 },
    { tgl: "06 Mar 2026", hari: "Sabtu", kwh: 178.5 },
    { tgl: "07 Mar 2026", hari: "Minggu", kwh: 162.3 },
    { tgl: "08 Mar 2026", hari: "Senin", kwh: 228.9 },
    { tgl: "09 Mar 2026", hari: "Selasa", kwh: 190.8 },
    { tgl: "10 Mar 2026", hari: "Rabu", kwh: 244.1 },
    { tgl: "11 Mar 2026", hari: "Kamis", kwh: 252.7 },
    { tgl: "12 Mar 2026", hari: "Jumat", kwh: 261.3 },
    { tgl: "13 Mar 2026", hari: "Sabtu", kwh: 183.4 },
    { tgl: "14 Mar 2026", hari: "Minggu", kwh: 170.2 },
    { tgl: "15 Mar 2026", hari: "Senin", kwh: 238.5 },
    { tgl: "16 Mar 2026", hari: "Selasa", kwh: 219.6 },
    { tgl: "17 Mar 2026", hari: "Rabu", kwh: 247.8 },
    { tgl: "18 Mar 2026", hari: "Kamis", kwh: 255.4 },
    { tgl: "19 Mar 2026", hari: "Jumat", kwh: 263.1 },
    { tgl: "20 Mar 2026", hari: "Sabtu", kwh: 189.7 },
    { tgl: "21 Mar 2026", hari: "Minggu", kwh: 175.3 },
    { tgl: "22 Mar 2026", hari: "Senin", kwh: 232.8 },
    { tgl: "23 Mar 2026", hari: "Selasa", kwh: 224.5 },
    { tgl: "24 Mar 2026", hari: "Rabu", kwh: 249.2 },
    { tgl: "25 Mar 2026", hari: "Kamis", kwh: 258.6 },
    { tgl: "26 Mar 2026", hari: "Jumat", kwh: 267.4 },
    { tgl: "27 Mar 2026", hari: "Sabtu", kwh: 192.1 },
    { tgl: "28 Mar 2026", hari: "Minggu", kwh: 168.9 },
    { tgl: "29 Mar 2026", hari: "Senin", kwh: 241.7 },
    { tgl: "30 Mar 2026", hari: "Selasa", kwh: 234.3 },
];

export default function TarifListrik() {
    const [tarifInput, setTarifInput] = useState<string>("1444.70");

    const tarif = parseFloat(tarifInput) || 0;
    const totalKwh = mockHarian.reduce((s, d) => s + d.kwh, 0);
    const totalBiaya = mockHarian.reduce((s, d) => s + d.kwh * tarif, 0);
    const ppj = totalBiaya * 0.03;
    const grandTotal = totalBiaya + ppj;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Tarif Listrik</h1>
                <p className="text-slate-500 mt-1">Atur harga tarif dan lihat estimasi biaya harian</p>
            </div>

            {/* Input Harga */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 rounded-lg bg-blue-700">
                        <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-700">Harga Tarif per kWh</h2>
                        <p className="text-xs text-slate-400">Masukkan harga tarif listrik yang berlaku</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 max-w-sm">
                    <span className="text-slate-500 font-medium text-sm whitespace-nowrap">Rp</span>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={tarifInput}
                        onChange={e => setTarifInput(e.target.value)}
                        className="flex-1 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-800 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="1444.70"
                    />
                    <span className="text-slate-500 text-sm">/ kWh</span>
                </div>
                {tarif > 0 && (
                    <p className="mt-3 text-sm text-blue-700 font-medium">
                        ✓ Menggunakan tarif <strong>Rp {tarif.toLocaleString("id-ID", { minimumFractionDigits: 2 })}</strong> per kWh
                    </p>
                )}
            </div>

            {/* Tabel Harian */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-blue-700" />
                    <h2 className="text-lg font-semibold text-slate-700">Daftar Konsumsi & Biaya Harian</h2>
                    <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Maret 2026</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                                <th className="px-5 py-3 text-left w-8">#</th>
                                <th className="px-5 py-3 text-left">Tanggal</th>
                                <th className="px-5 py-3 text-left">Hari</th>
                                <th className="px-5 py-3 text-right">Konsumsi (kWh)</th>
                                <th className="px-5 py-3 text-right">Harga Harian (Rp)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockHarian.map((row, i) => {
                                const biayaHarian = row.kwh * tarif;
                                const isWeekend = row.hari === "Sabtu" || row.hari === "Minggu";
                                return (
                                    <tr key={i} className={`hover:bg-blue-50/40 transition-colors ${isWeekend ? "bg-slate-50/60" : ""}`}>
                                        <td className="px-5 py-2.5 text-slate-400 text-xs">{i + 1}</td>
                                        <td className="px-5 py-2.5 font-medium text-slate-700">{row.tgl}</td>
                                        <td className="px-5 py-2.5">
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${isWeekend ? "bg-slate-100 text-slate-500" : "bg-blue-50 text-blue-600"}`}>
                                                {row.hari}
                                            </span>
                                        </td>
                                        <td className="px-5 py-2.5 text-right text-slate-700 font-medium">{row.kwh.toFixed(1)}</td>
                                        <td className="px-5 py-2.5 text-right font-semibold text-slate-800">
                                            {tarif > 0
                                                ? `Rp ${biayaHarian.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`
                                                : <span className="text-slate-300">—</span>}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>

                        {/* Footer Total */}
                        <tfoot>
                            <tr className="bg-slate-50 border-t-2 border-slate-200">
                                <td colSpan={3} className="px-5 py-3 font-bold text-slate-700 text-sm">Subtotal (30 hari)</td>
                                <td className="px-5 py-3 text-right font-bold text-slate-800">{totalKwh.toFixed(1)} kWh</td>
                                <td className="px-5 py-3 text-right font-bold text-slate-800">
                                    {tarif > 0 ? `Rp ${totalBiaya.toLocaleString("id-ID", { maximumFractionDigits: 0 })}` : "—"}
                                </td>
                            </tr>
                            {tarif > 0 && (
                                <>
                                    <tr className="bg-slate-50">
                                        <td colSpan={4} className="px-5 py-2 text-sm text-slate-500">PPJ (Pajak Penerangan Jalan 3%)</td>
                                        <td className="px-5 py-2 text-right text-sm text-slate-600 font-medium">
                                            Rp {ppj.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
                                        </td>
                                    </tr>
                                    <tr className="bg-blue-700">
                                        <td colSpan={4} className="px-5 py-4 text-white font-bold text-base">
                                            TOTAL TAGIHAN BULAN INI
                                        </td>
                                        <td className="px-5 py-4 text-right text-white font-bold text-xl">
                                            Rp {grandTotal.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
                                        </td>
                                    </tr>
                                </>
                            )}
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}
