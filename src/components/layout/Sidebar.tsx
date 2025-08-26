import React from 'react';
import {
    Home, ShoppingCart, Package, Users, BarChart3, FileText,
    Calendar, CreditCard, Settings, Store
} from 'lucide-react';
import { SIDEBAR_ITEMS } from '../../utils/constants';

interface SidebarProps {
    sidebarOpen: boolean;
    activeTab: string;
    selectedShop: string;
    onTabChange: (tab: string) => void;
    onShopChange: (shop: string) => void;
}

const iconMap = {
    dashboard: Home,
    orders: ShoppingCart,
    products: Package,
    customers: Users,
    analytics: BarChart3,
    reports: FileText,
    calendar: Calendar,
    finances: CreditCard,
    settings: Settings
};

export const Sidebar: React.FC<SidebarProps> = ({
                                                    sidebarOpen,
                                                    activeTab,
                                                    selectedShop,
                                                    onTabChange,
                                                    onShopChange
                                                }) => {
    return (
        <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-xl transition-all duration-300 ease-in-out flex flex-col border-r border-gray-100`}>
            {/* Sidebar Header */}
            <div className="p-6 border-b border-gray-100 h-20 flex items-center bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                        <Store className="h-6 w-6 text-white" />
                    </div>
                    <div className={`transition-all duration-300 ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                        {sidebarOpen && (
                            <div>
                                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">ShopManager</h1>
                                <p className="text-sm text-gray-500">Pro Dashboard</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Shop Selector */}
            <div className={`transition-all duration-300 ${sidebarOpen ? 'p-4 opacity-100' : 'p-2 opacity-0'} border-b border-gray-100`}>
                {sidebarOpen && (
                    <select
                        value={selectedShop}
                        onChange={(e) => onShopChange(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                        <option value="all">🏪 Tất cả Shop</option>
                        <option value="Shop 1">🎨 Creative Shop</option>
                        <option value="Shop 2">💎 Premium Store</option>
                    </select>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-1">
                    {SIDEBAR_ITEMS.map((item) => {
                        const Icon = iconMap[item.id as keyof typeof iconMap];
                        return (
                            <li key={item.id}>
                                <button
                                    onClick={() => onTabChange(item.id)}
                                    className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                                        activeTab === item.id
                                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105'
                                            : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 hover:text-indigo-600 hover:shadow-sm hover:scale-102'
                                    }`}
                                >
                                    <Icon className={`h-5 w-5 transition-all duration-200 ${sidebarOpen ? 'mr-3' : 'mx-auto'} ${
                                        activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'
                                    }`} />
                                    <span className={`transition-all duration-300 ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                    {sidebarOpen && item.label}
                  </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};