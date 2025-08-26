import React from 'react';
import { Menu, Search, Bell, Plus, User } from 'lucide-react';

interface HeaderProps {
    activeTab: string;
    sidebarOpen: boolean;
    searchTerm: string;
    onToggleSidebar: () => void;
    onSearchChange: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
                                                  activeTab,
                                                  // sidebarOpen,
                                                  searchTerm,
                                                  onToggleSidebar,
                                                  onSearchChange
                                              }) => {
    const getPageTitle = () => {
        const titles = {
            dashboard: 'Dashboard',
            orders: 'Đơn hàng',
            products: 'Sản phẩm',
            customers: 'Khách hàng',
            analytics: 'Phân tích',
            reports: 'Báo cáo',
            calendar: 'Lịch',
            finances: 'Tài chính',
            settings: 'Cài đặt'
        };
        return titles[activeTab as keyof typeof titles] || activeTab;
    };

    const getPageSubtitle = () => {
        const subtitles = {
            dashboard: 'Chào mừng trở lại! 👋',
            orders: 'Quản lý và theo dõi đơn hàng',
            products: 'Quản lý danh mục sản phẩm',
            customers: 'Quản lý thông tin khách hàng'
        };
        return subtitles[activeTab as keyof typeof subtitles] || 'Chào mừng trở lại! 👋';
    };

    return (
        <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-100 px-6 h-20">
            <div className="flex items-center justify-between h-full">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onToggleSidebar}
                        className="p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 transition-all duration-200 flex-shrink-0 group"
                    >
                        <Menu className="h-5 w-5 text-gray-600 group-hover:text-indigo-600 transition-colors duration-200" />
                    </button>
                    <div className="flex flex-col justify-center">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-none">
                            {getPageTitle()}
                        </h1>
                        <p className="text-sm text-gray-500 leading-none mt-0.5">
                            {getPageSubtitle()}
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 transition-colors duration-200" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pl-10 pr-4 py-2.5 w-80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/50 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md"
                        />
                    </div>

                    {/* Quick Actions */}
                    <button className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 rounded-xl relative transition-all duration-200 group">
                        <Bell className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                        <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                    </button>

                    <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2.5 rounded-xl flex items-center hover:shadow-lg hover:scale-105 transition-all duration-200">
                        <Plus className="h-4 w-4 mr-2" />
                        Thêm mới
                    </button>

                    {/* Profile */}
                    <div className="flex items-center space-x-2 p-2 hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 rounded-xl cursor-pointer transition-all duration-200 group">
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                            <User className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors duration-200">Admin</span>
                    </div>
                </div>
            </div>
        </header>
    );
};