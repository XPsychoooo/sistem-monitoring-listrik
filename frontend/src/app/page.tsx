"use client";

import { useState, useEffect } from "react";
import DashboardCard from "@/components/DashboardCard";
import ChartComponent from "@/components/ChartComponent";
import { Zap, Activity, Receipt, TrendingUp, AlertTriangle, Sun } from "lucide-react";

// Hourly mock data (today) — single phase
const hourlyLabels = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

// Konsumsi: rendah malam, naik pagi, puncak sore
const konsumsiHariIni = [2.8, 2.1, 1.9, 1.7, 2.0, 4.1, 6.8, 10.2, 13.5, 15.1, 16.3, 17.0, 15.8, 14.2, 16.4, 17.8, 18.5, 19.2, 21.6, 18.3, 14.7, 10.4];

// Tegangan: fluktuasi realistis (sag saat beban puncak)
const teganganData = [221.2, 220.8, 221.5, 221.0, 220.5, 219.8, 218.3, 216.9, 215.4, 216.2, 217.1, 216.5, 215.8, 216.3, 217.4, 216.8, 215.9, 214.7, 213.8, 215.2, 217.6, 219.4];

// Arus: sesuai beban (naik saat puncak)
const arusData = [1.8, 1.4, 1.2, 1.0, 1.4, 3.4, 5.6, 8.8, 11.8, 13.2, 14.2, 14.8, 13.8, 12.6, 14.4, 15.6, 16.2, 17.0, 19.2, 16.2, 12.8, 8.6];

const totalKonsumsiHariIni = konsumsiHariIni.reduce((a, b) => a + b, 0);

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateTime, setDateTime] = useState({ date: '', time: '', lastUpdate: '' });

  useEffect(() => {
    const getMockData = () => ({
      last_updated: new Date().toLocaleString('id-ID', { hour12: false }),
      total_kwh: 145.2,
      estimasi_tagihan: 210000,
      tegangan: 220,
      arus: 14.8,
      daya: 3.256,
      kwh_hari_ini: totalKonsumsiHariIni,
    });

    const timer = setTimeout(() => {
      setData(getMockData());
      setLoading(false);
    }, 500);

    // Live clock — ticks every second
    const clockTick = () => {
      const now = new Date();
      setDateTime({
        date: now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        time: now.toLocaleTimeString('id-ID', { hour12: false }),
        lastUpdate: now.toLocaleString('id-ID', { hour12: false }),
      });
    };
    clockTick();
    const clockInterval = setInterval(clockTick, 1000);

    const interval = setInterval(() => {
      setData((prev: any) => ({
        ...prev,
        last_updated: new Date().toLocaleString('id-ID', { hour12: false }),
      }));
    }, 5000);

    return () => { clearTimeout(timer); clearInterval(interval); clearInterval(clockInterval); };
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

  // Chart data
  const chartKonsumsi = {
    labels: hourlyLabels,
    datasets: [{
      fill: true,
      label: 'Konsumsi (kWh)',
      data: konsumsiHariIni,
      borderColor: 'rgb(37, 99, 235)',
      backgroundColor: 'rgba(37, 99, 235, 0.12)',
      tension: 0.4,
      pointRadius: 2,
    }],
  };

  const chartTegangan = {
    labels: hourlyLabels,
    datasets: [{
      label: 'Tegangan (V)',
      data: teganganData,
      borderColor: 'rgb(220, 38, 38)',
      backgroundColor: 'rgba(220, 38, 38, 0.08)',
      tension: 0.4,
      fill: true,
      pointRadius: 2,
    }],
  };

  const chartArus = {
    labels: hourlyLabels,
    datasets: [{
      label: 'Arus (A)',
      data: arusData,
      borderColor: 'rgb(22, 163, 74)',
      backgroundColor: 'rgba(22, 163, 74, 0.1)',
      tension: 0.4,
      fill: true,
      pointRadius: 2,
    }],
  };

  return (
    <div className="space-y-6">
      {/* Header — centered style like reference */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 py-8 px-6 text-center">
        <h1 className="text-3xl font-bold text-slate-800 leading-tight">Dashboard</h1>
        <h2 className="text-3xl font-bold text-slate-800 mt-1">Monitoring Listrik 1 Fasa</h2>
        <p className="text-slate-500 mt-3 text-base">
          {dateTime.date} | {dateTime.time}
        </p>
        <p className="mt-2 text-sm font-semibold text-green-600">
          Status Sistem: Hidup (Data Terakhir: {data.last_updated})
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <DashboardCard
          title="Total Konsumsi (Bulan Ini)"
          value={`${data.total_kwh} kWh`}
          icon={Zap}
          colorClass="bg-blue-700 shadow-blue-700/30"
          subValue1={`Rp ${data.estimasi_tagihan.toLocaleString('id-ID')}`}
          subValue1Label="Estimasi Tagihan"
        />
        <DashboardCard
          title="Tegangan"
          value={`${data.tegangan} V`}
          icon={Activity}
          colorClass="bg-red-600 shadow-red-600/30"
          subValue1="Stabil"
          subValue1Label="Status"
        />
        <DashboardCard
          title="Arus"
          value={`${data.arus} A`}
          icon={TrendingUp}
          colorClass="bg-green-600 shadow-green-600/30"
          subValue1={`${data.daya} kW`}
          subValue1Label="Daya Aktif"
        />
        <DashboardCard
          title="Konsumsi Hari Ini"
          value={`${totalKonsumsiHariIni.toFixed(1)} kWh`}
          icon={Receipt}
          colorClass="bg-sky-600 shadow-sky-600/30"
          subValue1={`Rp ${Math.round(totalKonsumsiHariIni * 1444.7).toLocaleString('id-ID')}`}
          subValue1Label="Est. Biaya Hari Ini"
        />
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
            { label: 'Est. Biaya Hari Ini', value: `Rp ${Math.round(totalKonsumsiHariIni * 1444.7).toLocaleString('id-ID')}`, sub: 'Tarif Rp 1.444,70/kWh' },
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
          <p className="text-xs text-slate-400 mb-4">Fluktuasi tegangan per jam hari ini</p>
          <ChartComponent data={chartTegangan} />
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-700 mb-1">Grafik Arus (A)</h2>
          <p className="text-xs text-slate-400 mb-4">Arus listrik per jam hari ini</p>
          <ChartComponent data={chartArus} />
        </div>
      </div>
    </div>
  );
}
