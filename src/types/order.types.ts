export interface Order {
    id: number;
    orderDate: string; // Ngày đặt đơn
    orderCode: string; // Mã đơn hàng
    productImage?: string; // Hình sản phẩm
    sku: string; // SKU của sản phẩm
    dimensions: {
        width: number; // Ngang
        height: number; // Dọc
    }; // Kích thước
    type: string; // Loại (Cuộn, Canvas, v.v.)
    customerName: string; // Tên khách hàng
    status: 'Hoàn thành ship' | 'Đang xử lý' | 'Chờ ship' | 'Đã hủy'; // Trạng thái đơn
    subtotalUsd: number; // Subtotal (USD)
    subtotalVnd: number; // Subtotal (VNĐ)

    // Chi tiết (chỉ hiển thị khi xem detail)
    expectedShipDate: string; // Ngày vận chuyển (dự kiến)
    productLink: string; // Link sản phẩm
    artist: string; // Người vẽ
    phoneNumber: string; // Số điện thoại khách hàng
    address: string; // Địa chỉ khách hàng
    notes?: string; // Ghi chú
    totalUsd: number; // Total (USD)
    exchangeRate: number; // Exchange Rate (default 25000)
    totalVnd: number; // Total (VND) = Total*Exchange Rate
    actualShipDate?: string; // Ngày gửi hàng
    internalTrackingCode?: string; // Mã vận (nội bộ)
    carrierTrackingCode?: string; // Mã vận chuyển
    shippingCarrier?: string; // Hãng vận chuyển
    shippingFeeUsd: number; // Giá vận chuyển (USD)
    shipExchangeRate: number; // Ship Exchange Rate (default 25000)
    shippingFeeVnd: number; // Giá vận chuyển (VNĐ)
    otherCosts?: number; // Chi phí khác
    profitVnd: number; // Lợi nhuận (VNĐ)
    declarationMonth?: string; // Bảng kê khai tháng
    saleProgram?: string; // Chương trình sale
}

export interface OrderOverview {
    id: number;
    orderDate: string;
    orderCode: string;
    productImage?: string;
    sku: string;
    dimensions: string; // "102x152"
    type: string;
    customerName: string;
    status: string;
    subtotalUsd: number;
    subtotalVnd: number;
}

export interface OrderStats {
    totalOrders: number;
    totalRevenue: number;
    totalProfit: number;
    averageOrderValue: number;
    totalShippingFee: number;
    totalOtherCosts: number;
}

export interface OrderFilters {
    searchTerm: string;
    status?: string;
    artist?: string;
    saleProgram?: string;
    dateRange?: {
        from: Date;
        to: Date;
    };
}