import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import FocusTimer from "@/components/FocusTimer";
import QuickNotes from "@/components/QuickNotes";
const quotes = [
    "Clarity comes when you stop forcing the answer.",
    "Stillness is not weakness. It’s wisdom.",
    "Real progress is focused, not frantic.",
    "One quiet hour is worth ten distracted ones.",
    "Your mind is a garden. Water the still spaces."
];
const Dashboard = () => {
    const [quoteIndex, setQuoteIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setQuoteIndex((prev) => (prev + 1) % quotes.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);
    return (_jsxs("div", { className: "p-6 sm:p-10 text-gray-900 dark:text-gray-100", children: [_jsxs("div", { className: "mb-6", children: [_jsx("h1", { className: "text-3xl font-bold mb-1", children: "\uD83C\uDFAF AnchorStack Dashboard" }), _jsx("p", { className: "text-gray-600 dark:text-gray-400 italic", children: quotes[quoteIndex] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-start", children: [_jsx(FocusTimer, {}), _jsx(QuickNotes, {})] })] }));
};
export default Dashboard;
