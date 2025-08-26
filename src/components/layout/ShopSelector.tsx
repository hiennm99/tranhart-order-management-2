// components/layout/ShopSelector.tsx
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe, Store, Check } from 'lucide-react';
import { useMultiShop } from '../../contexts/MultiShopContext';
import type { Shop } from "../../types";

export default function ShopSelector() {
    const { shops, activeShop, setActiveShop, isGlobalView, toggleGlobalView } = useMultiShop();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelectShop = (shop: Shop | null, isGlobal: boolean = false) => {
        if (isGlobal) {
            toggleGlobalView();
        } else {
            setActiveShop(shop);
            if (isGlobalView) {
                toggleGlobalView();
            }
        }
        setIsOpen(false);
    };

    const currentSelection = isGlobalView
        ? { name: 'Global Overview', description: 'All stores' }
        : activeShop
            ? { name: activeShop.name, description: activeShop.description }
            : { name: 'Select Shop', description: 'Choose a store' };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-3 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-64"
            >
                <div className="flex items-center space-x-2">
                    {isGlobalView ? (
                        <Globe className="w-5 h-5 text-blue-600" />
                    ) : (
                        <Store className="w-5 h-5 text-gray-600" />
                    )}
                    <div className="text-left">
                        <p className="text-sm font-medium text-gray-900">{currentSelection.name}</p>
                        <p className="text-xs text-gray-500">{currentSelection.description}</p>
                    </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                    {/* Global View Option */}
                    <button
                        onClick={() => handleSelectShop(null, true)}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between ${
                            isGlobalView ? 'bg-blue-50 border-r-2 border-blue-600' : ''
                        }`}
                    >
                        <div className="flex items-center space-x-3">
                            <Globe className="w-5 h-5 text-blue-600" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">Global Overview</p>
                                <p className="text-xs text-gray-500">View all stores</p>
                            </div>
                        </div>
                        {isGlobalView && <Check className="w-4 h-4 text-blue-600" />}
                    </button>

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-1"></div>

                    {/* Individual Shops */}
                    {shops.map((shop) => (
                        <button
                            key={shop.id}
                            onClick={() => handleSelectShop(shop)}
                            className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between ${
                                !isGlobalView && activeShop?.id === shop.id ? 'bg-blue-50 border-r-2 border-blue-600' : ''
                            }`}
                        >
                            <div className="flex items-center space-x-3">
                                <Store className="w-5 h-5 text-gray-600" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{shop.name}</p>
                                    <p className="text-xs text-gray-500">{shop.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                {/* Status indicator */}
                                <div className={`w-2 h-2 rounded-full ${
                                    shop.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                                }`}></div>
                                {!isGlobalView && activeShop?.id === shop.id && (
                                    <Check className="w-4 h-4 text-blue-600" />
                                )}
                            </div>
                        </button>
                    ))}

                    {/* Add New Shop Option */}
                    <div className="border-t border-gray-100 my-1"></div>
                    <button className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 text-blue-600">
                        <div className="w-5 h-5 border border-dashed border-blue-300 rounded flex items-center justify-center">
                            <span className="text-xs font-bold">+</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Add New Shop</p>
                            <p className="text-xs text-gray-500">Create another store</p>
                        </div>
                    </button>
                </div>
            )}
        </div>
    );
}