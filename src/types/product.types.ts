export interface Product {
    id: string;
    name: string;
    sku?: string;
    price: number;
    cost?: number;
    profit?: number;
    stock?: number;
    category?: string;
    shop: string;
    imageUrl?: string;
    isActive: boolean;
}