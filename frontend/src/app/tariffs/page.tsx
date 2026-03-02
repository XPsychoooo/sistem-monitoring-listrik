"use client";

import { useState } from "react";
import { Zap, Calculator, Info, TrendingUp } from "lucide-react";

// Data tarif PLN 2024 — berdasarkan Permen ESDM No. 3 Tahun 2020
const tarifPLN = [
    { golongan: "R-1/TR", daya: "450 VA", tarif: 415, jenis: "Rumah Tangga", abonemen: 11_500 },
    { golongan: "R-1/TR", daya: "900 VA (subsidi)", tarif: 605, jenis: "Rumah Tangga", abonemen: 20_000 },
    { golongan: "R-1/TR", daya: "900 VA (mampu)", tarif: 1_352, jenis: "Rumah Tangga", abonemen: 31_000 },
    { golongan: "R-1/TR", daya: "1.300 VA", tarif: 1_444.7, jenis: "Rumah Tangga", abonemen: 38_000 },
    { golongan: "R-1/TR", daya: "2.200 VA", tarif: 1_444.7, jenis: "Rumah Tangga", abonemen: 56_000 },
    { golongan: "R-2/TR", daya: "3.500–5.500 VA", tarif: 1_699.53, jenis: "Rumah Tangga Menengah", abonemen: 97_000 },
    { golongan: "R-3/TR", daya: "6.600 VA ke atas", tarif: 1_699.53, jenis: "Rumah Tangga Besar", abonemen: null },
    { golongan: "B-1/TR", daya: "450–5.500 VA", tarif: 1_115, jenis: "Bisnis Kecil", abonemen: null },
    { golongan: "B-2/TR", daya: "6.600 VA–200 kVA", tarif: 1_444.7, jenis: "Bisnis Menengah", abonemen: null },
    { golongan: "B-3/TM", daya: "> 200 kVA", tarif: 1_114.74, jenis: "Bisnis Besar", abonemen: null },
    { golongan: "I-1/TR", daya: "450 VA–14 kVA", tarif: 1_115, jenis: "Industri Kecil", abonemen: null },
    { golongan: "I-2/TR", daya: "14 kVA–200 kVA", tarif: 1_444.7, jenis: "Industri Menengah", abonemen: null },
    { golongan: "I-3/TM", daya: "> 200 kVA", tarif: 1_114.74, jenis: "Industri Besar", abonemen: null },
    { golongan: "I-4/TT", daya: "> 30.000 kVA", tarif: 996.74, jenis: "Industri Sangat Besar", abonemen: null },
    { golongan: "P-1/TR", daya: "450 VA–200 kVA", tarif: 1_699.53, jenis: "Pemerintah Kecil", abonemen: null },
    { golongan: "P-2/TM", daya: "> 200 kVA", tarif: 1_522.88, jenis: "Pemerintah Besar", abonemen: null },
    { golongan: "S-2/TR", daya: "450 VA–200 kVA", tarif: 1_444.7, jenis: "Sosial Menengah", abonemen: null },
];

const jenisWarna: Record<string, string> = {
    "Rumah Tangga": "bg-blue-100 text-blue-700",
    "Rumah Tangga Menengah": "bg-indigo-100 text-indigo-700",
    "Rumah Tangga Besar": "bg-violet-100 text-violet-700",
    "Bisnis Kecil": "bg-emerald-100 text-emerald-700",
    "Bisnis Menengah": "bg-green-100 text-green-700",
    "Bisnis Besar": "bg-teal-100 text-teal-700",
    "Industri Kecil": "bg-amber-100 text-amber-700",
    "Industri Menengah": "bg-orange-100 text-orange-700",
    "Industri Besar": "bg-red-100 text-red-700",
    "Industri Sangat Besar": "bg-rose-100 text-rose-700",
    "Pemerintah Kecil": "bg-cyan-100 text-cyan-700",
    "Pemerintah Besar": "bg-sky-100 text-sky-700",
    "Sosial Menengah": "bg-slate-100 text-slate-600",
};

