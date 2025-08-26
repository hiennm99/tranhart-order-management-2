// types/index.ts

export interface Shop {
    id: string;
    name: string;
    description: string;
    logo?: string;
    status: 'active' | 'inactive';
    createdAt: string;
    settings: {
        currency: string;
        timezone: string;
        theme: string;
    };
}

export interface Product {
    id: string;
    shopId: string;
    name: string;
    sku: string;
    price: number;
    costPrice: number;
    stock: number;
    category: string;
    status: 'active' | 'inactive' | 'out_of_stock';
    images: string[];
    variants?: ProductVariant[];
}

export interface ProductVariant {
    id: string;
    name: string;
    price: number;
    stock: number;
    sku: string;
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    totalOrders: number;
    totalSpent: number;
    lastOrderDate: string;
}

export interface Order {
    id: string;
    shopId: string;
    customerId: string;
    customer: Customer;
    items: OrderItem[];
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
    total: number;
    subtotal: number;
    tax: number;
    shipping: number;
    discount: number;
    orderDate: string;
    shippingAddress: string;
    trackingNumber?: string;
    notes?: string;
}

export interface OrderItem {
    id: string;
    productId: string;
    productName: string;
    variantId?: string;
    variantName?: string;
    quantity: number;
    price: number;
    total: number;
}

export interface ShopAnalytics {
    revenue: number;
    orders: number;
    customers: number;
    products: number;
    revenueGrowth: number;
    ordersGrowth: number;
    avgOrderValue: number;
    conversionRate: number;
}

export interface MultiShopContextType {
    shops: Shop[];
    activeShop: Shop | null;
    setActiveShop: (shop: Shop | null) => void;
    isGlobalView: boolean;
    toggleGlobalView: () => void;
}

export type StatusColor = {
    [key: string]: string;
};