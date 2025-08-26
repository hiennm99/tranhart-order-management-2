import React from 'react';
import { Package } from 'lucide-react';

interface ComingSoonProps {
    pageName: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ pageName }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 capitalize">{pageName}</h2>
            <p className="text-gray-600 mb-6">Tính năng {pageName} đang được phát triển và sẽ sớm có mặt!</p>
            <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow">
                Thông báo khi sẵn sàng
            </button>
        </div>
    </div>
);