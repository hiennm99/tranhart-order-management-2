// components/dashboard/QuickActions.tsx
import {
    Plus,
    Package,
    Users,
    FileText,
    TrendingUp,
    Settings,
    Download
} from 'lucide-react';

interface QuickAction {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    bgColor: string;
    action: () => void;
}

export default function QuickActions() {
    const actions: QuickAction[] = [
        {
            id: 'new-order',
            title: 'New Order',
            description: 'Create a manual order',
            icon: Plus,
            color: 'text-green-600',
            bgColor: 'bg-green-50 hover:bg-green-100',
            action: () => console.log('Create new order')
        },
        {
            id: 'add-product',
            title: 'Add Product',
            description: 'Add new product to inventory',
            icon: Package,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50 hover:bg-blue-100',
            action: () => console.log('Add new product')
        },
        {
            id: 'add-customer',
            title: 'Add Customer',
            description: 'Register a new customer',
            icon: Users,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50 hover:bg-purple-100',
            action: () => console.log('Add new customer')
        },
        {
            id: 'view-reports',
            title: 'View Reports',
            description: 'Check sales analytics',
            icon: TrendingUp,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50 hover:bg-orange-100',
            action: () => console.log('View reports')
        }
    ];

    const utilityActions = [
        {
            id: 'export-data',
            title: 'Export Data',
            icon: Download,
            color: 'text-gray-600'
        },
        {
            id: 'settings',
            title: 'Settings',
            icon: Settings,
            color: 'text-gray-600'
        },
        {
            id: 'generate-report',
            title: 'Generate Report',
            icon: FileText,
            color: 'text-gray-600'
        }
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                <p className="text-sm text-gray-600 mt-1">Common tasks and shortcuts</p>
            </div>

            <div className="p-6 space-y-4">
                {/* Primary Actions */}
                <div className="grid grid-cols-1 gap-3">
                    {actions.map((action) => {
                        const Icon = action.icon;
                        return (
                            <button
                                key={action.id}
                                onClick={action.action}
                                className={`w-full p-4 rounded-lg border border-transparent ${action.bgColor} transition-colors text-left`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`p-2 rounded-lg bg-white shadow-sm`}>
                                        <Icon className={`w-5 h-5 ${action.color}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-gray-900 text-sm">
                                            {action.title}
                                        </h4>
                                        <p className="text-xs text-gray-600 mt-1">
                                            {action.description}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Utilities</h4>

                    {/* Utility Actions */}
                    <div className="space-y-2">
                        {utilityActions.map((action) => {
                            const Icon = action.icon;
                            return (
                                <button
                                    key={action.id}
                                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                                >
                                    <Icon className={`w-4 h-4 ${action.color}`} />
                                    <span className="text-sm text-gray-700">{action.title}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Help Section */}
                <div className="border-t border-gray-200 pt-4">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                                <FileText className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-900">Need Help?</h4>
                                <p className="text-xs text-gray-600 mt-1">
                                    Check our documentation or contact support
                                </p>
                                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-2">
                                    Learn More →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}