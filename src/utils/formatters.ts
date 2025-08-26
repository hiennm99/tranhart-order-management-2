export const formatCurrency = (amount: number): string => {
    return `$${amount.toLocaleString()}`;
};

export const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
};

export const formatTrend = (trend: number): string => {
    return `${Math.abs(trend)}% vs tháng trước`;
};