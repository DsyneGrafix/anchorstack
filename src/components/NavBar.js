import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
const NavBar = () => {
    return (_jsx("nav", { className: "bg-[#3B82A7] text-white px-6 py-3 shadow-md rounded-b-2xl", children: _jsxs("div", { className: "max-w-5xl mx-auto flex justify-between items-center", children: [_jsx("h1", { className: "text-xl font-bold", children: "\u2693 AnchorStack" }), _jsxs("div", { className: "space-x-6 text-sm font-medium", children: [_jsx(Link, { to: "/", className: "hover:underline", children: "Dashboard" }), _jsx(Link, { to: "/focus", className: "hover:underline", children: "Focus" }), _jsx(Link, { to: "/notes", className: "hover:underline", children: "Notes" }), _jsx(Link, { to: "/vault", className: "hover:underline", children: "Vault" })] })] }) }));
};
export default NavBar;
