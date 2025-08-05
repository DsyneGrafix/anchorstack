import { jsx as _jsx } from "react/jsx-runtime";
import { Card, CardContent } from '@/components/ui/card';
import { EnhancedVaultTile } from '@/components/enhanced-vault-tile';
import { tiles } from '@/data/tiles';
const VaultRealProducts = () => {
    return (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: tiles.map((tile, index) => (_jsx(Card, { children: _jsx(CardContent, { children: _jsx(EnhancedVaultTile, { ...tile }) }) }, index))) }));
};
export default VaultRealProducts;
