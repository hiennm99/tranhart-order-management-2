// contexts/MultiShopContext.tsx
import { createContext, useContext, useState } from 'react';
import type {ReactNode} from "react";
import type { Shop, MultiShopContextType } from '../types';

const MultiShopContext = createContext<MultiShopContextType | null>(null);

// Sample shops data
const sampleShops: Shop[] = [
    {
        id: 'shop-1',
        name: 'ArtisanCraft Store',
        description: 'Handmade crafts and artwork',
        status: 'active',
        createdAt: '2024-01-15',
        settings: { currency: 'USD', timezone: 'UTC+7', theme: 'blue' }
    },
    {
        id: 'shop-2',
        name: 'TechGadgets Hub',
        description: 'Latest technology and gadgets',
        status: 'active',
        createdAt: '2024-02-01',
        settings: { currency: 'USD', timezone: 'UTC+7', theme: 'green' }
    },
    {
        id: 'shop-3',
        name: 'Fashion Trends',
        description: 'Trendy clothes and accessories',
        status: 'active',
        createdAt: '2024-01-20',
        settings: { currency: 'USD', timezone: 'UTC+7', theme: 'purple' }
    }
];

interface MultiShopProviderProps {
    children: ReactNode;
}

export function MultiShopProvider({ children }: MultiShopProviderProps) {
    const [activeShop, setActiveShop] = useState<Shop | null>(null);
    const [isGlobalView, setIsGlobalView] = useState(true);

    const toggleGlobalView = () => {
        setIsGlobalView(!isGlobalView);
        if (!isGlobalView) {
            setActiveShop(null);
        }
    };

    const contextValue: MultiShopContextType = {
        shops: sampleShops,
        activeShop,
        setActiveShop,
        isGlobalView,
        toggleGlobalView
    };

    return (
        <MultiShopContext.Provider value={contextValue}>
            {children}
        </MultiShopContext.Provider>
    );
}

export function useMultiShop() {
    const context = useContext(MultiShopContext);
    if (!context) {
        throw new Error('useMultiShop must be used within a MultiShopProvider');
    }
    return context;
}