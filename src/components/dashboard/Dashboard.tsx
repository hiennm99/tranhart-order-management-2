// components/dashboard/Dashboard.tsx
import React from 'react';
import { Plus, Globe } from 'lucide-react';
import { useMultiShop } from '../../contexts/MultiShopContext';
import StatsCard from './StatsCard';
import RecentOrders from './RecentOrders';
import QuickActions from './QuickActions';
import ShopOverview from './ShopOverview';
import { useDashboardData } from '../../hooks/useDashboardData';

export default function Dashboard() {
    const { isGlobalView, activeShop, toggleGlobalView } = useMultiShop();
    const { analytics, recentOrders } = useDashboardData();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {isGlobalView ? 'Global Dashboard' : activeShop?.name || 'Dashboard'}
                    </h1>
                    <p className="text-gray-600 mt-1">
                        {isGlobalView ? 'Overview of all your stores' : activeShop?.description || ''}
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={toggleGlobalView}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                            isGlobalView
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        <Globe className="w-4 h-4" />
                        Global View
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        New Order
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Revenue"
                    value={analytics.revenue}
                    growth={analytics.revenueGrowth}
                    format="currency"
                    color="green"
                />
                <StatsCard
                    title="Total Orders"
                    value={analytics.orders}
                    growth={analytics.ordersGrowth}
                    format="number"
                    color="blue"
                />
                <StatsCard
                    title="Total Customers"
                    value={analytics.customers}
                    subtitle={`Avg Order: $${analytics.avgOrderValue.toFixed(2)}`}
                    format="number"
                    color="purple"
                />
                <StatsCard
                    title="Total Products"
                    value={analytics.products}
                    subtitle={`Conversion: ${analytics.conversionRate}%`}
                    format="number"
                    color="orange"
                />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders */}
                <div className="lg:col-span-2">
                    <RecentOrders orders={recentOrders} />
                </div>

                {/* Sidebar Content */}
                <div className="space-y-6">
                    <QuickActions />
                    {isGlobalView && <ShopOverview />}
                </div>
            </div>
        </div>
    );
}