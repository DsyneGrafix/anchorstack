import { jsx as _jsx } from "react/jsx-runtime";
export const Card = ({ children }) => {
    return (_jsx("div", { style: {
            backgroundColor: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "1rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
        }, children: children }));
};
export const CardContent = ({ children }) => {
    return (_jsx("div", { style: { padding: "0.5rem 0" }, children: children }));
};
export const CardHeader = ({ children }) => (_jsx("div", { style: { paddingBottom: "0.5rem", borderBottom: "1px solid #e2e8f0" }, children: children }));
export const CardTitle = ({ children }) => (_jsx("h2", { style: { fontSize: "1.125rem", fontWeight: 600 }, children: children }));
