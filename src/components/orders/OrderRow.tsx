import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Order } from '../../types';
import { formatPrice } from '../../utils/formatters';

interface OrderRowProps {
    order: Order;
    onView?: (order: Order) => void;
    onEdit?: (order: Order) => void;
    onDelete?: (order: Order) => void;
}

export const OrderRow: React.FC<OrderRowProps> = ({
                                                      order,
                                                      onView,
                                                      onEdit,
                                                      onDelete
                                                  }) => (
    <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
            {order.date}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {order.customer}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
      <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
        {order.tracking}
      </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
            {formatPrice(order.price)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
            {formatPrice(order.profit)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
          order.status === 'Shipped'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
      }`}>
        {order.status}
      </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
      <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
        {order.shop}
      </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div className="flex items-center space-x-2 justify-end">
                <button
                    onClick={() => onView?.(order)}
                    className="p-1 text-indigo-600 hover:bg-indigo-100 rounded"
                >
                    <Eye className="h-4 w-4" />
                </button>
                <button
                    onClick={() => onEdit?.(order)}
                    className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                >
                    <Edit className="h-4 w-4" />
                </button>
                <button
                    onClick={() => onDelete?.(order)}
                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
        </td>
    </tr>
);