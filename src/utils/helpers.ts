import { Order, OrderStats } from '../types';

export const filterOrdersBySearch = (orders: Order[], searchTerm: string): Order[] => {
    if (!searchTerm) return orders;

    return orders.filter(order =>
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.internalTrackingCode && order.internalTrackingCode.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (order.carrierTrackingCode && order.carrierTrackingCode.toLowerCase().includes(searchTerm.toLowerCase()))
    );
};

export const filterOrdersByShop = (orders: Order[], selectedShop: string): Order[] => {
    if (selectedShop === 'all') return orders;
    // Tạm thời return tất cả vì chưa có trường shop trong Order mới
    // Có thể filter theo artist hoặc thêm trường shop sau
    return orders.filter(order => order.artist === selectedShop);
};

export const calculateStats = (orders: Order[]): OrderStats => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalVnd, 0);
    const totalProfit = orders.reduce((sum, order) => sum + order.profitVnd, 0);
    const totalShippingFee = orders.reduce((sum, order) => sum + order.shippingFeeVnd, 0);
    const totalOtherCosts = orders.reduce((sum, order) => sum + (order.otherCosts || 0), 0);
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    return {
        totalOrders,
        totalRevenue,
        totalProfit,
        averageOrderValue,
        totalShippingFee,
        totalOtherCosts
    };
};