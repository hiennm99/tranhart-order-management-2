import React, { useState } from 'react';
import { ShoppingCart, DollarSign, TrendingUp, Package, Store } from 'lucide-react';
import { Order, OrderStats } from '../../types';
import { StatCard } from '../../components/ui/StatCard';
import { OrderTable } from '../../components/orders/OrderTable';
import { OrderDetailModal } from '../../components/orders/OrderDetailModal';
import { formatCurrency } from '../../utils/formatters';

interface DashboardPageProps {
    orders: Order[];
    filteredOrders: Order[];
    selectedShop: string;
    stats: OrderStats;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
                                                                orders,
                                                                filteredOrders,
                                                                selectedShop,
                                                                stats
                                                            }) => {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const handleViewDetail = (order: Order) => {
        setSelectedOrder(order);
        setIsDetailModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsDetailModalOpen(false);
        setSelectedOrder(null);
    };

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Tổng đơn hàng"
                    value={stats.totalOrders.toString()}
                    icon={ShoppingCart}
                    color="text-blue-600"
                    trend={12}
                />
                <StatCard
                    title="Doanh thu"
                    value={`₫${stats.totalRevenue.toLocaleString()}`}
                    icon={DollarSign}
                    color="text-green-600"
                    trend={8}
                />
                <StatCard
                    title="Lợi nhuận"
                    value={`₫${stats.totalProfit.toLocaleString()}`}
                    icon={TrendingUp}
                    color="text-purple-600"
                    trend={15}
                />
                <StatCard
                    title="Giá trị TB/đơn"
                    value={`₫${Math.round(stats.averageOrderValue).toLocaleString()}`}
                    icon={Package}
                    color="text-orange-600"
                    trend={-3}
                />
            </div>

            {/* Shop Info Banner */}
            {selectedShop !== 'all' && (
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-4 flex items-center space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                        <Store className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-indigo-900">
                            Đang xem thống kê cho: <span className="font-bold">{selectedShop}</span>
                        </p>
                        <p className="text-xs text-indigo-600">
                            {stats.totalOrders} đơn hàng • ₫{stats.totalRevenue.toLocaleString()} doanh thu
                        </p>
                    </div>
                </div>
            )}

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Đơn hàng gần đây</h2>
                        <p className="text-sm text-gray-500">Theo dõi và quản lý đơn hàng mới nhất</p>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                        Xem tất cả →
                    </button>
                </div>

                <OrderTable
                    orders={filteredOrders}
                    maxRows={5}
                    showActions={true}
                    onViewDetail={handleViewDetail}
                    onEditOrder={(order) => console.log('Edit order:', order)}
                    onDeleteOrder={(order) => console.log('Delete order:', order)}
                />
            </div>

            {/* Order Detail Modal */}
            <OrderDetailModal
                order={selectedOrder}
                isOpen={isDetailModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
};