// hooks/useDashboardData.ts
import { useMemo } from 'react';
import { useMultiShop } from '../contexts/MultiShopContext';
import { mockOrders, mockProducts } from '../data/mockData';
import type { ShopAnalytics } from '../types';

export function useDashboardData() {
    const { activeShop, } = useMultiShop();

    const analytics: ShopAnalytics = useMemo(() => {
        const orders = activeShop
            ? mockOrders.filter(order => order.shopId === activeShop.id)
            : mockOrders;

        const products = activeShop
            ? mockProducts.filter(product => product.shopId === activeShop.id)
            : mockProducts;

        const revenue = orders.reduce((sum, order) => sum + order.total, 0);
        const customers = new Set(orders.map(order => order.customerId)).size;

        return {
            revenue,
            orders: orders.length,
            customers,
            products: products.length,
            revenueGrowth: 12.5,
            ordersGrowth: 8.3,
            avgOrderValue: orders.length > 0 ? revenue / orders.length : 0,
            conversionRate: 3.2
        };
    }, [activeShop]);

    const recentOrders = useMemo(() => {
        const orders = activeShop
            ? mockOrders.filter(order => order.shopId === activeShop.id)
            : mockOrders;

        return orders
            .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
            .slice(0, 5);
    }, [activeShop]);

    return {
        analytics,
        recentOrders
    };
}