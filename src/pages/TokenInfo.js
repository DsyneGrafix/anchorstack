import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/store/useTokenStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const TOKEN_RATES = {
    purchase: 5, // per $1 spent
    login: 2, // daily max
    quest: 10, // per completion
    social: 15, // weekly max
    testimonial: 25, // once ever
};
const MONTHLY_CAPS = {
    free: 100,
    mid: 300,
    top: 500,
    lifetime: 1000,
};
const DAILY_LIMITS = {
    login: 2, // max 2 tokens per day for login
    quest: 50, // max 50 tokens per day from quests
};
export const useTokenStore = create()(persist((set, get) => ({
    user: null,
    transactions: [],
    setUser: (user) => {
        set({ user });
    },
    addTokens: (amount, source, productId) => {
        const { user, transactions, canEarn } = get();
        if (!user || !canEarn(source))
            return;
        const transaction = {
            id: crypto.randomUUID(),
            email: user.email,
            action: 'earn',
            amount,
            source,
            productId,
            timestamp: new Date(),
        };
        set(state => ({
            user: {
                ...state.user,
                tokens: state.user.tokens + amount,
            },
            transactions: [...state.transactions, transaction],
        }));
    },
    spendTokens: (amount, purpose) => {
        const { user } = get();
        if (!user || user.tokens < amount)
            return false;
        const transaction = {
            id: crypto.randomUUID(),
            email: user.email,
            action: 'spend',
            amount,
            source: 'manual',
            metadata: { purpose },
            timestamp: new Date(),
        };
        set(state => ({
            user: {
                ...state.user,
                tokens: state.user.tokens - amount,
            },
            transactions: [...state.transactions, transaction],
        }));
        return true;
    },
    getMonthlyEarned: () => {
        const { transactions, user } = get();
        if (!user)
            return 0;
        const monthStart = new Date();
        monthStart.setDate(1);
        monthStart.setHours(0, 0, 0, 0);
        return transactions
            .filter(t => t.action === 'earn' &&
            t.email === user.email &&
            new Date(t.timestamp) >= monthStart)
            .reduce((sum, t) => sum + t.amount, 0);
    },
    canEarn: (source) => {
        const { user, transactions } = get();
        if (!user)
            return false;
        const monthlyEarned = get().getMonthlyEarned();
        const monthlyCap = MONTHLY_CAPS[user.tier];
        if (monthlyEarned >= monthlyCap)
            return false;
        // Check daily limits
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayEarned = transactions
            .filter(t => t.action === 'earn' &&
            t.source === source &&
            t.email === user.email &&
            new Date(t.timestamp) >= today)
            .reduce((sum, t) => sum + t.amount, 0);
        const dailyLimit = DAILY_LIMITS[source];
        if (dailyLimit && todayEarned >= dailyLimit)
            return false;
        // Check weekly limits for social
        if (source === 'social') {
            const weekStart = new Date();
            weekStart.setDate(weekStart.getDate() - weekStart.getDay());
            weekStart.setHours(0, 0, 0, 0);
            const weeklyEarned = transactions
                .filter(t => t.action === 'earn' &&
                t.source === 'social' &&
                t.email === user.email &&
                new Date(t.timestamp) >= weekStart)
                .reduce((sum, t) => sum + t.amount, 0);
            if (weeklyEarned >= 15)
                return false;
        }
        // Check testimonial once-ever limit
        if (source === 'testimonial') {
            const hasTestimonial = transactions.some(t => t.source === 'testimonial' && t.email === user.email);
            if (hasTestimonial)
                return false;
        }
        return true;
    },
    syncWithCloud: async () => {
        // Placeholder for cloud sync
        // Will implement with Supabase/Firebase
        console.log('Cloud sync not yet implemented');
    },
}), {
    name: 'anchorstack-tokens',
    version: 1,
}));
import { Coins, TrendingUp, Calendar } from 'lucide-react';
import { useTokenStore } from '@/store/useTokenStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
export const TokenBalance = () => {
    const { user, transactions, getMonthlyEarned } = useTokenStore();
    if (!user)
        return null;
    const monthlyEarned = getMonthlyEarned();
    const MONTHLY_CAP = {
        free: 100,
        mid: 300,
        top: 500,
        lifetime: 1000,
    }[user.tier];
    const recentTransactions = transactions
        .filter(t => t.email === user.email)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 5);
    return (_jsxs("div", { className: "space-y-4", children: [_jsx(Card, { className: "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [_jsx(Coins, { className: "w-6 h-6 text-yellow-600" }), _jsx("h3", { className: "text-lg font-semibold text-yellow-800", children: "Faith Tokens" })] }), _jsx("div", { className: "text-3xl font-bold text-yellow-900 mb-1", children: user.tokens.toLocaleString() }), _jsx("div", { className: "text-sm text-yellow-700", children: "Available to spend" })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-sm text-yellow-700 mb-1", children: "This Month" }), _jsxs("div", { className: "text-xl font-semibold text-yellow-800", children: [monthlyEarned, " / ", MONTHLY_CAP] }), _jsx("div", { className: "w-24 bg-yellow-200 rounded-full h-2 mt-1", children: _jsx("div", { className: "bg-yellow-500 h-2 rounded-full transition-all", style: { width: `${Math.min((monthlyEarned / MONTHLY_CAP) * 100, 100)}%` } }) })] })] }) }) }), recentTransactions.length > 0 && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(TrendingUp, { className: "w-5 h-5" }), _jsx("span", { children: "Recent Activity" })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: recentTransactions.map((transaction) => (_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: `w-2 h-2 rounded-full ${transaction.action === 'earn' ? 'bg-green-500' : 'bg-red-500'}` }), _jsx("span", { className: "capitalize", children: transaction.source }), transaction.productId && (_jsxs("span", { className: "text-anchor-500", children: ["\u2022 ", transaction.productId] }))] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("span", { className: `font-medium ${transaction.action === 'earn' ? 'text-green-600' : 'text-red-600'}`, children: [transaction.action === 'earn' ? '+' : '-', transaction.amount] }), _jsx(Calendar, { className: "w-3 h-3 text-anchor-400" }), _jsx("span", { className: "text-anchor-500", children: new Date(transaction.timestamp).toLocaleDateString() })] })] }, transaction.id))) }) })] }))] }));
};
import { Clock, GamepadIcon, Share2, MessageSquare, Gift } from 'lucide-react';
import { Button } from '@/components/ui/Button';
export const EarnTokensPanel = () => {
    const { user, addTokens, canEarn } = useTokenStore();
    if (!user)
        return null;
    const earnMethods = [
        {
            id: 'login',
            title: 'Daily Check-in',
            description: 'Log in daily to earn tokens',
            icon: Clock,
            tokens: 2,
            action: () => addTokens(2, 'login'),
            canEarn: canEarn('login'),
            frequency: 'Daily'
        },
        {
            id: 'quest',
            title: 'Complete Quest',
            description: 'Finish BootyQuest challenges',
            icon: GamepadIcon,
            tokens: 10,
            action: () => addTokens(10, 'quest'),
            canEarn: canEarn('quest'),
            frequency: 'Per completion'
        },
        {
            id: 'social',
            title: 'Share Content',
            description: 'Share AnchorStack on social media',
            icon: Share2,
            tokens: 15,
            action: () => {
                window.open(`https://twitter.com/intent/tweet?text=Building my creator business with @AnchorStack 🎯 The faith-based productivity system that actually works! Check it out:&url=${window.location.origin}`, '_blank');
                addTokens(15, 'social');
            },
            canEarn: canEarn('social'),
            frequency: 'Weekly'
        },
        {
            id: 'testimonial',
            title: 'Leave Testimonial',
            description: 'Share your AnchorStack experience',
            icon: MessageSquare,
            tokens: 25,
            action: () => {
                // This would open a testimonial form
                alert('Testimonial form would open here');
                addTokens(25, 'testimonial');
            },
            canEarn: canEarn('testimonial'),
            frequency: 'One-time'
        }
    ];
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(Gift, { className: "w-5 h-5" }), _jsx("span", { children: "Earn Faith Tokens" })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: earnMethods.map((method) => {
                        const IconComponent = method.icon;
                        return (_jsxs("div", { className: `
                flex items-center justify-between p-4 rounded-lg border transition-colors
                ${method.canEarn ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}
              `, children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(IconComponent, { className: `w-5 h-5 ${method.canEarn ? 'text-green-600' : 'text-gray-400'}` }), _jsxs("div", { children: [_jsx("h4", { className: `font-medium ${method.canEarn ? 'text-green-800' : 'text-gray-600'}`, children: method.title }), _jsxs("p", { className: `text-sm ${method.canEarn ? 'text-green-600' : 'text-gray-500'}`, children: [method.description, " \u2022 ", method.frequency] })] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("span", { className: `font-bold ${method.canEarn ? 'text-green-600' : 'text-gray-400'}`, children: ["+", method.tokens] }), _jsx(Button, { onClick: method.action, disabled: !method.canEarn, size: "sm", variant: method.canEarn ? 'default' : 'outline', children: method.canEarn ? 'Earn' : 'Claimed' })] })] }, method.id));
                    }) }) })] }));
};
// src/components/RedeemTokens.tsx
import { useState } from 'react';
import { ShoppingCart, Download, Trophy } from 'lucide-react';
export const RedeemTokens = () => {
    const { user, spendTokens } = useTokenStore();
    const [redeeming, setRedeeming] = useState(null);
    if (!user)
        return null;
    const redemptions = [
        {
            id: 'discount5',
            title: '$5 Off Next Order',
            description: 'Get $5 discount on orders over $20',
            icon: ShoppingCart,
            cost: 100,
            action: async () => {
                // Generate a unique coupon code
                const couponCode = `FAITH${Date.now().toString().slice(-6)}`;
                // This would typically call your backend to create a Gumroad discount
                alert(`Coupon Code: ${couponCode}\nUse this code at checkout for $5 off orders over $20!`);
                return spendTokens(100, 'discount_5_dollar');
            }
        },
        {
            id: 'freebie',
            title: 'Free Vault Item',
            description: 'Unlock a selected free resource',
            icon: Download,
            cost: 150,
            action: async () => {
                // This would show a modal with available freebies
                alert('Choose your free item from our curated selection!');
                return spendTokens(150, 'free_vault_item');
            }
        },
        {
            id: 'giveaway',
            title: 'Giveaway Entry',
            description: 'Enter monthly $25 bundle giveaway',
            icon: Trophy,
            cost: 50,
            action: async () => {
                alert('You\'re entered in this month\'s giveaway! Winner announced on the 1st.');
                return spendTokens(50, 'giveaway_entry');
            }
        }
    ];
    const handleRedeem = async (redemption) => {
        if (user.tokens < redemption.cost)
            return;
        setRedeeming(redemption.id);
        try {
            const success = await redemption.action();
            if (success) {
                // Success handled by the action
            }
        }
        catch (error) {
            alert('Something went wrong. Please try again.');
        }
        finally {
            setRedeeming(null);
        }
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(Gift, { className: "w-5 h-5" }), _jsx("span", { children: "Redeem Tokens" })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: redemptions.map((redemption) => {
                        const IconComponent = redemption.icon;
                        const canAfford = user.tokens >= redemption.cost;
                        const isRedeeming = redeeming === redemption.id;
                        return (_jsxs("div", { className: `
                flex items-center justify-between p-4 rounded-lg border transition-colors
                ${canAfford ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'}
              `, children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(IconComponent, { className: `w-5 h-5 ${canAfford ? 'text-blue-600' : 'text-gray-400'}` }), _jsxs("div", { children: [_jsx("h4", { className: `font-medium ${canAfford ? 'text-blue-800' : 'text-gray-600'}`, children: redemption.title }), _jsx("p", { className: `text-sm ${canAfford ? 'text-blue-600' : 'text-gray-500'}`, children: redemption.description })] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("span", { className: `font-bold ${canAfford ? 'text-blue-600' : 'text-gray-400'}`, children: [redemption.cost, " tokens"] }), _jsx(Button, { onClick: () => handleRedeem(redemption), disabled: !canAfford || isRedeeming, size: "sm", variant: canAfford ? 'default' : 'outline', children: isRedeeming ? 'Redeeming...' : canAfford ? 'Redeem' : 'Not enough' })] })] }, redemption.id));
                    }) }) })] }));
};
import { Mail, CheckCircle } from 'lucide-react';
export const EmailLogin = () => {
    const { user, setUser } = useTokenStore();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!email)
            return;
        setLoading(true);
        try {
            // For MVP, we'll just create/load the user locally
            // In production, this would send a magic link or verification code
            const newUser = {
                email,
                joinDate: new Date(),
                tier: 'free',
                verified: true, // For MVP, auto-verify
                tokens: 0,
                purchaseHistory: [],
                lastLogin: new Date(),
            };
            setUser(newUser);
        }
        catch (error) {
            alert('Something went wrong. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    const handleLogout = () => {
        setUser(null);
        setEmail('');
    };
    if (user) {
        return (_jsx(Card, { className: "bg-green-50 border-green-200", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(CheckCircle, { className: "w-5 h-5 text-green-600" }), _jsx("span", { className: "text-green-800 font-medium", children: user.email })] }), _jsx(Button, { onClick: handleLogout, variant: "outline", size: "sm", children: "Logout" })] }) }) }));
    }
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(Mail, { className: "w-5 h-5" }), _jsx("span", { children: "Access Faith Tokens" })] }) }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleEmailSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-anchor-700 mb-2", children: "Email Address" }), _jsx("input", { type: "email", id: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "your@email.com", required: true, className: "w-full px-3 py-2 border border-anchor-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" })] }), _jsx(Button, { type: "submit", disabled: loading || !email, className: "w-full", children: loading ? 'Loading...' : 'Start Earning Tokens' }), _jsx("p", { className: "text-xs text-anchor-500 text-center", children: "Join the faith-based creator community and start earning tokens for engagement!" })] }) })] }));
};
export const handleGumroadWebhook = async (webhookData) => {
    const { email, price, product_id, product_name } = webhookData;
    // Calculate tokens (5 per $1)
    const tokens = Math.floor(price * 5);
    // Update user tier based on purchase
    let tier = 'free';
    if (price >= 200)
        tier = 'lifetime';
    else if (price >= 75)
        tier = 'top';
    else if (price >= 25)
        tier = 'mid';
    // This would typically save to your database
    // For now, it's a blueprint for the webhook handler
    console.log(`User ${email} purchased ${product_name} for $${price}`);
    console.log(`Awarding ${tokens} tokens and upgrading to ${tier} tier`);
    return {
        success: true,
        tokensAwarded: tokens,
        newTier: tier,
    };
};
import { EmailLogin } from '@/components/EmailLogin';
import { EarnTokensPanel } from '@/components/EarnTokensPanel';
import { RedeemTokens } from '@/components/RedeemTokens';
export const Tokens = () => {
    const { user } = useTokenStore();
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-3xl font-bold text-anchor-900 mb-2", children: "Faith Tokens" }), _jsx("p", { className: "text-anchor-600 max-w-2xl mx-auto", children: "Earn tokens through engagement and redeem them for exclusive rewards, discounts, and freebies." })] }), _jsx(EmailLogin, {}), user && (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsxs("div", { className: "space-y-6", children: [_jsx(TokenBalance, {}), _jsx(EarnTokensPanel, {})] }), _jsx("div", { children: _jsx(RedeemTokens, {}) })] })), user && (_jsxs("div", { className: "bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center", children: [_jsx("h3", { className: "text-lg font-semibold text-blue-900 mb-2", children: "How Faith Tokens Work" }), _jsx("p", { className: "text-blue-700 mb-4 max-w-2xl mx-auto", children: "Faith Tokens are our way of rewarding your engagement and loyalty. Earn them through daily activities, purchases, and community participation. Redeem them for real value!" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm", children: [_jsxs("div", { className: "bg-white rounded-lg p-4", children: [_jsx("div", { className: "font-semibold text-green-800 mb-1", children: "Earn" }), _jsx("div", { className: "text-green-600", children: "Login daily, complete quests, make purchases, share content" })] }), _jsxs("div", { className: "bg-white rounded-lg p-4", children: [_jsx("div", { className: "font-semibold text-blue-800 mb-1", children: "Redeem" }), _jsx("div", { className: "text-blue-600", children: "Discounts, free items, giveaway entries, exclusive access" })] }), _jsxs("div", { className: "bg-white rounded-lg p-4", children: [_jsx("div", { className: "font-semibold text-purple-800 mb-1", children: "Grow" }), _jsx("div", { className: "text-purple-600", children: "Higher tiers unlock better earning rates and rewards" })] })] })] }))] }));
};
