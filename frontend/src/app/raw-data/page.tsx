"use client";

import { useState } from "react";
import { Table, Search, Download, ChevronLeft, ChevronRight, Wifi } from "lucide-react";

// Mock data: raw ESP32 sensor readings
const generateMockData = () => {
    const records = [];
    const base = new Date("2026-03-02T00:00:00");
    for (let i = 0; i < 100; i++) {
        const ts = new Date(base.getTime() + i * 15 * 60 * 1000); // every 15 minutes
        const hour = ts.getHours();
        const loadFactor = hour >= 7 && hour <= 20 ? 1.0 + Math.random() * 0.5 : 0.3 + Math.random() * 0.4;
        const vr = +(218 + Math.random() * 6).toFixed(1);
        const vs = +(217 + Math.random() * 6).toFixed(1);
        const vt = +(219 + Math.random() * 6).toFixed(1);
        const ir = +(4 * loadFactor + Math.random() * 0.5).toFixed(2);
        const is = +(3.8 * loadFactor + Math.random() * 0.5).toFixed(2);
        const it = +(4.2 * loadFactor + Math.random() * 0.5).toFixed(2);
        const pr = +(vr * ir * 0.95 / 1000).toFixed(3);
        const ps = +(vs * is * 0.95 / 1000).toFixed(3);
        const pt = +(vt * it * 0.95 / 1000).toFixed(3);
        records.push({
            id: i + 1,
            timestamp: ts.toLocaleString("id-ID", { hour12: false }),
            fasa_r: { v: vr, a: ir, kw: pr },
            fasa_s: { v: vs, a: is, kw: ps },
            fasa_t: { v: vt, a: it, kw: pt },
            total_kw: +(pr + ps + pt).toFixed(3),
            pf: +(0.92 + Math.random() * 0.06).toFixed(2),
            status: Math.random() > 0.05 ? "Normal" : "Warning",
        });
    }
    return records;
};

const allData = generateMockData();
const PAGE_SIZE = 15;

export default function RawData() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("Semua");

    const filtered = allData.filter((row) => {
        const matchSearch = row.timestamp.includes(search) || String(row.id).includes(search);
        const matchStatus = statusFilter === "Semua" || row.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Tabel Pengukuran</h1>
                    <p className="text-slate-500 mt-1">Catatan data mentah dari sensor ESP32 — interval 15 menit</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors shadow-sm">
                    <Download className="w-4 h-4" />
                    Export CSV
                </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Record", value: allData.length, sub: "Hari ini" },
                    { label: "Record Normal", value: allData.filter(d => d.status === "Normal").length, sub: "Status aman" },
                    { label: "Record Warning", value: allData.filter(d => d.status === "Warning").length, sub: "Perlu dicek" },
                    { label: "Interval", value: "15 Menit", sub: "Auto refresh" },
                ].map((s, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-700"><Wifi className="w-4 h-4 text-white" /></div>
                        <div>
                            <p className="text-slate-500 text-xs">{s.label}</p>
                            <p className="text-xl font-bold text-slate-800">{s.value}</p>
                            <p className="text-slate-400 text-xs">{s.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter & Search */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Table className="w-5 h-5 text-blue-700" />
                        <h2 className="text-lg font-semibold text-slate-700">Data Sensor Raw</h2>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{filtered.length} record</span>
                    </div>
                    <div className="flex gap-3 w-full sm:w-auto">
                        {/* Status Filter */}
                        <select
                            value={statusFilter}
                            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                            className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option>Semua</option>
                            <option>Normal</option>
                            <option>Warning</option>
                        </select>
                        {/* Search */}
                        <div className="relative flex-1 sm:flex-none">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Cari timestamp / ID..."
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                                className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                                <th className="px-4 py-3 text-left">ID</th>
                                <th className="px-4 py-3 text-left">Timestamp</th>
                                <th className="px-4 py-3 text-right">V-R (V)</th>
                                <th className="px-4 py-3 text-right">I-R (A)</th>
                                <th className="px-4 py-3 text-right">P-R (kW)</th>
                                <th className="px-4 py-3 text-right">V-S (V)</th>
                                <th className="px-4 py-3 text-right">I-S (A)</th>
                                <th className="px-4 py-3 text-right">P-S (kW)</th>
                                <th className="px-4 py-3 text-right">V-T (V)</th>
                                <th className="px-4 py-3 text-right">I-T (A)</th>
                                <th className="px-4 py-3 text-right">P-T (kW)</th>
                                <th className="px-4 py-3 text-right">Total (kW)</th>
                                <th className="px-4 py-3 text-right">PF</th>
                                <th className="px-4 py-3 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {paginated.length === 0 ? (
                                <tr>
                                    <td colSpan={14} className="px-6 py-12 text-center text-slate-400">Tidak ada data ditemukan.</td>
                                </tr>
                            ) : (
                                paginated.map((row) => (
                                    <tr key={row.id} className={`hover:bg-blue-50/40 transition-colors text-xs ${row.status === "Warning" ? "bg-amber-50" : ""}`}>
                                        <td className="px-4 py-2.5 text-slate-400 font-mono">{row.id}</td>
                                        <td className="px-4 py-2.5 text-slate-600 whitespace-nowrap font-mono">{row.timestamp}</td>
                                        <td className="px-4 py-2.5 text-right text-slate-700">{row.fasa_r.v}</td>
                                        <td className="px-4 py-2.5 text-right text-slate-700">{row.fasa_r.a}</td>
                                        <td className="px-4 py-2.5 text-right text-indigo-600 font-medium">{row.fasa_r.kw}</td>
                                        <td className="px-4 py-2.5 text-right text-slate-700">{row.fasa_s.v}</td>
                                        <td className="px-4 py-2.5 text-right text-slate-700">{row.fasa_s.a}</td>
                                        <td className="px-4 py-2.5 text-right text-blue-600 font-medium">{row.fasa_s.kw}</td>
                                        <td className="px-4 py-2.5 text-right text-slate-700">{row.fasa_t.v}</td>
                                        <td className="px-4 py-2.5 text-right text-slate-700">{row.fasa_t.a}</td>
                                        <td className="px-4 py-2.5 text-right text-sky-600 font-medium">{row.fasa_t.kw}</td>
                                        <td className="px-4 py-2.5 text-right font-bold text-slate-800">{row.total_kw}</td>
                                        <td className="px-4 py-2.5 text-right text-slate-600">{row.pf}</td>
                                        <td className="px-4 py-2.5 text-center">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${row.status === "Warning"
                                                    ? "bg-amber-100 text-amber-700"
                                                    : "bg-green-100 text-green-700"
                                                }`}>
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
                    <span>Menampilkan {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} dari {filtered.length} record</span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const pg = page <= 3 ? i + 1 : page - 2 + i;
                            if (pg < 1 || pg > totalPages) return null;
                            return (
                                <button
                                    key={pg}
                                    onClick={() => setPage(pg)}
                                    className={`w-8 h-8 rounded-lg text-xs font-medium transition ${pg === page ? "bg-blue-700 text-white" : "border border-slate-200 hover:bg-slate-50 text-slate-600"
                                        }`}
                                >
                                    {pg}
                                </button>
                            );
                        })}
                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
