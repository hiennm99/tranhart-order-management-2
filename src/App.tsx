import React, { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { DashboardPage } from './pages/Dashboard';
import { OrdersPage } from './pages/Orders';
import { ComingSoon } from './components/common/ComingSoon';
import { useOrders } from './hooks/useOrders';
import { useStats } from './hooks/useStats';
import { useSidebar } from './hooks/useSidebar';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const { sidebarOpen, toggleSidebar } = useSidebar();

    const {
        orders,
        filteredOrders,
        searchTerm,
        setSearchTerm,
        selectedShop,
        setSelectedShop
    } = useOrders();

    const stats = useStats(orders, selectedShop);

    const renderActivePage = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <DashboardPage
                        orders={orders}
                        filteredOrders={filteredOrders}
                        selectedShop={selectedShop}
                        stats={stats}
                    />
                );
            case 'orders':
                return (
                    <OrdersPage
                        filteredOrders={filteredOrders}
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                    />
                );
            default:
                return <ComingSoon pageName={activeTab} />;
        }
    };

    return (
        <Layout
            activeTab={activeTab}
            sidebarOpen={sidebarOpen}
            selectedShop={selectedShop}
            searchTerm={searchTerm}
            onTabChange={setActiveTab}
            onToggleSidebar={toggleSidebar}
            onShopChange={setSelectedShop}
            onSearchChange={setSearchTerm}
        >
            {renderActivePage()}
        </Layout>
    );
};

export default App;