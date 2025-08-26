// components/orders/OrdersPage.tsx
import { useState, useMemo } from 'react';
import {
    Search,
    Filter,
    Download,
    Plus,
    Eye,
    Edit,
    MoreHorizontal,
    Package,
    Calendar,
    User
} from 'lucide-react';
import { useMultiShop } from '../../contexts/MultiShopContext';
import { mockOrders } from '../../data/mockData';
import { formatCurrency, formatDate, getStatusColor } from '../../utils/helpers';

export default function OrdersPage() {
    const { activeShop, isGlobalView } = useMultiShop();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [paymentFilter, setPaymentFilter] = useState('all');
    const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

    // Filter orders based on current shop and search criteria
    const filteredOrders = useMemo(() => {
        let orders = activeShop && !isGlobalView
            ? mockOrders.filter(order => order.shopId === activeShop.id)
            : mockOrders;

        // Apply search filter
        if (searchTerm) {
            orders = orders.filter(order =>
                order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply status filters
        if (statusFilter !== 'all') {
            orders = orders.filter(order => order.status === statusFilter);
        }

        if (paymentFilter !== 'all') {
            orders = orders.filter(order => order.paymentStatus === paymentFilter);
        }

        return orders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
    }, [activeShop, isGlobalView, searchTerm, statusFilter, paymentFilter]);

    const handleSelectOrder = (orderId: string) => {
        setSelectedOrders(prev =>
            prev.includes(orderId)
                ? prev.filter(id => id !== orderId)
                : [...prev, orderId]
        );
    };

    const handleSelectAll = () => {
        if (selectedOrders.length === filteredOrders.length) {
            setSelectedOrders([]);
        } else {
            setSelectedOrders(filteredOrders.map(order => order.id));
        }
    };

    const statusOptions = [
        { value: 'all', label: 'All Status' },
        { value: 'pending', label: 'Pending' },
        { value: 'processing', label: 'Processing' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'delivered', label: 'Delivered' },
        { value: 'cancelled', label: 'Cancelled' },
        { value: 'refunded', label: 'Refunded' }
    ];

    const paymentOptions = [
        { value: 'all', label: 'All Payments' },
        { value: 'pending', label: 'Pending' },
        { value: 'paid', label: 'Paid' },
        { value: 'failed', label: 'Failed' },
        { value: 'refunded', label: 'Refunded' }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
                    <p className="text-gray-600 mt-1">
                        Manage and track all your orders
                        {!isGlobalView && activeShop && ` from ${activeShop.name}`}
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        New Order
                    </button>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search orders by ID, customer name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="flex gap-2">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        <select
                            value={paymentFilter}
                            onChange={(e) => setPaymentFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {paymentOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            More Filters
                        </button>
                    </div>
                </div>

                {/* Results Summary */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <span>
                        Showing {filteredOrders.length} of {mockOrders.length} orders
                    </span>
                    {selectedOrders.length > 0 && (
                        <span className="text-blue-600">
                            {selectedOrders.length} orders selected
                        </span>
                    )}
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {filteredOrders.length === 0 ? (
                    <div className="p-12 text-center">
                        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No orders found</h3>
                        <p className="text-gray-500 mb-6">
                            {searchTerm || statusFilter !== 'all' || paymentFilter !== 'all'
                                ? 'Try adjusting your filters to see more results.'
                                : 'Orders will appear here once customers start placing them.'
                            }
                        </p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto">
                            <Plus className="w-5 h-5" />
                            Create New Order
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="p-4 text-left">
                                    <input
                                        type="checkbox"
                                        checked={selectedOrders.length === filteredOrders.length}
                                        onChange={handleSelectAll}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                </th>
                                <th className="p-4 text-left text-sm font-medium text-gray-900">Order</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-900">Customer</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-900">Date</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-900">Status</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-900">Payment</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-900">Total</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-900">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="p-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedOrders.includes(order.id)}
                                            onChange={() => handleSelectOrder(order.id)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <Package className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">#{order.id}</p>
                                                <p className="text-sm text-gray-500">{order.items.length} items</p>
                                                {isGlobalView && (
                                                    <p className="text-xs text-blue-600">{order.shopId}</p>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                                <User className="w-4 h-4 text-gray-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{order.customer.name}</p>
                                                <p className="text-sm text-gray-500">{order.customer.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm text-gray-900">{formatDate(order.orderDate)}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                    </td>
                                    <td className="p-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.paymentStatus)}`}>
                                                {order.paymentStatus}
                                            </span>
                                    </td>
                                    <td className="p-4">
                                        <p className="font-semibold text-gray-900">{formatCurrency(order.total)}</p>
                                        <p className="text-sm text-gray-500">{order.items.length} items</p>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {filteredOrders.length > 0 && (
                <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredOrders.length}</span> of{' '}
                            <span className="font-medium">{filteredOrders.length}</span> results
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg border border-gray-300">
                                Previous
                            </button>
                            <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg">
                                1
                            </button>
                            <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg border border-gray-300">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}