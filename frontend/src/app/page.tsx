"use client";

import { useState, useEffect } from "react";
import DashboardCard from "@/components/DashboardCard";
import ChartComponent from "@/components/ChartComponent";
import { Zap, Activity, Battery, BatteryCharging, AlertTriangle, Sun } from "lucide-react";

// Hourly mock data (today)
const hourlyLabels = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];
const konsumsiHariIni = [3.3, 2.7, 2.4, 2.1, 2.4, 3.6, 5.3, 7.4, 9.5, 11.3, 12.2, 13.4, 14.3, 13.7, 12.8, 11.6, 12.5, 15.2, 16.4, 15.5, 14.3, 11.9];
const teganganR = hourlyLabels.map(() => +(218 + Math.random() * 5).toFixed(1));
const teganganS = hourlyLabels.map(() => +(217 + Math.random() * 5).toFixed(1));
const teganganT = hourlyLabels.map(() => +(219 + Math.random() * 5).toFixed(1));
const arusR = [1.1, 0.9, 0.8, 0.7, 0.8, 1.2, 1.8, 2.5, 3.2, 3.8, 4.1, 4.5, 4.8, 4.6, 4.3, 3.9, 4.2, 5.1, 5.5, 5.2, 4.8, 4.0];
const arusS = arusR.map(v => +(v * 0.95).toFixed(2));
const arusT = arusR.map(v => +(v * 1.05).toFixed(2));

// Totals
const teganganRataRata = hourlyLabels.map((_, i) => +((teganganR[i] + teganganS[i] + teganganT[i]) / 3).toFixed(1));
const arusTotal = hourlyLabels.map((_, i) => +(arusR[i] + arusS[i] + arusT[i]).toFixed(2));

