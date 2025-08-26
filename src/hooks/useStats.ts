import { useMemo } from 'react';
import { Order, OrderStats } from '../types';
import { calculateStats, filterOrdersByShop } from '../utils/helpers';

export const useStats = (orders: Order[], selectedShop: string): OrderStats => {
    const stats = useMemo(() => {
        const shopOrders = filterOrdersByShop(orders, selectedShop);
        return calculateStats(shopOrders);
    }, [orders, selectedShop]);

    return stats;
};