import React from 'react';
import { X, ExternalLink, Calendar, User, Package, Truck, DollarSign, FileText } from 'lucide-react';
import { Order } from '../../types';
import { formatPrice } from '../../utils/formatters';

interface OrderDetailModalProps {
    order: Order | null;
    isOpen: boolean;
    onClose: () => void;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
                                                                      order,
                                                                      isOpen,
                                                                      onClose
                                                                  }) => {
    if (!isOpen || !order) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                {/* Backdrop */}
                <div
                    className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                    onClick={onClose}
                />

                {/* Modal */}
                <div className="relative inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-indigo-100 rounded-lg">
                                <Package className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Chi tiết đơn hàng #{order.orderCode}
                                </h3>
                                <p className="text-sm text-gray-500">{order.customerName}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="mt-6 space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-6">
                                {/* Order Info */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h4 className="flex items-center text-sm font-medium text-gray-900 mb-3">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        Thông tin đơn hàng
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Ngày đặt:</span>
                                            <span className="font-medium">{order.orderDate}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Ship dự kiến:</span>
                                            <span className="font-medium">{order.expectedShipDate}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">SKU:</span>
                                            <span className="font-mono text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {order.sku}
                      </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Kích thước:</span>
                                            <span className="font-medium">{order.dimensions.width}×{order.dimensions.height}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Loại:</span>
                                            <span className="font-medium">{order.type}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Người vẽ:</span>
                                            <span className="font-medium">{order.artist}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Customer Info */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h4 className="flex items-center text-sm font-medium text-gray-900 mb-3">
                                        <User className="w-4 h-4 mr-2" />
                                        Thông tin khách hàng
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <span className="text-gray-500">Tên:</span>
                                            <p className="font-medium">{order.customerName}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">SĐT:</span>
                                            <p className="font-medium">{order.phoneNumber}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Địa chỉ:</span>
                                            <p className="font-medium text-gray-700">{order.address}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Product Link */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h4 className="flex items-center text-sm font-medium text-gray-900 mb-3">
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        Link sản phẩm
                                    </h4>
                                    <a
                                        href={order.productLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-600 hover:text-indigo-800 text-sm break-all underline"
                                    >
                                        {order.productLink}
                                    </a>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                {/* Financial Info */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h4 className="flex items-center text-sm font-medium text-gray-900 mb-3">
                                        <DollarSign className="w-4 h-4 mr-2" />
                                        Thông tin tài chính
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Total (USD):</span>
                                            <span className="font-bold text-gray-900">{formatPrice(order.totalUsd)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Exchange Rate:</span>
                                            <span className="font-medium">₫{order.exchangeRate.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between border-t pt-2">
                                            <span className="text-gray-500">Total (VNĐ):</span>
                                            <span className="font-bold text-green-600">₫{order.totalVnd.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Info */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h4 className="flex items-center text-sm font-medium text-gray-900 mb-3">
                                        <Truck className="w-4 h-4 mr-2" />
                                        Thông tin vận chuyển
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Ngày gửi:</span>
                                            <span className="font-medium">{order.actualShipDate || 'Chưa gửi'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Mã nội bộ:</span>
                                            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        {order.internalTrackingCode || 'N/A'}
                      </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Mã vận chuyển:</span>
                                            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        {order.carrierTrackingCode || 'N/A'}
                      </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Hãng vận chuyển:</span>
                                            <span className="font-medium">{order.shippingCarrier || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Phí ship (USD):</span>
                                            <span className="font-medium">{formatPrice(order.shippingFeeUsd)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Ship Rate:</span>
                                            <span className="font-medium">₫{order.shipExchangeRate.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between border-t pt-2">
                                            <span className="text-gray-500">Phí ship (VNĐ):</span>
                                            <span className="font-bold text-orange-600">₫{order.shippingFeeVnd.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Info */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h4 className="flex items-center text-sm font-medium text-gray-900 mb-3">
                                        <FileText className="w-4 h-4 mr-2" />
                                        Thông tin bổ sung
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Chi phí khác:</span>
                                            <span className="font-medium">₫{order.otherCosts?.toLocaleString() || '0'}</span>
                                        </div>
                                        <div className="flex justify-between border-t pt-2">
                                            <span className="text-gray-500">Lợi nhuận:</span>
                                            <span className="font-bold text-green-600">₫{order.profitVnd.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Kê khai tháng:</span>
                                            <span className="font-medium">{order.declarationMonth || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Chương trình sale:</span>
                                            <span className="font-medium text-red-600">{order.saleProgram || 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        {order.notes && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                                <h4 className="text-sm font-medium text-yellow-800 mb-2">Ghi chú:</h4>
                                <p className="text-sm text-yellow-700">{order.notes}</p>
                            </div>
                        )}

                        {/* Status */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-3">
                                <span className="text-sm font-medium text-gray-900">Trạng thái hiện tại:</span>
                                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                    order.status === 'Hoàn thành ship'
                                        ? 'bg-green-100 text-green-800'
                                        : order.status === 'Đang xử lý'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : order.status === 'Chờ ship'
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-red-100 text-red-800'
                                }`}>
                  {order.status}
                </span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                        >
                            Đóng
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors">
                            Chỉnh sửa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};