import React, { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { Order } from '../../types';
import {OrderOverviewTable} from "../../components/orders/OrderOverviewRow";
import { Button } from '../../components/ui/Button';

interface OrdersPageProps {
    filteredOrders: Order[];
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

export const OrdersPage: React.FC<OrdersPageProps> = ({
                                                          filteredOrders,
                                                          searchTerm,
                                                          onSearchChange
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
            {/* Filter Bar */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo tên khách hàng, mã đơn hàng, SKU..."
                                value={searchTerm}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="secondary" icon={Filter}>
                            Lọc
                        </Button>
                        <Button variant="primary" icon={Download} className="bg-green-600 hover:bg-green-700 focus:ring-green-500">
                            Xuất Excel
                        </Button>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <OrderOverviewTable
                orders={filteredOrders}
                title={`Tất cả đơn hàng`}
                showActions={true}
                onViewDetail={handleViewDetail}
                onEditOrder={(order) => console.log('Edit order:', order)}
                onDeleteOrder={(order) => console.log('Delete order:', order)}
            />

            {/* Order Detail Modal */}
            <OrderDetailModal
                order={selectedOrder}
                isOpen={isDetailModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
};