import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from 'react-router-dom';
const links = [
    { label: '🏠 Dashboard', to: '/' },
    { label: '📚 My Articles', to: '/myarticles' },
    { label: '🗂️ Vault', to: '/vault' },
];
const Sidebar = () => {
    const location = useLocation();
    return (_jsxs("div", { className: "w-full md:w-64 h-full bg-gray-100 dark:bg-gray-900 p-4 sticky top-0", children: [_jsx("li", { children: _jsx("a", { href: "/articles", className: "hover:underline", children: "\uD83D\uDCDD Articles" }) }), _jsx("h2", { className: "text-xl font-bold mb-6 text-blue-600", children: "AnchorStack" }), _jsx("ul", { className: "space-y-3", children: links.map(({ label, to }) => (_jsx("li", { children: _jsx(Link, { to: to, className: `block px-3 py-2 rounded ${location.pathname === to
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-700'}`, children: label }) }, to))) })] }));
};
export default Sidebar;
