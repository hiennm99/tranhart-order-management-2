// components/layout/Sidebar.tsx
import React from 'react';
import {
    BarChart3,
    ShoppingCart,
    Package,
    Users,
    TrendingUp,
    Settings,
    X
} from 'lucide-react';

interface SidebarProps {
    currentView: string;
    setCurrentView: (view: string) => void;
    isOpen: boolean;
    onClose: () => void;
}

const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
];

export default function Sidebar({ currentView, setCurrentView, isOpen, onClose }: SidebarProps) {
    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:shadow-none lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Multi-Shop</h1>
                            <p className="text-sm text-gray-600 mt-1">E-commerce Manager</p>
                        </div>
                        {/* Mobile close button */}
                        <button
                            onClick={onClose}
                            className="lg:hidden p-1 rounded-lg hover:bg-gray-100"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="p-6">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                        Navigation
                    </p>
                    <div className="space-y-1">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentView === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setCurrentView(item.id);
                                        onClose(); // Close mobile sidebar after selection
                                    }}
                                    className={`
                    w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 transition-colors
                    ${isActive
                                        ? 'bg-blue-50 text-blue-700 border border-blue-200 font-medium'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }
                  `}
                                >
                                    <Icon className="w-4 h-4" />
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>
                </nav>

                {/* Settings */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
                    <button className="w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                        <Settings className="w-4 h-4" />
                        Settings
                    </button>
                </div>
            </div>
        </>
    );
}