const totalKonsumsiHariIni = konsumsiHariIni.reduce((a, b) => a + b, 0);

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMockData = () => ({
      last_updated: new Date().toLocaleTimeString('id-ID', { hour12: false }) + ' (Mock)',
      total_kwh: 145.2,
      estimasi_tagihan: 210000,
      kwh_hari_ini: totalKonsumsiHariIni,
      fasa_r: { v: 220, a: 5.2, kwh: 45.1 },
      fasa_s: { v: 219, a: 4.8, kwh: 48.5 },
      fasa_t: { v: 221, a: 5.5, kwh: 51.6 },
    });

    const timer = setTimeout(() => {
      setData(getMockData());
      setLoading(false);
    }, 500);

    const interval = setInterval(() => {
      setData((prev: any) => ({
        ...prev,
        last_updated: new Date().toLocaleTimeString('id-ID', { hour12: false }) + ' (Mock)'
      }));
    }, 5000);

    return () => { clearTimeout(timer); clearInterval(interval); };
  }, []);

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="bg-red-50 p-6 rounded-xl border border-red-200 flex items-start gap-4">
        <AlertTriangle className="text-red-500 w-6 h-6 shrink-0" />
        <div>
          <h3 className="text-red-800 font-semibold mb-1">Koneksi API Gagal</h3>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // ---- Chart data definitions ----

  const chartKonsumsi = {
    labels: hourlyLabels,
    datasets: [{
      fill: true,
      label: 'Konsumsi (kWh)',
      data: konsumsiHariIni,
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.12)',
      tension: 0.4,
      pointRadius: 2,
    }],
  };

  const chartTegangan = {
    labels: hourlyLabels,
    datasets: [
      {
        label: 'Tegangan R (V)',
        data: teganganR,
        borderColor: 'rgb(220, 38, 38)',
        backgroundColor: 'rgba(220, 38, 38, 0.05)',
        tension: 0.4, fill: false, pointRadius: 2,
      },
      {
        label: 'Tegangan S (V)',
        data: teganganS,
        borderColor: 'rgb(22, 163, 74)',
        backgroundColor: 'rgba(22, 163, 74, 0.05)',
        tension: 0.4, fill: false, pointRadius: 2,
      },
      {
        label: 'Tegangan T (V)',
        data: teganganT,
        borderColor: 'rgb(202, 138, 4)',
        backgroundColor: 'rgba(202, 138, 4, 0.05)',
        tension: 0.4, fill: false, pointRadius: 2,
      },
      {
        label: 'Rata-rata (V)',
        data: teganganRataRata,
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.08)',
        tension: 0.4, fill: false, pointRadius: 0,
        borderDash: [6, 3],
        borderWidth: 2,
      },
    ],
  };

  const chartArus = {
    labels: hourlyLabels,
    datasets: [
      {
        label: 'Arus R (A)',
        data: arusR,
        borderColor: 'rgb(220, 38, 38)',
        backgroundColor: 'rgba(220, 38, 38, 0.08)',
        tension: 0.4, fill: true, pointRadius: 2,
      },
      {
        label: 'Arus S (A)',
        data: arusS,
        borderColor: 'rgb(22, 163, 74)',
        backgroundColor: 'rgba(22, 163, 74, 0.08)',
        tension: 0.4, fill: true, pointRadius: 2,
      },
      {
        label: 'Arus T (A)',
        data: arusT,
        borderColor: 'rgb(202, 138, 4)',
        backgroundColor: 'rgba(202, 138, 4, 0.08)',
        tension: 0.4, fill: true, pointRadius: 2,
      },
      {
        label: 'Total (A)',
        data: arusTotal,
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.08)',
        tension: 0.4, fill: true, pointRadius: 0,
        borderWidth: 2.5,
      },
    ],
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1">Pemantauan Konsumsi Listrik Real-time</p>
        </div>
        <div className="text-sm text-slate-500 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          Update terakhir: {data.last_updated}
        </div>
      </div>

      {/* Phase Cards — styled like reference */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            label: 'Total',
            bg: 'bg-blue-600',
            header: 'bg-blue-700',
            kwh: (data.fasa_r.kwh + data.fasa_s.kwh + data.fasa_t.kwh).toFixed(2),
            v: ((data.fasa_r.v + data.fasa_s.v + data.fasa_t.v) / 3).toFixed(2),
            a: (data.fasa_r.a + data.fasa_s.a + data.fasa_t.a).toFixed(2),
          },
          {
            label: 'Phase R',
            bg: 'bg-red-500',
            header: 'bg-red-600',
            kwh: data.fasa_r.kwh,
            v: data.fasa_r.v,
            a: data.fasa_r.a,
          },
          {
            label: 'Phase S',
            bg: 'bg-green-500',
            header: 'bg-green-600',
            kwh: data.fasa_s.kwh,
            v: data.fasa_s.v,
            a: data.fasa_s.a,
          },
          {
            label: 'Phase T',
            bg: 'bg-yellow-400',
            header: 'bg-yellow-500',
            kwh: data.fasa_t.kwh,
            v: data.fasa_t.v,
            a: data.fasa_t.a,
          },
        ].map((card, i) => (
          <div key={i} className={`${card.bg} rounded-2xl overflow-hidden shadow-lg`}>
            {/* Card Header */}
            <div className={`${card.header} px-5 py-3 flex items-center justify-center gap-2`}>
              <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
              <span className="text-white font-bold text-lg tracking-wide">{card.label}</span>
              <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
            </div>
            {/* Card Body */}
            <div className="px-5 py-4 text-white space-y-1.5 text-sm font-medium">
              <p>Konsumsi Listrik →</p>
              <p className="text-base font-bold">{card.kwh} kWh</p>
              <p className="mt-2">Tegangan →</p>
              <p className="text-base font-bold">{card.v} V</p>
              <p className="mt-2">Arus →</p>
              <p className="text-base font-bold">{card.a} A</p>
            </div>
          </div>
        ))}
      </div>



      {/* Konsumsi Hari Ini — Summary Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-lg bg-blue-700">
            <Sun className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-700">Konsumsi Listrik Hari Ini</h2>
            <p className="text-xs text-slate-400">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Konsumsi', value: `${totalKonsumsiHariIni.toFixed(1)} kWh`, sub: 'Akumulasi hari ini' },
            { label: 'Beban Puncak', value: `${Math.max(...konsumsiHariIni).toFixed(1)} kWh`, sub: 'Pukul 18:00' },
            { label: 'Rata-rata / Jam', value: `${(totalKonsumsiHariIni / hourlyLabels.length).toFixed(2)} kWh`, sub: 'Per jam' },
            { label: 'Est. Biaya Hari Ini', value: `Rp ${Math.round(totalKonsumsiHariIni * 1444.7).toLocaleString('id-ID')}`, sub: 'Tarif R-3/TR' },
          ].map((item, i) => (
            <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-xs text-slate-500 mb-1">{item.label}</p>
              <p className="text-xl font-bold text-slate-800">{item.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Grafik Konsumsi */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-700 mb-1">Grafik Konsumsi Listrik Hari Ini</h2>
        <p className="text-xs text-slate-400 mb-4">Total daya terpakai (kWh) per jam</p>
        <ChartComponent data={chartKonsumsi} />
      </div>

      {/* Grafik Tegangan & Arus — stacked */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-700 mb-1">Grafik Tegangan (V)</h2>
          <p className="text-xs text-slate-400 mb-4">Tegangan Fasa R, S, T per jam</p>
          <ChartComponent data={chartTegangan} />
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-700 mb-1">Grafik Arus (A)</h2>
          <p className="text-xs text-slate-400 mb-4">Arus Fasa R, S, T per jam</p>
          <ChartComponent data={chartArus} />
        </div>
      </div>

    </div >
  );
}
