import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    colorClass: string;
    subValue1?: string;
    subValue1Label?: string;
    subValue2?: string;
    subValue2Label?: string;
}

export default function DashboardCard({
    title,
    value,
    icon: Icon,
    colorClass,
    subValue1,
    subValue1Label,
    subValue2,
    subValue2Label,
}: DashboardCardProps) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                </div>
                <div className={`p-3 rounded-xl ${colorClass}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>

            {(subValue1 || subValue2) && (
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                    {subValue1 && (
                        <div>
                            <p className="text-gray-400 text-xs">{subValue1Label}</p>
                            <p className="text-gray-700 font-semibold">{subValue1}</p>
                        </div>
                    )}
                    {subValue2 && (
                        <div className="text-right">
                            <p className="text-gray-400 text-xs">{subValue2Label}</p>
                            <p className="text-gray-700 font-semibold">{subValue2}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
