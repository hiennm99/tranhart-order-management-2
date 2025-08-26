import { useState, useMemo } from 'react';
import { Order } from '../types';
import { sampleOrders } from '../data/sampleOrders';
import { filterOrdersBySearch, filterOrdersByShop } from '../utils/helpers';
import { useDebounce } from './useDebounce';

export const useOrders = () => {
    const [orders] = useState<Order[]>(sampleOrders);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedShop, setSelectedShop] = useState('all');

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const filteredOrders = useMemo(() => {
        let filtered = filterOrdersByShop(orders, selectedShop);
        filtered = filterOrdersBySearch(filtered, debouncedSearchTerm);
        return filtered;
    }, [orders, selectedShop, debouncedSearchTerm]);

    return {
        orders,
        filteredOrders,
        searchTerm,
        setSearchTerm,
        selectedShop,
        setSelectedShop
    };
};