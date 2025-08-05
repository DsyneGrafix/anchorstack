import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Layout = ({ children }) => {
    return (_jsxs("div", { children: [_jsx("header", { style: { padding: '1rem', backgroundColor: '#f0f0f0' }, children: _jsxs("nav", { children: [_jsx("a", { href: "/", children: "\uD83C\uDFE0 Home" }), " | ", _jsx("a", { href: "/about", children: "\uD83D\uDCD6 About" }), " | ", _jsx("a", { href: "/vault", children: "\uD83E\uDDF0 Vault" })] }) }), _jsx("main", { style: { padding: '2rem' }, children: children })] }));
};
export default Layout;
