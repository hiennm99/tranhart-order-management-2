// components/analytics/AnalyticsPage.tsx
import { useState, useMemo } from 'react';
import {
    BarChart,
    LineChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    ShoppingCart,
    Users,
    Package,
    Download,
    Eye
} from 'lucide-react';
import { useMultiShop } from '../../contexts/MultiShopContext';
import { mockOrders, mockProducts } from '../../data/mockData';
import { formatCurrency } from '../../utils/helpers';

type TimeRange = '7d' | '30d' | '90d' | '1y';

export default function AnalyticsPage() {
    const { activeShop, isGlobalView } = useMultiShop();
    const [timeRange, setTimeRange] = useState<TimeRange>('30d');

    // Generate mock time series data
    const generateTimeSeriesData = (days: number) => {
        const data = [];
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        for (let i = 0; i < days; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);

            data.push({
                date: date.toISOString().split('T')[0],
                revenue: Math.floor(Math.random() * 5000) + 1000,
                orders: Math.floor(Math.random() * 50) + 10,
                customers: Math.floor(Math.random() * 30) + 5
            });
        }
        return data;
    };

    const analyticsData = useMemo(() => {
        const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 365;
        return generateTimeSeriesData(days);
    }, [timeRange]);

    // Calculate metrics
    const metrics = useMemo(() => {
        const orders = activeShop && !isGlobalView
            ? mockOrders.filter(order => order.shopId === activeShop.id)
            : mockOrders;

        const products = activeShop && !isGlobalView
            ? mockProducts.filter(product => product.shopId === activeShop.id)
            : mockProducts;

        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        const totalOrders = orders.length;
        const uniqueCustomers = new Set(orders.map(order => order.customerId)).size;
        const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        // Calculate growth (mock data)
        const revenueGrowth = 12.5;
        const ordersGrowth = 8.3;
        const customersGrowth = 15.2;
        const avgOrderGrowth = 3.8;

        return {
            totalRevenue,
            totalOrders,
            uniqueCustomers,
            totalProducts: products.length,
            avgOrderValue,
            revenueGrowth,
            ordersGrowth,
            customersGrowth,
            avgOrderGrowth
        };
    }, [activeShop, isGlobalView]);

    // Category breakdown data
    const categoryData = useMemo(() => {
        const products = activeShop && !isGlobalView
            ? mockProducts.filter(product => product.shopId === activeShop.id)
            : mockProducts;

        const categoryMap = new Map();
        products.forEach(product => {
            const category = product.category;
            if (categoryMap.has(category)) {
                categoryMap.set(category, categoryMap.get(category) + 1);
            } else {
                categoryMap.set(category, 1);
            }
        });

        const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#F97316'];
        return Array.from(categoryMap.entries()).map(([name, value], index) => ({
            name,
            value,
            color: colors[index % colors.length]
        }));
    }, [activeShop, isGlobalView]);

    const timeRangeOptions = [
        { value: '7d', label: 'Last 7 days' },
        { value: '30d', label: 'Last 30 days' },
        { value: '90d', label: 'Last 90 days' },
        { value: '1y', label: 'Last year' }
    ];

    const MetricCard = ({
                            title,
                            value,
                            growth,
                            icon: Icon,
                            format = 'number',
                            color = 'blue'
                        }: {
        title: string;
        value: number;
        growth: number;
        icon: React.ElementType;
        format?: 'currency' | 'number';
        color?: string;
    }) => {
        const formatValue = (val: number) => {
            if (format === 'currency') return formatCurrency(val);
            return val.toLocaleString();
        };

        const isPositive = growth > 0;
        const colorClasses = {
            blue: 'text-blue-600 bg-blue-50',
            green: 'text-green-600 bg-green-50',
            purple: 'text-purple-600 bg-purple-50',
            orange: 'text-orange-600 bg-orange-50'
        };

        return (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">{title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{formatValue(value)}</p>
                        <div className="flex items-center mt-2">
                            {isPositive ? (
                                <TrendingUp className="w-4 h-4 text-green-600" />
                            ) : (
                                <TrendingDown className="w-4 h-4 text-red-600" />
                            )}
                            <span className={`text-sm font-medium ml-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                {Math.abs(growth).toFixed(1)}%
                            </span>
                            <span className="text-sm text-gray-500 ml-1">vs last period</span>
                        </div>
                    </div>
                    <div className={`p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue}`}>
                        <Icon className="w-6 h-6" />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
                    <p className="text-gray-600 mt-1">
                        Track your business performance and insights
                        {!isGlobalView && activeShop && ` for ${activeShop.name}`}
                    </p>
                </div>
                <div className="flex gap-3">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value as TimeRange)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        {timeRangeOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Total Revenue"
                    value={metrics.totalRevenue}
                    growth={metrics.revenueGrowth}
                    icon={DollarSign}
                    format="currency"
                    color="green"
                />
                <MetricCard
                    title="Total Orders"
                    value={metrics.totalOrders}
                    growth={metrics.ordersGrowth}
                    icon={ShoppingCart}
                    color="blue"
                />
                <MetricCard
                    title="Customers"
                    value={metrics.uniqueCustomers}
                    growth={metrics.customersGrowth}
                    icon={Users}
                    color="purple"
                />
                <MetricCard
                    title="Avg Order Value"
                    value={metrics.avgOrderValue}
                    growth={metrics.avgOrderGrowth}
                    icon={TrendingUp}
                    format="currency"
                    color="orange"
                />
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Trend */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span className="text-sm text-gray-600">Revenue</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: '300px' }}>
                        <ResponsiveContainer>
                            <LineChart data={analyticsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fontSize: 12 }}
                                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                />
                                <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
                                <Tooltip
                                    formatter={(value) => [formatCurrency(value as number), 'Revenue']}
                                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#3B82F6"
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Orders Trend */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Orders & Customers</h3>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-gray-600">Orders</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                <span className="text-sm text-gray-600">Customers</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: '300px' }}>
                        <ResponsiveContainer>
                            <BarChart data={analyticsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fontSize: 12 }}
                                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip
                                    formatter={(value, name) => [value, name === 'orders' ? 'Orders' : 'Customers']}
                                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                                />
                                <Bar dataKey="orders" fill="#10B981" />
                                <Bar dataKey="customers" fill="#8B5CF6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Product Categories */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Product Categories</h3>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            View All
                        </button>
                    </div>
                    <div style={{ width: '100%', height: '250px' }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => [value, 'Products']} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-2">
                        {categoryData.map((category, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: category.color }}
                                    ></div>
                                    <span className="text-gray-700">{category.name}</span>
                                </div>
                                <span className="font-medium text-gray-900">{category.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Performance */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Performance Insights</h3>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            View Details
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Top Products */}
                        <div>
                            <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                                <Package className="w-4 h-4" />
                                Top Products
                            </h4>
                            <div className="space-y-3">
                                {mockProducts.slice(0, 3).map((product, index) => (
                                    <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                                                index === 0 ? 'bg-yellow-100 text-yellow-800' :
                                                    index === 1 ? 'bg-gray-100 text-gray-600' :
                                                        'bg-orange-100 text-orange-600'
                                            }`}>
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                                                <p className="text-xs text-gray-500">{product.stock} in stock</p>
                                            </div>
                                        </div>
                                        <p className="font-semibold text-gray-900">{formatCurrency(product.price)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div>
                            <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" />
                                Recent Activity
                            </h4>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">New order received</p>
                                        <p className="text-xs text-gray-500">Order #ORD-001 - {formatCurrency(165.50)}</p>
                                        <p className="text-xs text-gray-400">2 hours ago</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Product restocked</p>
                                        <p className="text-xs text-gray-500">Wireless Earbuds - 50 units added</p>
                                        <p className="text-xs text-gray-400">5 hours ago</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">New customer registered</p>
                                        <p className="text-xs text-gray-500">jane@example.com joined</p>
                                        <p className="text-xs text-gray-400">1 day ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales Summary */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales Summary</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                            <span className="text-gray-600">Total Sales</span>
                            <span className="font-semibold text-gray-900">{formatCurrency(metrics.totalRevenue)}</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                            <span className="text-gray-600">Average Order Value</span>
                            <span className="font-semibold text-gray-900">{formatCurrency(metrics.avgOrderValue)}</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                            <span className="text-gray-600">Total Orders</span>
                            <span className="font-semibold text-gray-900">{metrics.totalOrders}</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                            <span className="text-gray-600">Unique Customers</span>
                            <span className="font-semibold text-gray-900">{metrics.uniqueCustomers}</span>
                        </div>
                        <div className="flex items-center justify-between py-3">
                            <span className="text-gray-600">Products</span>
                            <span className="font-semibold text-gray-900">{metrics.totalProducts}</span>
                        </div>
                    </div>
                </div>

                {/* Growth Metrics */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Growth Metrics</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-green-600" />
                                <span className="text-gray-600">Revenue Growth</span>
                            </div>
                            <span className="font-semibold text-green-600">+{metrics.revenueGrowth}%</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-blue-600" />
                                <span className="text-gray-600">Orders Growth</span>
                            </div>
                            <span className="font-semibold text-blue-600">+{metrics.ordersGrowth}%</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-purple-600" />
                                <span className="text-gray-600">Customer Growth</span>
                            </div>
                            <span className="font-semibold text-purple-600">+{metrics.customersGrowth}%</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-orange-600" />
                                <span className="text-gray-600">AOV Growth</span>
                            </div>
                            <span className="font-semibold text-orange-600">+{metrics.avgOrderGrowth}%</span>
                        </div>
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg mt-4">
                            <p className="text-sm font-medium text-gray-900">Performance Status</p>
                            <p className="text-sm text-gray-600 mt-1">
                                Your business is performing well with consistent growth across all metrics.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}