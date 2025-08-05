import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { trackVaultClick } from '@/utils/analytics_utils';
export const EnhancedVaultTile = ({ title, tier, emoji, description, link, }) => {
    return (_jsxs("div", { className: "border rounded-xl p-4 shadow-sm dark:bg-gray-800", children: [_jsx("div", { className: "text-3xl mb-2", children: emoji }), _jsx("h3", { className: "text-lg font-semibold mb-1", children: title }), _jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300 mb-2", children: description }), _jsx("a", { href: link, download: true, className: "inline-block text-sm font-bold text-blue-600 hover:underline", onClick: () => trackVaultClick(title), children: "Download" }), _jsx("div", { className: `mt-2 inline-block px-2 py-1 text-xs font-semibold rounded-full ${tier === 'Free'
                    ? 'bg-green-200 text-green-800'
                    : tier === 'Premium'
                        ? 'bg-yellow-200 text-yellow-800'
                        : 'bg-purple-200 text-purple-800'}`, children: tier })] }));
};
