import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Anchor, Clock, FileText, Home } from 'lucide-react';
const Header = () => {
    return (_jsxs("header", { className: "bg-white shadow p-4 rounded-xl mb-6 flex justify-between items-center", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "\u2693 AnchorStack" }), _jsxs("nav", { className: "flex space-x-4 text-sm text-gray-700", children: [_jsxs("a", { href: "#dashboard", className: "hover:underline flex items-center", children: [_jsx(Home, { className: "w-4 h-4 mr-1" }), "Dashboard"] }), _jsxs("a", { href: "#focus", className: "hover:underline flex items-center", children: [_jsx(Clock, { className: "w-4 h-4 mr-1" }), "Focus"] }), _jsxs("a", { href: "#notes", className: "hover:underline flex items-center", children: [_jsx(FileText, { className: "w-4 h-4 mr-1" }), "Notes"] }), _jsxs("a", { href: "#vault", className: "hover:underline flex items-center", children: [_jsx(Anchor, { className: "w-4 h-4 mr-1" }), "Vault"] })] })] }));
};
export { Header };
