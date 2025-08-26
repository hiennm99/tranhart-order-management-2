// utils/helpers.ts
import { StatusColor } from '../types';

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

export const formatDate = (date: string): string => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(new Date(date));
};

export const getStatusColor = (status: string): string => {
    const statusColors: StatusColor = {
        // Order & Payment statuses
        pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        processing: 'bg-blue-100 text-blue-800 border-blue-200',
        shipped: 'bg-purple-100 text-purple-800 border-purple-200',
        delivered: 'bg-green-100 text-green-800 border-green-200',
        cancelled: 'bg-red-100 text-red-800 border-red-200',
        refunded: 'bg-gray-100 text-gray-800 border-gray-200',
        paid: 'bg-green-100 text-green-800 border-green-200',
        failed: 'bg-red-100 text-red-800 border-red-200',

        // Product & Shop statuses
        active: 'bg-green-100 text-green-800 border-green-200',
        inactive: 'bg-gray-100 text-gray-800 border-gray-200',
        out_of_stock: 'bg-red-100 text-red-800 border-red-200'
    };

    return statusColors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
};

export const calculateProfitMargin = (price: number, costPrice: number): number => {
    if (price <= 0) return 0;
    return ((price - costPrice) / price) * 100;
};

export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

export const generateId = (): string => {
    return Math.random().toString(36).substr(2, 9);
};

export const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};