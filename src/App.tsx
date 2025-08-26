// App.tsx
import React, { useState } from 'react';
import { MultiShopProvider } from './contexts/MultiShopContext';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import OrdersPage from './components/orders/OrdersPage';
import ProductsPage from './components/products/ProductsPage';
import CustomersPage from './components/customers/CustomersPage';
import AnalyticsPage from './components/analytics/AnalyticsPage';

function App() {
    const [currentView, setCurrentView] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const renderCurrentView = () => {
        switch (currentView) {
            case 'dashboard':
                return <Dashboard />;
            case 'orders':
                return <OrdersPage />;
            case 'products':
                return <ProductsPage />;
            case 'customers':
                return <CustomersPage />;
            case 'analytics':
                return <AnalyticsPage />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <MultiShopProvider>
            <div className="min-h-screen bg-gray-100 flex">
                <Sidebar
                    currentView={currentView}
                    setCurrentView={setCurrentView}
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                <div className="flex-1 flex flex-col">
                    <Header onMenuClick={() => setSidebarOpen(true)} />

                    <main className="flex-1 p-6">
                        {renderCurrentView()}
                    </main>
                </div>
            </div>
        </MultiShopProvider>
    );
}

export default App;