import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
const vaultProducts = [
    {
        id: 'clarity-core',
        title: 'The Clarity Core Bundle',
        description: 'Get to the root of clarity with this signature bundle.',
        tier: 'premium',
        url: 'https://grafixartistry6.gumroad.com/l/msenf',
        category: 'Productivity'
    },
    {
        id: 'momentum-mapping',
        title: 'Momentum Mapping Toolkit',
        description: 'Visually track and build your productivity momentum.',
        tier: 'exclusive',
        url: 'https://grafixartistry6.gumroad.com/l/npruu',
        category: 'Planning'
    }
];
const Vault = () => (_jsxs("div", { className: "p-6 sm:p-10", children: [_jsx("h1", { className: "text-3xl font-bold mb-6", children: "\uD83D\uDD10 AnchorStack Vault" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: vaultProducts.map(product => (_jsxs(Card, { className: "hover:shadow-lg transition-all", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: product.title }) }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300 mb-3", children: product.description }), _jsx("a", { href: product.url, target: "_blank", rel: "noopener noreferrer", className: "text-blue-600 hover:underline", children: "View Product \u2192" })] })] }, product.id))) })] }));
export default Vault;
