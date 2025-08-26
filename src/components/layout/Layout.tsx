import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
    children: React.ReactNode;
    activeTab: string;
    sidebarOpen: boolean;
    selectedShop: string;
    searchTerm: string;
    onTabChange: (tab: string) => void;
    onToggleSidebar: () => void;
    onShopChange: (shop: string) => void;
    onSearchChange: (term: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({
                                                  children,
                                                  activeTab,
                                                  sidebarOpen,
                                                  selectedShop,
                                                  searchTerm,
                                                  onTabChange,
                                                  onToggleSidebar,
                                                  onShopChange,
                                                  onSearchChange
                                              }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar
                sidebarOpen={sidebarOpen}
                activeTab={activeTab}
                selectedShop={selectedShop}
                onTabChange={onTabChange}
                onShopChange={onShopChange}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header
                    activeTab={activeTab}
                    sidebarOpen={sidebarOpen}
                    searchTerm={searchTerm}
                    onToggleSidebar={onToggleSidebar}
                    onSearchChange={onSearchChange}
                />

                <main className="flex-1 overflow-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};