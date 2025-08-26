// components/products/ProductsPage.tsx
import { useState, useMemo } from 'react';
import {
    Search,
    Filter,
    Download,
    Plus,
    Eye,
    Edit,
    MoreHorizontal,
    Package,
    AlertTriangle,
    Grid3X3,
    List
} from 'lucide-react';
import { useMultiShop } from '../../contexts/MultiShopContext';
import { mockProducts } from '../../data/mockData';
import { formatCurrency, getStatusColor, calculateProfitMargin } from '../../utils/helpers';

export default function ProductsPage() {
    const { activeShop, isGlobalView } = useMultiShop();
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

    // Filter products based on current shop and search criteria
    const filteredProducts = useMemo(() => {
        let products = activeShop && !isGlobalView
            ? mockProducts.filter(product => product.shopId === activeShop.id)
            : mockProducts;

        // Apply search filter
        if (searchTerm) {
            products = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply category filter
        if (categoryFilter !== 'all') {
            products = products.filter(product => product.category === categoryFilter);
        }

        // Apply status filter
        if (statusFilter !== 'all') {
            products = products.filter(product => product.status === statusFilter);
        }

        return products;
    }, [activeShop, isGlobalView, searchTerm, categoryFilter, statusFilter]);

    // Get unique categories
    const categories = useMemo(() => {
        const allProducts = activeShop && !isGlobalView
            ? mockProducts.filter(product => product.shopId === activeShop.id)
            : mockProducts;
        return [...new Set(allProducts.map(product => product.category))];
    }, [activeShop, isGlobalView]);

    const handleSelectProduct = (productId: string) => {
        setSelectedProducts(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const handleSelectAll = () => {
        if (selectedProducts.length === filteredProducts.length) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(filteredProducts.map(product => product.id));
        }
    };

    const statusOptions = [
        { value: 'all', label: 'All Status' },
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'out_of_stock', label: 'Out of Stock' }
    ];

    const ProductCard = ({ product }: { product: typeof mockProducts[0] }) => (
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
                <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleSelectProduct(product.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex gap-1">
                    <button className="p-1 text-gray-400 hover:text-blue-600">
                        <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-green-600">
                        <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                <Package className="w-8 h-8 text-gray-400" />
            </div>

            <div className="space-y-2">
                <div className="flex items-start justify-between">
                    <h3 className="font-medium text-gray-900 text-sm">{product.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(product.status)}`}>
                        {product.status.replace('_', ' ')}
                    </span>
                </div>

                <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                <p className="text-xs text-gray-500">{product.category}</p>

                <div className="flex items-center justify-between pt-2">
                    <div>
                        <p className="font-semibold text-gray-900">{formatCurrency(product.price)}</p>
                        <p className="text-xs text-gray-500">Stock: {product.stock}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-green-600 font-medium">
                            {calculateProfitMargin(product.price, product.costPrice).toFixed(1)}% profit
                        </p>
                        {product.stock < 10 && (
                            <div className="flex items-center gap-1 text-orange-500">
                                <AlertTriangle className="w-3 h-3" />
                                <span className="text-xs">Low stock</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                    <p className="text-gray-600 mt-1">
                        Manage your product inventory
                        {!isGlobalView && activeShop && ` for ${activeShop.name}`}
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Product
                    </button>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search products by name, SKU, or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2">
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Categories</option>
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            More
                        </button>

                        {/* View Toggle */}
                        <div className="flex border border-gray-300 rounded-lg">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <Grid3X3 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Summary */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <span>
                        Showing {filteredProducts.length} of {mockProducts.length} products
                    </span>
                    {selectedProducts.length > 0 && (
                        <span className="text-blue-600">
                            {selectedProducts.length} products selected
                        </span>
                    )}
                </div>
            </div>

            {/* Products Display */}
            {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-500 mb-6">
                        {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all'
                            ? 'Try adjusting your filters to see more results.'
                            : 'Start by adding your first product to the inventory.'
                        }
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto">
                        <Plus className="w-5 h-5" />
                        Add First Product
                    </button>
                </div>
            ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="p-4 text-left">
                                    <input
                                        type="checkbox"
                                        checked={selectedProducts.length === filteredProducts.length}
                                        onChange={handleSelectAll}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                </th>
                                <th className="p-4 text-left text-sm font-medium text-gray-900">Product</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-900">Category</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-900">Price</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-900">Stock</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-900">Status</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-900">Profit</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-900">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="p-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedProducts.includes(product.id)}
                                            onChange={() => handleSelectProduct(product.id)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                <Package className="w-5 h-5 text-gray-400" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{product.name}</p>
                                                <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                                                {isGlobalView && (
                                                    <p className="text-xs text-blue-600">{product.shopId}</p>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-sm text-gray-900">{product.category}</span>
                                    </td>
                                    <td className="p-4">
                                        <p className="font-semibold text-gray-900">{formatCurrency(product.price)}</p>
                                        <p className="text-sm text-gray-500">Cost: {formatCurrency(product.costPrice)}</p>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-900">{product.stock}</span>
                                            {product.stock < 10 && (
                                                <AlertTriangle className="w-4 h-4 text-orange-500" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(product.status)}`}>
                                                {product.status.replace('_', ' ')}
                                            </span>
                                    </td>
                                    <td className="p-4">
                                            <span className="text-sm font-medium text-green-600">
                                                {calculateProfitMargin(product.price, product.costPrice).toFixed(1)}%
                                            </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
                <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredProducts.length}</span> of{' '}
                            <span className="font-medium">{filteredProducts.length}</span> results
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg border border-gray-300">
                                Previous
                            </button>
                            <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg">
                                1
                            </button>
                            <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg border border-gray-300">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}