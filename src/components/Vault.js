import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "@/components/ui/card";
import { EnhancedVaultTile } from "@/components/enhanced-vault-tile";
import { tiles } from "@/data/tiles";
const Vault = () => {
    return (_jsxs("div", { className: "p-6", children: [_jsx("h1", { className: "text-3xl font-bold mb-4", children: "\uD83D\uDDC2\uFE0F Vault" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Curated tools, templates, and systems to build your creator business with intention." }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: tiles.map((tile, index) => (_jsx(Card, { children: _jsxs(CardContent, { children: ["import ", EnhancedVaultTile, " from \"@/components/enhanced-vault-tile\";"] }) }, index))) })] }));
};
export default Vault;
