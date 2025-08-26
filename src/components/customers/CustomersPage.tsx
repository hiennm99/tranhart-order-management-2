// components/customers/CustomersPage.tsx
import { useState, useMemo } from 'react';
import {
    Search,
    Filter,
    Download,
    Plus,
    Eye,
    Edit,
    MoreHorizontal,
    Users,
    Mail,
    Phone,
    Calendar,
    DollarSign,
    ShoppingBag,
    Star
} from 'lucide-react';
import { useMultiShop } from '../../contexts/MultiShopContext';
import { mockCustomers, mockOrders } from '../../data/mockData';
import type { Customer } from '../../types';
import { formatCurrency, formatDate } from '../../utils/helpers';

export default function CustomersPage() {
    const { activeShop, isGlobalView } = useMultiShop();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'totalSpent' | 'totalOrders' | 'lastOrder'>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);

    // Filter customers based on current shop and search criteria
    const filteredCustomers = useMemo(() => {
        let customers = mockCustomers;

        // If not in global view, filter customers who have orders from active shop
        if (activeShop && !isGlobalView) {
            const shopOrderCustomerIds = new Set(
                mockOrders
                    .filter(order => order.shopId === activeShop.id)
                    .map(order => order.customerId)
            );
            customers = customers.filter(customer => shopOrderCustomerIds.has(customer.id));
        }

        // Apply search filter
        if (searchTerm) {
            customers = customers.filter(customer =>
                customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply sorting
        customers = [...customers].sort((a, b) => {
            let aValue: any, bValue: any;

            switch (sortBy) {
                case 'name':
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case 'totalSpent':
                    aValue = a.totalSpent;
                    bValue = b.totalSpent;
                    break;
                case 'totalOrders':
                    aValue = a.totalOrders;
                    bValue = b.totalOrders;
                    break;
                case 'lastOrder':
                    aValue = new Date(a.lastOrderDate).getTime();
                    bValue = new Date(b.lastOrderDate).getTime();
                    break;
                default:
                    return 0;
            }

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        return customers;
    }, [activeShop, isGlobalView, searchTerm, sortBy, sortOrder]);

    const handleSelectCustomer = (customerId: string) => {
        setSelectedCustomers(prev =>
            prev.includes(customerId)
                ? prev.filter(id => id !== customerId)
                : [...prev, customerId]
        );
    };

    const handleSelectAll = () => {
        if (selectedCustomers.length === filteredCustomers.length) {
            setSelectedCustomers([]);
        } else {
            setSelectedCustomers(filteredCustomers.map(customer => customer.id));
        }
    };

    const handleSort = (field: typeof sortBy) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    // Get customer statistics
    const customerStats = useMemo(() => {
        const totalCustomers = filteredCustomers.length;
        const totalSpent = filteredCustomers.reduce((sum, customer) => sum + customer.totalSpent, 0);
        const avgSpent = totalCustomers > 0 ? totalSpent / totalCustomers : 0;
        const topCustomer = filteredCustomers.reduce((top, customer) =>
                customer.totalSpent > (top?.totalSpent || 0) ? customer : top,
            null as Customer | null
        );

        return {
            totalCustomers,
            totalSpent,
            avgSpent,
            topCustomer
        };
    }, [filteredCustomers]);

    const getCustomerTier = (customer: Customer) => {
        if (customer.totalSpent >= 1000) return { tier: 'VIP', color: 'text-purple-600 bg-purple-100' };
        if (customer.totalSpent >= 500) return { tier: 'Gold', color: 'text-yellow-600 bg-yellow-100' };
        if (customer.totalSpent >= 200) return { tier: 'Silver', color: 'text-gray-600 bg-gray-100' };
        return { tier: 'Bronze', color: 'text-orange-600 bg-orange-100' };
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
                    <p className="text-gray-600 mt-1">
                        Manage your customer relationships
                        {!isGlobalView && activeShop && ` for ${activeShop.name}`}
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Customer
                    </button>
                </div>
            </div>

            {/* Customer Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Customers</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{customerStats.totalCustomers}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-50">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(customerStats.totalSpent)}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-green-50">
                            <DollarSign className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Average Spent</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(customerStats.avgSpent)}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-50">
                            <ShoppingBag className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Top Customer</p>
                            <p className="text-lg font-bold text-gray-900 mt-1">
                                {customerStats.topCustomer?.name || 'None'}
                            </p>
                            {customerStats.topCustomer && (
                                <p className="text-sm text-gray-500">
                                    {formatCurrency(customerStats.topCustomer.totalSpent)}
                                </p>
                            )}
                        </div>
                        <div className="p-3 rounded-lg bg-orange-50">
                            <Star className="w-6 h-6 text-orange-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search customers by name, email, or phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Sort Controls */}
                    <div className="flex gap-2">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="name">Sort by Name</option>
                            <option value="totalSpent">Sort by Total Spent</option>
                            <option value="totalOrders">Sort by Total Orders</option>
                            <option value="lastOrder">Sort by Last Order</option>
                        </select>

                        <button
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            {sortOrder === 'asc' ? '↑' : '↓'}
                        </button>

                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            More Filters
                        </button>
                    </div>
                </div>

                {/* Results Summary */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <span>
                        Showing {filteredCustomers.length} of {mockCustomers.length} customers
                    </span>
                    {selectedCustomers.length > 0 && (
                        <span className="text-blue-600">
                            {selectedCustomers.length} customers selected
                        </span>
                    )}
                </div>
            </div>

            {/* Customers Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {filteredCustomers.length === 0 ? (
                    <div className="p-12 text-center">
                        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No customers found</h3>
                        <p className="text-gray-500 mb-6">
                            {searchTerm
                                ? 'Try adjusting your search to see more results.'
                                : 'Customers will appear here once they start placing orders.'
                            }
                        </p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto">
                            <Plus className="w-5 h-5" />
                            Add Customer
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
                                        checked={selectedCustomers.length === filteredCustomers.length}
                                        onChange={handleSelectAll}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                </th>
                                <th className="p-4 text-left">
                                    <button
                                        onClick={() => handleSort('name')}
                                        className="text-sm font-medium text-gray-900 hover:text-blue-600 flex items-center gap-1"
                                    >
                                        Customer
                                        {sortBy === 'name' && (
                                            <span className="text-blue-600">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </button>
                                </th>
                                <th className="p-4 text-left text-sm font-medium text-gray-900">Contact</th>
                                <th className="p-4 text-left">
                                    <button
                                        onClick={() => handleSort('totalOrders')}
                                        className="text-sm font-medium text-gray-900 hover:text-blue-600 flex items-center gap-1"
                                    >
                                        Orders
                                        {sortBy === 'totalOrders' && (
                                            <span className="text-blue-600">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </button>
                                </th>
                                <th className="p-4 text-left">
                                    <button
                                        onClick={() => handleSort('totalSpent')}
                                        className="text-sm font-medium text-gray-900 hover:text-blue-600 flex items-center gap-1"
                                    >
                                        Total Spent
                                        {sortBy === 'totalSpent' && (
                                            <span className="text-blue-600">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </button>
                                </th>
                                <th className="p-4 text-left">
                                    <button
                                        onClick={() => handleSort('lastOrder')}
                                        className="text-sm font-medium text-gray-900 hover:text-blue-600 flex items-center gap-1"
                                    >
                                        Last Order
                                        {sortBy === 'lastOrder' && (
                                            <span className="text-blue-600">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </button>
                                </th>
                                <th className="p-4 text-left text-sm font-medium text-gray-900">Tier</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-900">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {filteredCustomers.map((customer) => {
                                const tier = getCustomerTier(customer);
                                return (
                                    <tr key={customer.id} className="hover:bg-gray-50">
                                        <td className="p-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedCustomers.includes(customer.id)}
                                                onChange={() => handleSelectCustomer(customer.id)}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <span className="text-sm font-medium text-blue-600">
                                                            {customer.name.charAt(0).toUpperCase()}
                                                        </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{customer.name}</p>
                                                    <p className="text-sm text-gray-500">ID: {customer.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Mail className="w-4 h-4" />
                                                    <span>{customer.email}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Phone className="w-4 h-4" />
                                                    <span>{customer.phone}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className="font-semibold text-gray-900">{customer.totalOrders}</p>
                                            <p className="text-sm text-gray-500">orders</p>
                                        </td>
                                        <td className="p-4">
                                            <p className="font-semibold text-gray-900">{formatCurrency(customer.totalSpent)}</p>
                                            <p className="text-sm text-gray-500">
                                                Avg: {formatCurrency(customer.totalSpent / customer.totalOrders)}
                                            </p>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-900">{formatDate(customer.lastOrderDate)}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${tier.color}`}>
                                                    {tier.tier}
                                                </span>
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
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {filteredCustomers.length > 0 && (
                <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredCustomers.length}</span> of{' '}
                            <span className="font-medium">{filteredCustomers.length}</span> results
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