import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VaultPage from './pages/VaultPage';
import AboutPage from './pages/AboutPage';
export default function App() {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/vault", element: _jsx(VaultPage, {}) }), _jsx(Route, { path: "/about", element: _jsx(AboutPage, {}) })] }) }));
}
