# 🪙 Faith Token System - Complete Deployment Package

## 📦 Package Contents

```
faith-token-system/
├── README.md                     (This file - deployment guide)
├── LAUNCH-CHECKLIST.md           (Step-by-step launch guide)
├── src/
│   ├── store/
│   │   └── useTokenStore.ts      (Complete token logic + Zustand store)
│   ├── components/
│   │   ├── TokenBalance.tsx      (Balance display with tier awareness)
│   │   ├── EarnTokensPanel.tsx   (Interactive earning interface)
│   │   ├── TokenRedemptions.tsx  (Redemption system with validation)
│   │   ├── EmailLogin.tsx        (Simple email-based auth)
│   │   └── VaultTile.tsx         (Enhanced with token discounts)
│   ├── pages/
│   │   └── Tokens.tsx            (Complete dashboard page)
│   └── types/
│       └── token.ts              (TypeScript interfaces)
├── api/
│   └── gumroad-webhook.ts        (Production webhook handler)
├── tests/
│   ├── mockPurchase.json         (Test webhook payload)
│   └── webhook-test.js           (Local webhook testing script)
└── marketing/
    ├── launch-email.md           (Ready-to-send email template)
    ├── social-media.md           (Twitter/Instagram templates)
    └── faq.md                    (Customer FAQ about tokens)
```

## 🚀 Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
npm install zustand
```

### 2. Copy Files
```bash
# Copy all src/ files to your existing AnchorStack project
cp -r src/* /path/to/your/anchorstack/src/

# Copy API webhook
cp api/gumroad-webhook.ts /path/to/your/project/api/
```

### 3. Update App.tsx
```typescript
// Add to your existing routes
import { Tokens } from '@/pages/Tokens'

<Route path="tokens" element={<Tokens />} />
```

### 4. Update Navigation
```typescript
// In Layout.tsx, add to navigation array:
import { Coins } from 'lucide-react'

{ name: 'Tokens', href: '/tokens', icon: Coins }
```

### 5. Deploy
```bash
npm run build
vercel --prod
```

## 🎯 Core Features Overview

### 💰 Earning System
- **Daily Login**: 2 tokens/day
- **Focus Sessions**: 10 tokens each (BootyQuest integration ready)
- **Social Sharing**: 15 tokens/week
- **Purchases**: 5 tokens per $1 spent (automatic via webhook)

### 🎁 Redemption System
- **$5 Discounts**: 100 tokens (generates unique coupon codes)
- **Giveaway Entries**: 50 tokens (monthly $50 bundle drawings)
- **Premium Unlocks**: 150 tokens (exclusive content access)

### 🏆 Tier System
| Tier | Requirement | Monthly Cap | Benefits |
|------|-------------|-------------|----------|
| Free | $0 | 100 tokens | Basic earning + redemptions |
| Mid | $25+ purchase | 300 tokens | Higher caps + premium redemptions |
| Top | $75+ purchase | 500 tokens | Exclusive rewards + priority |
| Lifetime | $200+ purchase | 1000 tokens | Maximum earning + founder perks |

### 🛡️ Anti-Abuse Features
- **Daily limits** prevent token farming
- **Email verification** required for redemptions
- **Tier-based caps** reward loyal customers
- **Transaction logging** for audit trails

## 🔧 Integration Points

### Dashboard Integration
```typescript
// Add to Dashboard.tsx
import { QuickTokenActions } from '@/components/QuickTokenActions'

<div className="lg:col-span-1">
  <QuickTokenActions />
</div>
```

### Focus Timer Integration
```typescript
// Add to FocusTimer.tsx
import { useTokenStore } from '@/store/useTokenStore'

const { addTokens, canEarn } = useTokenStore()

// On session complete:
if (canEarn('quest')) {
  addTokens(10, 'quest')
  showNotification('🪙 Earned 10 Faith Tokens!')
}
```

### Vault Integration
The enhanced VaultTile.tsx automatically shows token discount options when users hover over premium products.

## 🌐 Webhook Setup

### Gumroad Configuration
1. Go to **Gumroad Settings → Advanced → Webhooks**
2. Add webhook URL: `https://yoursite.vercel.app/api/gumroad-webhook`
3. Enable **"Sale"** events only
4. Save settings

### Testing the Webhook
```bash
# Use the included test script
node tests/webhook-test.js

# Or manually test with curl:
curl -X POST https://yoursite.vercel.app/api/gumroad-webhook \
  -H "Content-Type: application/json" \
  -d @tests/mockPurchase.json
```

## 📊 Analytics & Monitoring

### Key Metrics to Track
- **Token earning rate**: Average tokens earned per user per week
- **Redemption rate**: Percentage of earned tokens actually used
- **Conversion impact**: Sales increase from token users vs non-token users
- **Retention boost**: Return rate of token users vs regular users

### Webhook Monitoring
- Check Vercel function logs for webhook processing
- Monitor Gumroad webhook delivery status
- Set up alerts for failed webhook processing

## 🔒 Security Considerations

### Data Protection
- All token data stored locally (localStorage + Zustand)
- No sensitive data in browser storage
- Email-based user identification (no passwords required)

### Abuse Prevention
- Built-in daily/weekly/monthly limits
- Email