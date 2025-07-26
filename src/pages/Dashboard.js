import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Dashboard.tsx
import { useState, useEffect } from 'react';
import FocusTimer from '../components/FocusTimer';
import QuickNotes from '../components/QuickNotes';
const Dashboard = () => {
    const quotes = [
        "“Commit to the Lord whatever you do, and He will establish your plans.” – Proverbs 16:3",
        "“In all your ways acknowledge Him, and He will make your paths straight.” – Proverbs 3:6",
        "“Be still, and know that I am God.” – Psalm 46:10",
    ];
    const [quoteIndex, setQuoteIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setQuoteIndex((prev) => (prev + 1) % quotes.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);
    return (_jsxs("div", { className: "p-6 space-y-8", children: [_jsx("h1", { className: "text-2xl font-bold", children: "\uD83C\uDFAF AnchorStack Dashboard" }), _jsx(FocusTimer, {}), _jsx(QuickNotes, {}), _jsx("p", { className: "italic text-gray-600 dark:text-gray-300", children: quotes[quoteIndex] })] }));
};
export default Dashboard;
