import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, Link } from 'react-router-dom';
const Layout = () => {
    return (_jsxs("div", { children: [_jsx("header", { style: { padding: '1rem', backgroundColor: '#f0f0f0' }, children: _jsxs("nav", { children: [_jsx(Link, { to: "/", children: "\uD83C\uDFE0 Home" }), " | ", _jsx(Link, { to: "/about", children: "\uD83D\uDCD6 About" }), " | ", _jsx(Link, { to: "/vault", children: "\uD83E\uDDF0 Vault" })] }) }), _jsx("main", { style: { padding: '2rem' }, children: _jsx(Outlet, {}) })] }));
};
export default Layout;
