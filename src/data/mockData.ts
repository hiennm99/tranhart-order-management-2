// data/mockData.ts
import type { Order, Product, Customer } from '../types';

export const mockCustomers: Customer[] = [
    {
        id: 'cust-1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1-234-567-8900',
        address: '123 Main St, City, State 12345',
        totalOrders: 5,
        totalSpent: 1250.00,
        lastOrderDate: '2024-08-20'
    },
    {
        id: 'cust-2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1-234-567-8901',
        address: '456 Oak Ave, City, State 54321',
        totalOrders: 3,
        totalSpent: 850.00,
        lastOrderDate: '2024-08-22'
    },
    {
        id: 'cust-3',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        phone: '+1-234-567-8902',
        address: '789 Pine Rd, City, State 67890',
        totalOrders: 7,
        totalSpent: 2100.00,
        lastOrderDate: '2024-08-25'
    }
];

export const mockOrders: Order[] = [
    {
        id: 'ORD-001',
        shopId: 'shop-1',
        customerId: 'cust-1',
        customer: mockCustomers[0],
        items: [
            {
                id: 'item-1',
                productId: 'prod-1',
                productName: 'Handmade Ceramic Vase',
                quantity: 2,
                price: 75.00,
                total: 150.00
            }
        ],
        status: 'delivered',
        paymentStatus: 'paid',
        total: 165.50,
        subtotal: 150.00,
        tax: 12.00,
        shipping: 3.50,
        discount: 0,
        orderDate: '2024-08-20',
        shippingAddress: '123 Main St, City, State 12345',
        trackingNumber: 'TRK123456789'
    },
    {
        id: 'ORD-002',
        shopId: 'shop-2',
        customerId: 'cust-2',
        customer: mockCustomers[1],
        items: [
            {
                id: 'item-2',
                productId: 'prod-2',
                productName: 'Wireless Bluetooth Earbuds',
                quantity: 1,
                price: 99.99,
                total: 99.99
            }
        ],
        status: 'processing',
        paymentStatus: 'paid',
        total: 109.99,
        subtotal: 99.99,
        tax: 8.00,
        shipping: 2.00,
        discount: 0,
        orderDate: '2024-08-22',
        shippingAddress: '456 Oak Ave, City, State 54321'
    },
    {
        id: 'ORD-003',
        shopId: 'shop-3',
        customerId: 'cust-3',
        customer: mockCustomers[2],
        items: [
            {
                id: 'item-3',
                productId: 'prod-3',
                productName: 'Designer T-Shirt',
                variantId: 'var-1',
                variantName: 'Large, Blue',
                quantity: 3,
                price: 45.00,
                total: 135.00
            }
        ],
        status: 'pending',
        paymentStatus: 'pending',
        total: 145.00,
        subtotal: 135.00,
        tax: 10.00,
        shipping: 0,
        discount: 0,
        orderDate: '2024-08-25',
        shippingAddress: '789 Pine Rd, City, State 67890'
    },
    {
        id: 'ORD-004',
        shopId: 'shop-1',
        customerId: 'cust-2',
        customer: mockCustomers[1],
        items: [
            {
                id: 'item-4',
                productId: 'prod-4',
                productName: 'Artisan Coffee Mug',
                quantity: 4,
                price: 25.00,
                total: 100.00
            }
        ],
        status: 'shipped',
        paymentStatus: 'paid',
        total: 112.00,
        subtotal: 100.00,
        tax: 8.00,
        shipping: 4.00,
        discount: 0,
        orderDate: '2024-08-24',
        shippingAddress: '456 Oak Ave, City, State 54321',
        trackingNumber: 'TRK987654321'
    }
];

export const mockProducts: Product[] = [
    {
        id: 'prod-1',
        shopId: 'shop-1',
        name: 'Handmade Ceramic Vase',
        sku: 'ART-VASE-001',
        price: 75.00,
        costPrice: 35.00,
        stock: 25,
        category: 'Home Decor',
        status: 'active',
        images: ['vase1.jpg', 'vase2.jpg']
    },
    {
        id: 'prod-2',
        shopId: 'shop-2',
        name: 'Wireless Bluetooth Earbuds',
        sku: 'TECH-AUDIO-001',
        price: 99.99,
        costPrice: 45.00,
        stock: 150,
        category: 'Electronics',
        status: 'active',
        images: ['earbuds1.jpg', 'earbuds2.jpg']
    },
    {
        id: 'prod-3',
        shopId: 'shop-3',
        name: 'Designer T-Shirt',
        sku: 'FASH-SHIRT-001',
        price: 45.00,
        costPrice: 18.00,
        stock: 0,
        category: 'Clothing',
        status: 'out_of_stock',
        images: ['shirt1.jpg', 'shirt2.jpg'],
        variants: [
            { id: 'var-1', name: 'Large, Blue', price: 45.00, stock: 0, sku: 'FASH-SHIRT-001-L-BLUE' },
            { id: 'var-2', name: 'Medium, Red', price: 45.00, stock: 12, sku: 'FASH-SHIRT-001-M-RED' }
        ]
    },
    {
        id: 'prod-4',
        shopId: 'shop-1',
        name: 'Artisan Coffee Mug',
        sku: 'ART-MUG-001',
        price: 25.00,
        costPrice: 12.00,
        stock: 80,
        category: 'Kitchen',
        status: 'active',
        images: ['mug1.jpg', 'mug2.jpg']
    },
    {
        id: 'prod-5',
        shopId: 'shop-2',
        name: 'Smart Phone Case',
        sku: 'TECH-CASE-001',
        price: 35.00,
        costPrice: 15.00,
        stock: 200,
        category: 'Accessories',
        status: 'active',
        images: ['case1.jpg', 'case2.jpg']
    },
    {
        id: 'prod-6',
        shopId: 'shop-3',
        name: 'Summer Dress',
        sku: 'FASH-DRESS-001',
        price: 89.99,
        costPrice: 40.00,
        stock: 15,
        category: 'Clothing',
        status: 'active',
        images: ['dress1.jpg', 'dress2.jpg'],
        variants: [
            { id: 'var-3', name: 'Small, Pink', price: 89.99, stock: 5, sku: 'FASH-DRESS-001-S-PINK' },
            { id: 'var-4', name: 'Medium, Blue', price: 89.99, stock: 10, sku: 'FASH-DRESS-001-M-BLUE' }
        ]
    }
];