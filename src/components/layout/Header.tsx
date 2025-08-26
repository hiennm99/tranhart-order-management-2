// components/layout/Header.tsx
import { Bell, Search, Settings, User, Menu } from 'lucide-react';
import { useMultiShop } from '../../contexts/MultiShopContext';
import ShopSelector from './ShopSelector';

interface HeaderProps {
    onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    const { activeShop, isGlobalView } = useMultiShop();

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Left side */}
                <div className="flex items-center space-x-4">
                    {/* Mobile menu button */}
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                    >
                        <Menu className="w-5 h-5 text-gray-600" />
                    </button>

                    {/* Page title */}
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">
                            {isGlobalView ? 'Global Dashboard' : activeShop?.name || 'Dashboard'}
                        </h1>
                        <p className="text-sm text-gray-500">
                            {isGlobalView
                                ? 'Overview of all your stores'
                                : activeShop?.description || 'Manage your store'
                            }
                        </p>
                    </div>
                </div>

                {/* Center - Shop Selector */}
                <div className="hidden md:block">
                    <ShopSelector />
                </div>

                {/* Right side */}
                <div className="flex items-center space-x-3">
                    {/* Search */}
                    <div className="hidden sm:block relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Quick search..."
                            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64"
                        />
                    </div>

                    {/* Notifications */}
                    <button className="relative p-2 rounded-lg hover:bg-gray-100">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
                    </button>

                    {/* Settings */}
                    <button className="p-2 rounded-lg hover:bg-gray-100">
                        <Settings className="w-5 h-5 text-gray-600" />
                    </button>

                    {/* User Profile */}
                    <div className="flex items-center space-x-3">
                        <div className="hidden sm:block text-right">
                            <p className="text-sm font-medium text-gray-900">John Doe</p>
                            <p className="text-xs text-gray-500">Store Owner</p>
                        </div>
                        <button className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Shop Selector */}
            <div className="mt-4 md:hidden">
                <ShopSelector />
            </div>
        </header>
    );
}