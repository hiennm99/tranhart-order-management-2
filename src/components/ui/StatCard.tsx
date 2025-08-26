import React from 'react';
import { LucideIcon, TrendingUp } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    color: string;
    trend?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
                                                      title,
                                                      value,
                                                      icon: Icon,
                                                      color,
                                                      trend
                                                  }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                <p className={`text-3xl font-bold ${color} mb-2`}>{value}</p>
                {trend && (
                    <span className={`text-sm flex items-center ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className={`h-3 w-3 mr-1 ${trend < 0 ? 'rotate-180' : ''}`} />
                        {Math.abs(trend)}% vs tháng trước
          </span>
                )}
            </div>
            <div className={`p-3 rounded-full ${color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                <Icon className={`h-6 w-6 ${color}`} />
            </div>
        </div>
    </div>
);