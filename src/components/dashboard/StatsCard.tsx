// components/dashboard/StatsCard.tsx
import {
    DollarSign,
    ShoppingCart,
    Users,
    Package,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

interface StatsCardProps {
    title: string;
    value: number;
    growth?: number;
    subtitle?: string;
    format: 'currency' | 'number' | 'percentage';
    color: 'green' | 'blue' | 'purple' | 'orange' | 'red';
}

const colorMap = {
    green: { bg: 'text-green-600', icon: DollarSign },
    blue: { bg: 'text-blue-600', icon: ShoppingCart },
    purple: { bg: 'text-purple-600', icon: Users },
    orange: { bg: 'text-orange-600', icon: Package },
    red: { bg: 'text-red-600', icon: TrendingUp }
};

export default function StatsCard({
                                      title,
                                      value,
                                      growth,
                                      subtitle,
                                      format,
                                      color
                                  }: StatsCardProps) {
    const { bg, icon: Icon } = colorMap[color];

    const formatValue = (val: number) => {
        switch (format) {
            case 'currency':
                return formatCurrency(val);
            case 'percentage':
                return `${val.toFixed(1)}%`;
            default:
                return val.toLocaleString();
        }
    };

    const isPositiveGrowth = growth && growth > 0;
    const GrowthIcon = isPositiveGrowth ? ArrowUpRight : ArrowDownRight;
    const growthColor = isPositiveGrowth ? 'text-green-600' : 'text-red-600';

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                        {formatValue(value)}
                    </p>

                    {growth !== undefined && (
                        <div className="flex items-center mt-1">
                            <GrowthIcon className={`w-4 h-4 ${growthColor}`} />
                            <span className={`text-sm font-medium ml-1 ${growthColor}`}>
                {Math.abs(growth).toFixed(1)}%
              </span>
                        </div>
                    )}

                    {subtitle && (
                        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
                    )}
                </div>

                <div className={`p-3 rounded-lg bg-gray-50`}>
                    <Icon className={`w-6 h-6 ${bg}`} />
                </div>
            </div>
        </div>
    );
}