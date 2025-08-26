export interface Shop {
    id: string;
    name: string;
    displayName: string;
    icon?: string;
    isActive: boolean;
    totalOrders?: number;
    totalRevenue?: number;
}

export type SelectedShop = 'all' | string;