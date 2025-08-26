import React from 'react';
import { Order } from '../../types';
import { OrderOverviewRow } from './OrderOverviewRow';

interface OrderOverviewTableProps {
    orders: Order[];
    title?: string;
    showActions?: boolean;
    maxRows?: number;
    onViewDetail?: (order: Order) => void;
    onEditOrder?: (order: Order) => void;
    onDeleteOrder?: (order: Order) => void;
}

export const OrderOverviewTable: React.FC<OrderOverviewTableProps> = ({
                                                                          orders,
                                                                          title,
                                                                          showActions = true,
                                                                          maxRows,
                                                                          onViewDetail,
                                                                          onEditOrder,
                                                                          onDeleteOrder
                                                                      }) => {
    const displayOrders = maxRows ? orders.slice(0, maxRows) : orders;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            {title && (
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {title} ({orders.length})
                    </h2>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ngày đặt đơn
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Mã đơn hàng
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Hình
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            SKU
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kích thước
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Loại
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tên khách hàng
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Trạng thái
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Subtotal (USD)
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Subtotal (VNĐ)
                        </th>
                        {showActions && (
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Thao tác
                            </th>
                        )}
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {displayOrders.map((order) => (
                        <OrderOverviewRow
                            key={order.id}
                            order={order}
                            onViewDetail={onViewDetail}
                            onEdit={onEditOrder}
                            onDelete={onDeleteOrder}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};