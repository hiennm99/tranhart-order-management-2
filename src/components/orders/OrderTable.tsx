import React from 'react';
import { Order } from '../../types';
import { OrderOverviewTable } from './OrderOverviewTable';

interface OrderTableProps {
    orders: Order[];
    title?: string;
    showActions?: boolean;
    maxRows?: number;
    onViewDetail?: (order: Order) => void;
    onEditOrder?: (order: Order) => void;
    onDeleteOrder?: (order: Order) => void;
}

export const OrderTable: React.FC<OrderTableProps> = (props) => {
    return <OrderOverviewTable {...props} />;
};