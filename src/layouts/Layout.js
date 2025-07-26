import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Sidebar from '../components/Sidebar';
export default function Layout({ children }) {
    return (_jsxs("div", { className: "min-h-screen flex bg-neutral-100 text-neutral-900", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx("header", { className: "bg-anchor-700 text-white py-4 px-6 shadow-md", children: _jsx("h1", { className: "text-xl font-bold", children: "AnchorStack" }) }), _jsx("main", { className: "flex-1 p-6", children: children }), _jsxs("footer", { className: "bg-neutral-200 text-sm text-center py-3 text-neutral-600", children: ["\u00A9 ", new Date().getFullYear(), " AnchorStack. All rights reserved."] })] })] }));
}
