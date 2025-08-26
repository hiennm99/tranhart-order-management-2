// components/dashboard/ShopOverview.tsx
import { Store, TrendingUp, TrendingDown, Eye, Settings } from 'lucide-react';
import { useMultiShop } from '../../contexts/MultiShopContext';
import { mockOrders, mockProducts } from '../../data/mockData';
import { formatCurrency } from '../../utils/helpers';

interface ShopStats {
    shopId: string;
    shopName: string;
    revenue: number;
    orders: number;
    products: number;
    revenueGrowth: number;
    status: 'active' | 'inactive';
}

export default function ShopOverview() {
    const { shops } = useMultiShop();

    // Calculate stats for each shop
    const shopStats: ShopStats[] = shops.map(shop => {
        const shopOrders = mockOrders.filter(order => order.shopId === shop.id);
        const shopProducts = mockProducts.filter(product => product.shopId === shop.id);
        const revenue = shopOrders.reduce((sum, order) => sum + order.total, 0);

        return {
            shopId: shop.id,
            shopName: shop.name,
            revenue,
            orders: shopOrders.length,
            products: shopProducts.length,
            revenueGrowth: Math.random() * 20 - 10, // Mock growth data
            status: shop.status
        };
    });

    // Sort by revenue descending
    const sortedShops = shopStats.sort((a, b) => b.revenue - a.revenue);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Shop Performance</h3>
                        <p className="text-sm text-gray-600 mt-1">Performance overview of all shops</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View Details
                    </button>
                </div>
            </div>

            <div className="p-6 space-y-4">
                {sortedShops.map((shop, index) => (
                    <div key={shop.shopId} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                                {/* Rank Badge */}
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                    index === 0 ? 'bg-yellow-100 text-yellow-800' :
                                        index === 1 ? 'bg-gray-100 text-gray-600' :
                                            index === 2 ? 'bg-orange-100 text-orange-600' :
                                                'bg-gray-50 text-gray-500'
                                }`}>
                                    {index + 1}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Store className="w-4 h-4 text-gray-600" />
                                        <h4 className="font-medium text-gray-900">{shop.shopName}</h4>
                                        <div className={`w-2 h-2 rounded-full ${
                                            shop.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                                        }`}></div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-3">
                                        <div>
                                            <p className="text-xs text-gray-500">Revenue</p>
                                            <p className="font-semibold text-gray-900">
                                                {formatCurrency(shop.revenue)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Orders</p>
                                            <p className="font-semibold text-gray-900">{shop.orders}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="flex items-center gap-1">
                                            {shop.revenueGrowth > 0 ? (
                                                <TrendingUp className="w-3 h-3 text-green-600" />
                                            ) : (
                                                <TrendingDown className="w-3 h-3 text-red-600" />
                                            )}
                                            <span className={`text-xs font-medium ${
                                                shop.revenueGrowth > 0 ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                                {Math.abs(shop.revenueGrowth).toFixed(1)}%
                                            </span>
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            {shop.products} products
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <button className="p-1 rounded hover:bg-gray-100">
                                    <Eye className="w-4 h-4 text-gray-500" />
                                </button>
                                <button className="p-1 rounded hover:bg-gray-100">
                                    <Settings className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Summary */}
                <div className="border-t border-gray-200 pt-4 mt-6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-lg font-bold text-gray-900">
                                {formatCurrency(sortedShops.reduce((sum, shop) => sum + shop.revenue, 0))}
                            </p>
                            <p className="text-xs text-gray-500">Total Revenue</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-gray-900">
                                {sortedShops.reduce((sum, shop) => sum + shop.orders, 0)}
                            </p>
                            <p className="text-xs text-gray-500">Total Orders</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-gray-900">
                                {shops.filter(shop => shop.status === 'active').length}
                            </p>
                            <p className="text-xs text-gray-500">Active Shops</p>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="pt-4">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium text-sm">
                        Create New Shop
                    </button>
                </div>
            </div>
        </div>
    );
}