"use client";

import { useState, useEffect } from "react";
import DashboardCard from "@/components/DashboardCard";
import ChartComponent from "@/components/ChartComponent";
import { Zap, Activity, Battery, BatteryCharging, AlertTriangle, Sun } from "lucide-react";

// Hourly mock data (today) — realistic 3-phase industrial profile
const hourlyLabels = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

// Konsumsi: rendah malam, naik pagi, puncak sore
const konsumsiHariIni = [2.8, 2.1, 1.9, 1.7, 2.0, 4.1, 6.8, 10.2, 13.5, 15.1, 16.3, 17.0, 15.8, 14.2, 16.4, 17.8, 18.5, 19.2, 21.6, 18.3, 14.7, 10.4];

// Tegangan: tiap fasa punya fluktuasi sendiri (ada voltage sag jam sibuk)
const teganganR = [221.2, 220.8, 221.5, 221.0, 220.5, 219.8, 218.3, 216.9, 215.4, 216.2, 217.1, 216.5, 215.8, 216.3, 217.4, 216.8, 215.9, 214.7, 213.8, 215.2, 217.6, 219.4];
const teganganS = [220.5, 220.1, 220.9, 220.4, 219.9, 219.1, 217.6, 216.1, 214.5, 215.3, 216.4, 215.7, 214.9, 215.6, 216.8, 216.1, 215.2, 213.9, 212.9, 214.5, 216.9, 218.8];
const teganganT = [222.1, 221.7, 222.3, 221.8, 221.2, 220.4, 218.9, 217.4, 215.9, 216.7, 217.8, 217.1, 216.2, 217.0, 218.2, 217.5, 216.5, 215.2, 214.2, 215.8, 218.3, 220.1];

// Arus: tiap fasa benar-benar independen (beban tak seimbang antar fasa)
const arusR = [0.9, 0.7, 0.6, 0.5, 0.7, 1.7, 2.8, 4.4, 5.9, 6.6, 7.1, 7.4, 6.9, 6.3, 7.2, 7.8, 8.1, 8.5, 9.6, 8.1, 6.4, 4.3];
const arusS = [1.2, 0.9, 0.8, 0.6, 0.9, 2.1, 3.5, 5.2, 6.8, 7.5, 8.0, 8.5, 7.8, 7.1, 8.1, 8.8, 9.2, 9.7, 11.0, 9.3, 7.3, 5.0];
const arusT = [0.7, 0.5, 0.5, 0.4, 0.6, 1.4, 2.3, 3.7, 5.0, 5.8, 6.3, 6.6, 6.1, 5.5, 6.4, 7.0, 7.3, 7.6, 8.5, 7.2, 5.7, 3.8];

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
