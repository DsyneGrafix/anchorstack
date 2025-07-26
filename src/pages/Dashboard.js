import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Layout from '../layouts/Layout';
import FocusTimer from "@/components/FocusTimer";
import QuickNotes from "@/components/QuickNotes";
export default function DashboardPage() {
    return (_jsx(Layout, { children: _jsxs("div", { className: "max-w-5xl mx-auto py-12 px-6", children: [_jsx("h1", { className: "text-4xl font-bold mb-10 text-anchor-800 text-center", children: "\uD83C\uDFAF AnchorStack Dashboard" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12", children: [_jsxs("div", { className: "bg-white rounded-xl shadow p-6", children: [_jsx("h2", { className: "text-2xl font-semibold text-anchor-700 mb-4", children: "\u23F1\uFE0F Focus Timer" }), _jsx(FocusTimer, {})] }), _jsxs("div", { className: "bg-white rounded-xl shadow p-6", children: [_jsx("h2", { className: "text-2xl font-semibold text-anchor-700 mb-4", children: "\uD83D\uDCDD Quick Notes" }), _jsx(QuickNotes, {})] })] })] }) }));
}