export default function TarifListrik() {
    const [kwhInput, setKwhInput] = useState<string>("");
    const [golonganInput, setGolonganInput] = useState<string>("I-2/TR");
    const [filterJenis, setFilterJenis] = useState<string>("Semua");
    const jenisOptions = ["Semua", ...Array.from(new Set(tarifPLN.map(t => t.jenis)))];

    const selectedTarif = tarifPLN.find(t => t.golongan === golonganInput && ["I-2/TR", "R-1/TR"].includes(golonganInput) ? t.daya.includes("200") || t.daya.includes("6.600") : true);
    const tarifPerKwh = tarifPLN.find(t => t.golongan === golonganInput)?.tarif ?? 1444.7;
    const kwh = parseFloat(kwhInput) || 0;
    const biaya = kwh * tarifPerKwh;
    const ppj = biaya * 0.03;
    const total = biaya + ppj;

    const filtered = filterJenis === "Semua" ? tarifPLN : tarifPLN.filter(t => t.jenis === filterJenis);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Tarif Listrik</h1>
                    <p className="text-slate-500 mt-1">Referensi tarif PLN 2024 — Permen ESDM No. 3 Tahun 2020</p>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-xl text-sm text-blue-700">
                    <Info className="w-4 h-4" />
                    Data per Januari 2024
                </div>
            </div>

            {/* Ringkasan Tarif Umum */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Tarif R-1 (1.300 VA)", value: "Rp 1.444,70", sub: "Rumah tangga", color: "bg-blue-700" },
                    { label: "Tarif R-2/R-3", value: "Rp 1.699,53", sub: "Rumah tangga besar", color: "bg-indigo-600" },
                    { label: "Tarif I-2/B-2", value: "Rp 1.444,70", sub: "Industri / Bisnis TR", color: "bg-amber-500" },
                    { label: "Pajak Penerangan", value: "3%", sub: "Dari total biaya", color: "bg-slate-600" },
                ].map((c, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${c.color}`}>
                            <Zap className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">{c.label}</p>
                            <p className="text-lg font-bold text-slate-800">{c.value}</p>
                            <p className="text-xs text-slate-400">{c.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Layout 2 kolom: Tabel + Kalkulator */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Tabel Tarif PLN */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-700" />
                            <h2 className="text-lg font-semibold text-slate-700">Daftar Tarif per Golongan</h2>
                        </div>
                        <select
                            value={filterJenis}
                            onChange={e => setFilterJenis(e.target.value)}
                            className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            {jenisOptions.map(j => <option key={j}>{j}</option>)}
                        </select>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                                    <th className="px-4 py-3 text-left">Golongan</th>
                                    <th className="px-4 py-3 text-left">Batas Daya</th>
                                    <th className="px-4 py-3 text-left">Jenis</th>
                                    <th className="px-4 py-3 text-right">Tarif (Rp/kWh)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filtered.map((row, i) => (
                                    <tr key={i} className="hover:bg-blue-50/40 transition-colors">
                                        <td className="px-4 py-2.5 font-mono font-semibold text-slate-700">{row.golongan}</td>
                                        <td className="px-4 py-2.5 text-slate-600">{row.daya}</td>
                                        <td className="px-4 py-2.5">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${jenisWarna[row.jenis] ?? "bg-slate-100 text-slate-600"}`}>
                                                {row.jenis}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2.5 text-right font-bold text-slate-800">
                                            Rp {row.tarif.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-3 border-t border-slate-100 text-xs text-slate-400">
                        Sumber: Peraturan Menteri ESDM No. 3 Tahun 2020 & penyesuaian 2022–2024. TR = Tegangan Rendah, TM = Tegangan Menengah, TT = Tegangan Tinggi.
                    </div>
                </div>

                {/* Kalkulator Biaya */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="p-2 rounded-lg bg-blue-700">
                            <Calculator className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-lg font-semibold text-slate-700">Kalkulator Biaya</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1.5">Golongan Tarif</label>
                            <select
                                value={golonganInput}
                                onChange={e => setGolonganInput(e.target.value)}
                                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                {Array.from(new Set(tarifPLN.map(t => t.golongan))).map(g => (
                                    <option key={g}>{g}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1.5">Konsumsi (kWh)</label>
                            <input
                                type="number"
                                min="0"
                                placeholder="Contoh: 250"
                                value={kwhInput}
                                onChange={e => setKwhInput(e.target.value)}
                                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* Tarif yang digunakan */}
                        <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-500">
                            Tarif: <span className="font-semibold text-slate-700">Rp {tarifPerKwh.toLocaleString("id-ID", { minimumFractionDigits: 2 })}/kWh</span>
                        </div>

                        {/* Hasil */}
                        <div className="border-t border-slate-100 pt-4 space-y-2">
                            <div className="flex justify-between text-sm text-slate-600">
                                <span>Biaya Pemakaian</span>
                                <span className="font-medium">Rp {biaya.toLocaleString("id-ID", { maximumFractionDigits: 0 })}</span>
                            </div>
                            <div className="flex justify-between text-sm text-slate-600">
                                <span>PPJ (3%)</span>
                                <span className="font-medium">Rp {ppj.toLocaleString("id-ID", { maximumFractionDigits: 0 })}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                                <span className="font-bold text-slate-800">Total Estimasi</span>
                                <span className="text-xl font-bold text-blue-700">
                                    Rp {total.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
                                </span>
                            </div>
                        </div>

                        {kwh > 0 && (
                            <div className="bg-blue-50 rounded-xl p-3 text-xs text-blue-700 space-y-1">
                                <p>⚡ Biaya per hari: <strong>Rp {(total / 30).toLocaleString("id-ID", { maximumFractionDigits: 0 })}</strong></p>
                                <p>📅 Estimasi per tahun: <strong>Rp {(total * 12).toLocaleString("id-ID", { maximumFractionDigits: 0 })}</strong></p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
