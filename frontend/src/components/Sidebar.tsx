"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Clock, Calendar, CalendarDays, Settings, Table } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/" },
    { name: "Data Per Jam", icon: Clock, href: "/hourly" },
    { name: "Data Harian", icon: Calendar, href: "/daily" },
    { name: "Data Bulanan", icon: CalendarDays, href: "/monthly" },
    { name: "Tabel Pengukuran", icon: Table, href: "/raw-data" },
    { name: "Tarif Listrik", icon: Settings, href: "/tariffs" },
  ];

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-blue-900 border-r border-gray-200">
      <div className="h-full px-3 py-4 overflow-y-auto bg-blue-900 text-white shadow-xl shadow-blue-900/20">
        <div className="mb-6 px-4">
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
             <LayoutDashboard className="w-8 h-8 text-blue-300" /> 
             Smart Meter
          </h2>
          <p className="text-sm text-blue-200 mt-1">Sistem Monitoring Listrik</p>
        </div>
        <ul className="space-y-2 font-medium">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg group transition-all duration-300 ease-in-out ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/50"
                      : "text-blue-100 hover:bg-blue-700 hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 transition duration-75 ${
                      isActive ? "text-white" : "text-blue-300 group-hover:text-white"
                    }`}
                  />
                  <span className="ms-3">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
