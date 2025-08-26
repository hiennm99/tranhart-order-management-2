// components/dashboard/RecentOrders.tsx
import { Clock, Eye, Package, TrendingUp } from 'lucide-react';
import type { Order } from '../../types';
import { formatCurrency, formatDate, getStatusColor } from '../../utils/helpers';

interface RecentOrdersProps {
    orders: Order[];
}

export default function RecentOrders({ orders }: RecentOrdersProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                        <p className="text-sm text-gray-600 mt-1">Latest orders from your store(s)</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View All
                    </button>
                </div>
            </div>

            <div className="divide-y divide-gray-100">
                {orders.length === 0 ? (
                    <div className="p-8 text-center">
                        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h4 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h4>
                        <p className="text-gray-500">Orders will appear here once customers start placing them.</p>
                    </div>
                ) : (
                    orders.map((order) => (
                        <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h4 className="font-medium text-gray-900">#{order.id}</h4>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.paymentStatus)}`}>
                                            {order.paymentStatus}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {formatDate(order.orderDate)}
                                        </span>
                                        <span>{order.customer.name}</span>
                                        <span>{order.items.length} items</span>
                                    </div>

                                    <div className="space-y-1">
                                        {order.items.slice(0, 2).map((item) => (
                                            <p key={item.id} className="text-sm text-gray-700">
                                                {item.quantity}× {item.productName}
                                                {item.variantName && (
                                                    <span className="text-gray-500"> ({item.variantName})</span>
                                                )}
                                            </p>
                                        ))}
                                        {order.items.length > 2 && (
                                            <p className="text-sm text-gray-500">
                                                +{order.items.length - 2} more items
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="text-right ml-6">
                                    <p className="text-lg font-semibold text-gray-900 mb-1">
                                        {formatCurrency(order.total)}
                                    </p>
                                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                                        <Eye className="w-4 h-4" />
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {orders.length > 0 && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                            Showing {Math.min(orders.length, 5)} of {orders.length} recent orders
                        </span>
                        <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            Order Analytics
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}