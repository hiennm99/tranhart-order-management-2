export const SIDEBAR_ITEMS = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orders', label: 'Đơn hàng' },
    { id: 'products', label: 'Sản phẩm' },
    { id: 'customers', label: 'Khách hàng' },
    { id: 'analytics', label: 'Phân tích' },
    { id: 'reports', label: 'Báo cáo' },
    { id: 'calendar', label: 'Lịch' },
    { id: 'finances', label: 'Tài chính' },
    { id: 'settings', label: 'Cài đặt' }
];

export const ORDER_STATUSES = {
    SHIPPED: 'Shipped',
    PROCESSING: 'Processing',
    PENDING: 'Pending',
    CANCELLED: 'Cancelled'
} as const;

export const DEBOUNCE_DELAY = 300;