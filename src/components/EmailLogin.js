import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// DEPLOYMENT PACKAGE: Faith Token System
// Copy these files to your AnchorStack project
// =====================================
// 1. src/pages/Tokens.tsx - Complete Token Dashboard
// =====================================
import { useState } from 'react';
import { Coins, Gift, Star, Crown, Zap, Users, Trophy, Shield, ArrowRight, Mail, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTokenStore } from '@/store/useTokenStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
// Email Login Component (embedded for simplicity)
const EmailLogin = () => {
    const { user, setUser } = useTokenStore();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!email)
            return;
        setLoading(true);
        try {
            const newUser = {
                email,
                joinDate: new Date(),
                tier: 'free',
                verified: true,
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
        return (_jsx(Card, { className: "bg-green-50 border-green-200", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(CheckCircle, { className: "w-5 h-5 text-green-600" }), _jsx("span", { className: "text-green-800 font-medium", children: user.email }), _jsxs("span", { className: "text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded capitalize", children: [user.tier, " member"] })] }), _jsx(Button, { onClick: handleLogout, variant: "outline", size: "sm", children: "Logout" })] }) }) }));
    }
    return (_jsxs(Card, { className: "max-w-md mx-auto", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2 text-center", children: [_jsx(Mail, { className: "w-5 h-5" }), _jsx("span", { children: "Join the Faith Token Community" })] }) }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleEmailSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-anchor-700 mb-2", children: "Email Address" }), _jsx("input", { type: "email", id: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "your@email.com", required: true, className: "w-full px-3 py-2 border border-anchor-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" })] }), _jsx(Button, { type: "submit", disabled: loading || !email, className: "w-full", children: loading ? 'Setting up your account...' : 'Start Earning Faith Tokens' }), _jsx("p", { className: "text-xs text-anchor-500 text-center", children: "Join the faith-based creator community and start earning rewards immediately!" })] }) })] }));
};
// Token Balance Component (embedded)
const TokenBalance = () => {
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
    const getTierIcon = (tier) => {
        switch (tier) {
            case 'free': return Gift;
            case 'mid': return Star;
            case 'top': return Crown;
            case 'lifetime': return Crown;
            default: return Gift;
        }
    };
    const getTierColor = (tier) => {
        switch (tier) {
            case 'free': return 'text-green-600';
            case 'mid': return 'text-blue-600';
            case 'top': return 'text-purple-600';
            case 'lifetime': return 'text-amber-600';
            default: return 'text-green-600';
        }
    };
    const TierIcon = getTierIcon(user.tier);
    return (_jsxs("div", { className: "space-y-4", children: [_jsx(Card, { className: "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("div", { className: "relative", children: [_jsx(Coins, { className: "w-8 h-8 text-yellow-600" }), _jsx(TierIcon, { className: `w-4 h-4 ${getTierColor(user.tier)} absolute -top-1 -right-1` })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-yellow-800", children: "Faith Tokens" }), _jsxs("p", { className: "text-xs text-yellow-600 capitalize", children: [user.tier, " Member"] })] })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-3xl font-bold text-yellow-900", children: user.tokens.toLocaleString() }), _jsx("div", { className: "text-sm text-yellow-700", children: "Available" })] })] }), _jsxs("div", { className: "bg-yellow-100 rounded-lg p-3", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-sm font-medium text-yellow-800", children: "This Month" }), _jsxs("span", { className: "text-sm text-yellow-700", children: [monthlyEarned, " / ", MONTHLY_CAP] })] }), _jsx("div", { className: "w-full bg-yellow-200 rounded-full h-2", children: _jsx("div", { className: "bg-yellow-500 h-2 rounded-full transition-all duration-500", style: { width: `${Math.min((monthlyEarned / MONTHLY_CAP) * 100, 100)}%` } }) }), monthlyEarned >= MONTHLY_CAP && (_jsx("p", { className: "text-xs text-yellow-600 mt-1", children: "Monthly earning limit reached" }))] })] }) }), recentTransactions.length > 0 && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2 text-base", children: [_jsx(Trophy, { className: "w-4 h-4" }), _jsx("span", { children: "Recent Activity" })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: recentTransactions.map((transaction) => (_jsxs("div", { className: "flex items-center justify-between py-2 border-b border-anchor-100 last:border-b-0", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: `w-2 h-2 rounded-full ${transaction.action === 'earn' ? 'bg-green-500' : 'bg-red-500'}` }), _jsxs("div", { children: [_jsx("span", { className: "text-sm font-medium capitalize", children: transaction.source.replace('_', ' ') }), transaction.productId && (_jsxs("p", { className: "text-xs text-anchor-500", children: ["\u2022 ", transaction.productId] }))] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("span", { className: `font-bold text-sm ${transaction.action === 'earn' ? 'text-green-600' : 'text-red-600'}`, children: [transaction.action === 'earn' ? '+' : '-', transaction.amount] }), _jsx("span", { className: "text-xs text-anchor-400", children: new Date(transaction.timestamp).toLocaleDateString() })] })] }, transaction.id))) }) })] }))] }));
};
// Earn Tokens Panel (embedded)
const EarnTokensPanel = () => {
    const { user, addTokens, canEarn } = useTokenStore();
    if (!user)
        return null;
    const earnMethods = [
        {
            id: 'login',
            title: 'Daily Check-in',
            description: 'Log in daily to earn tokens',
            icon: Zap,
            tokens: 2,
            action: () => addTokens(2, 'login'),
            canEarn: canEarn('login'),
            frequency: 'Daily'
        },
        {
            id: 'quest',
            title: 'Complete Focus Session',
            description: 'Finish Pomodoro sessions or BootyQuest challenges',
            icon: Trophy,
            tokens: 10,
            action: () => addTokens(10, 'quest'),
            canEarn: canEarn('quest'),
            frequency: 'Per completion'
        },
        {
            id: 'social',
            title: 'Share AnchorStack',
            description: 'Share on social media to spread the word',
            icon: Users,
            tokens: 15,
            action: () => {
                const text = 'Building my creator business with AnchorStack 🎯 The faith-based productivity system that actually works!';
                const url = window.location.origin;
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                addTokens(15, 'social');
            },
            canEarn: canEarn('social'),
            frequency: 'Weekly'
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
// Token Redemptions (embedded)
const TokenRedemptions = () => {
    const { user, spendTokens } = useTokenStore();
    const [redeeming, setRedeeming] = useState(null);
    if (!user)
        return null;
    const redemptions = [
        {
            id: 'discount5',
            title: '$5 Off Next Order',
            description: 'Get $5 discount on orders over $20',
            icon: Gift,
            cost: 100,
            action: async () => {
                const couponCode = `FAITH${Date.now().toString().slice(-6)}`;
                if (navigator.clipboard) {
                    await navigator.clipboard.writeText(couponCode);
                }
                alert(`🎉 Discount Code Generated!\n\nCode: ${couponCode}\n\nUse this code for $5 off orders over $20!\n${navigator.clipboard ? 'Code copied to clipboard!' : 'Copy this code to use at checkout.'}`);
                return spendTokens(100, 'discount_5_dollar');
            }
        },
        {
            id: 'giveaway',
            title: 'Monthly Giveaway Entry',
            description: 'Enter to win $50 product bundle',
            icon: Trophy,
            cost: 50,
            action: async () => {
                alert('🏆 You\'re entered in this month\'s giveaway!\n\nWinner announced on the 1st of next month. Good luck!');
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
            if (!success) {
                alert('Something went wrong with the redemption. Please try again.');
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
// Token Education Component
const TokenEducation = () => {
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Understanding Faith Tokens" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-anchor-800 mb-2", children: "What are Faith Tokens?" }), _jsx("p", { className: "text-anchor-600 text-sm", children: "Faith Tokens are our loyalty rewards system. They're earned through genuine engagement with the AnchorStack community and can be redeemed for real value - discounts, exclusive content, and special perks." })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-anchor-800 mb-2", children: "Why \"Faith\" Tokens?" }), _jsx("p", { className: "text-anchor-600 text-sm", children: "Building a creator business requires faith - in your vision, in the process, and in showing up consistently even when you don't see immediate results. We reward that faithfulness." })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-anchor-800 mb-2", children: "Fair Play Promise" }), _jsx("p", { className: "text-anchor-600 text-sm", children: "Our system has built-in safeguards to prevent abuse while rewarding genuine engagement. Daily and monthly limits ensure fairness for all members, while higher tiers unlock better earning potential as you invest in your creator journey." })] })] })] }), _jsx(Card, { className: "bg-blue-50 border-blue-200", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("h4", { className: "font-semibold text-blue-800 mb-3 flex items-center", children: [_jsx(Shield, { className: "w-5 h-5 mr-2" }), "Token Limits & Security"] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium text-blue-700 mb-1", children: "Daily Earning Limits" }), _jsxs("ul", { className: "text-blue-600 space-y-0.5", children: [_jsx("li", { children: "\u2022 Login: 2 tokens/day max" }), _jsx("li", { children: "\u2022 Focus sessions: 50 tokens/day max" }), _jsx("li", { children: "\u2022 Social sharing: 15 tokens/week max" }), _jsx("li", { children: "\u2022 Testimonials: 25 tokens once" })] })] }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-blue-700 mb-1", children: "Monthly Caps by Tier" }), _jsxs("ul", { className: "text-blue-600 space-y-0.5", children: [_jsx("li", { children: "\u2022 Free: 100 tokens/month" }), _jsx("li", { children: "\u2022 Mid ($25+): 300 tokens/month" }), _jsx("li", { children: "\u2022 Top ($75+): 500 tokens/month" }), _jsx("li", { children: "\u2022 Lifetime ($200+): 1000 tokens/month" })] })] })] })] }) })] }));
};
// Token Overview Component  
const TokenOverview = () => {
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-anchor-900 mb-6 text-center", children: "How to Earn Faith Tokens" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
                            {
                                title: 'Daily Check-in',
                                description: 'Log in every day',
                                icon: Zap,
                                tokens: '2/day',
                                color: 'green'
                            },
                            {
                                title: 'Focus Sessions',
                                description: 'Complete Pomodoro timers',
                                icon: Trophy,
                                tokens: '10 each',
                                color: 'blue'
                            },
                            {
                                title: 'Share Content',
                                description: 'Social media sharing',
                                icon: Users,
                                tokens: '15/week',
                                color: 'purple'
                            },
                            {
                                title: 'Make Purchases',
                                description: 'Support the ecosystem',
                                icon: Star,
                                tokens: '5 per $1',
                                color: 'yellow'
                            }
                        ].map((method) => {
                            const IconComponent = method.icon;
                            const colorClasses = {
                                green: 'bg-green-100 text-green-600',
                                blue: 'bg-blue-100 text-blue-600',
                                purple: 'bg-purple-100 text-purple-600',
                                yellow: 'bg-yellow-100 text-yellow-600'
                            };
                            return (_jsx(Card, { className: "text-center", children: _jsxs(CardContent, { className: "p-6", children: [_jsx("div", { className: `w-12 h-12 ${colorClasses[method.color]} rounded-lg flex items-center justify-center mx-auto mb-3`, children: _jsx(IconComponent, { className: "w-6 h-6" }) }), _jsx("h3", { className: "font-semibold text-anchor-800 mb-2", children: method.title }), _jsx("p", { className: "text-sm text-anchor-600 mb-3", children: method.description }), _jsxs("div", { className: `${colorClasses[method.color]} px-2 py-1 rounded text-xs font-bold`, children: ["+", method.tokens] })] }) }, method.title));
                        }) })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-anchor-900 mb-6 text-center", children: "Membership Tiers" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
                            {
                                tier: 'Free',
                                icon: Gift,
                                monthlyCap: 100,
                                price: '$0',
                                color: 'green',
                                features: ['Daily check-ins', 'Basic rewards', 'Standard redemptions']
                            },
                            {
                                tier: 'Mid',
                                icon: Star,
                                monthlyCap: 300,
                                price: '$25+',
                                color: 'blue',
                                features: ['All free features', 'Higher caps', 'Premium redemptions']
                            },
                            {
                                tier: 'Top',
                                icon: Crown,
                                monthlyCap: 500,
                                price: '$75+',
                                color: 'purple',
                                features: ['All mid features', 'Exclusive rewards', 'Priority support']
                            },
                            {
                                tier: 'Lifetime',
                                icon: Crown,
                                monthlyCap: 1000,
                                price: '$200+',
                                color: 'amber',
                                features: ['Maximum earning', 'Founder perks', 'Early access']
                            }
                        ].map((tier) => {
                            const IconComponent = tier.icon;
                            const colorClasses = {
                                green: 'bg-green-100 text-green-600',
                                blue: 'bg-blue-100 text-blue-600',
                                purple: 'bg-purple-100 text-purple-600',
                                amber: 'bg-amber-100 text-amber-600'
                            };
                            return (_jsx(Card, { className: "relative", children: _jsxs(CardContent, { className: "text-center p-6", children: [tier.tier === 'Top' && (_jsx("div", { className: "absolute -top-3 left-1/2 transform -translate-x-1/2", children: _jsx("span", { className: "bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold", children: "Most Popular" }) })), _jsx("div", { className: `w-12 h-12 ${colorClasses[tier.color]} rounded-lg flex items-center justify-center mx-auto mb-3`, children: _jsx(IconComponent, { className: "w-6 h-6" }) }), _jsx("h3", { className: "font-semibold text-anchor-800 mb-1", children: tier.tier }), _jsx("p", { className: "text-sm text-anchor-500 mb-3", children: tier.price }), _jsxs("div", { className: `${colorClasses[tier.color]} px-3 py-1 rounded font-bold text-sm mb-4`, children: [tier.monthlyCap, " tokens/month"] }), _jsx("ul", { className: "text-xs text-anchor-600 space-y-1", children: tier.features.map((feature, index) => (_jsxs("li", { children: ["\u2022 ", feature] }, index))) })] }) }, tier.tier));
                        }) })] })] }));
};
// Main Tokens Page Component
export const Tokens = () => {
    const { user } = useTokenStore();
    const [activeTab, setActiveTab] = useState('earn');
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-8", children: [_jsx(Coins, { className: "w-16 h-16 text-yellow-600 mx-auto mb-4" }), _jsx("h1", { className: "text-3xl font-bold text-yellow-900 mb-4", children: "Faith Tokens" }), _jsx("p", { className: "text-lg text-yellow-700 max-w-2xl mx-auto mb-6", children: "Earn rewards for faithful engagement. Every action matters in building your creator journey." }), !user && (_jsx("p", { className: "text-yellow-600 font-medium", children: "Sign up below to start earning tokens immediately!" }))] }), !user && _jsx(EmailLogin, {}), user && (_jsxs(_Fragment, { children: [_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "bg-white rounded-lg p-1 shadow-sm border border-anchor-200", children: [
                                { id: 'earn', label: 'Earn Tokens', icon: Zap },
                                { id: 'redeem', label: 'Redeem', icon: Gift },
                                { id: 'learn', label: 'How It Works', icon: Shield },
                            ].map(({ id, label, icon: Icon }) => (_jsxs("button", { onClick: () => setActiveTab(id), className: `
                    flex items-center space-x-2 px-4 py-2 rounded-md transition-colors font-medium
                    ${activeTab === id
                                    ? 'bg-primary-100 text-primary-700'
                                    : 'text-anchor-600 hover:text-anchor-900 hover:bg-anchor-50'}
                  `, children: [_jsx(Icon, { className: "w-4 h-4" }), _jsx("span", { children: label })] }, id))) }) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsx("div", { className: "lg:col-span-1", children: _jsx(TokenBalance, {}) }), _jsxs("div", { className: "lg:col-span-2", children: [activeTab === 'earn' && _jsx(EarnTokensPanel, {}), activeTab === 'redeem' && _jsx(TokenRedemptions, {}), activeTab === 'learn' && _jsx(TokenEducation, {})] })] })] })), _jsx(TokenOverview, {}), _jsxs("div", { className: "text-center bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-8", children: [_jsx("h3", { className: "text-xl font-bold text-primary-900 mb-4", children: "Ready to Start Your Token Journey?" }), _jsx("p", { className: "text-primary-700 max-w-2xl mx-auto mb-6", children: "Join thousands of faithful creators who are building their businesses with intention and earning rewards for every step." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsx(Link, { to: "/vault", children: _jsxs(Button, { variant: "outline", className: "flex items-center space-x-2", children: [_jsx(Gift, { className: "w-4 h-4" }), _jsx("span", { children: "Browse Vault" })] }) }), _jsx(Link, { to: "/focus", children: _jsxs(Button, { className: "flex items-center space-x-2", children: [_jsx(Trophy, { className: "w-4 h-4" }), _jsx("span", { children: "Start Earning" }), _jsx(ArrowRight, { className: "w-4 h-4" })] }) })] })] })] }));
};
import { ExternalLink, Download } from 'lucide-react';
const tierConfig = {
    free: {
        icon: Gift,
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-800',
        badgeColor: 'bg-green-100',
        label: 'FREE'
    },
    premium: {
        icon: Download,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-800',
        badgeColor: 'bg-blue-100',
        label: 'PREMIUM'
    },
    exclusive: {
        icon: Crown,
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200',
        textColor: 'text-purple-800',
        badgeColor: 'bg-purple-100',
        label: 'EXCLUSIVE'
    }
};
export const VaultTile = ({ product }) => {
    const config = tierConfig[product.tier];
    const IconComponent = config.icon;
    const { user, spendTokens } = useTokenStore();
    const [showTokenOption, setShowTokenOption] = useState(false);
    const handleClick = () => {
        window.open(product.url, '_blank');
    };
    const handleTokenDiscount = () => {
        if (user && user.tokens >= 100) {
            if (spendTokens(100, `discount_${product.id}`)) {
                // Generate unique discount code
                const discountCode = `FAITH${Date.now().toString().slice(-6)}`;
                // Copy to clipboard if available
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(discountCode);
                }
                alert(`🪙 Token Discount Applied!\n\nDiscount Code: ${discountCode}\n\nThis code gives you $5 off your purchase!\n${navigator.clipboard ? '\nCode copied to clipboard!' : '\nCopy this code for checkout.'}`);
                // Small delay then redirect
                setTimeout(() => handleClick(), 2000);
            }
        }
    };
    const canUseTokens = user && user.tokens >= 100 && product.tier !== 'free';
    return (_jsxs(Card, { className: `
        ${config.bgColor} ${config.borderColor} 
        transition-all duration-200 hover:shadow-lg hover:scale-[1.02]
        group relative overflow-hidden
      `, onMouseEnter: () => setShowTokenOption(true), onMouseLeave: () => setShowTokenOption(false), children: [_jsxs("div", { className: `
        absolute top-3 right-3 z-10
        ${config.badgeColor} ${config.textColor}
        px-2 py-1 rounded-full text-xs font-bold
        flex items-center space-x-1
      `, children: [_jsx(IconComponent, { className: "w-3 h-3" }), _jsx("span", { children: config.label })] }), canUseTokens && showTokenOption && (_jsx("div", { className: "absolute top-3 left-3 z-10 bg-yellow-100 border border-yellow-300 px-2 py-1 rounded-full", children: _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Coins, { className: "w-3 h-3 text-yellow-600" }), _jsx("span", { className: "text-xs font-bold text-yellow-700", children: "-100 for $5 off" })] }) })), _jsx(CardContent, { className: "p-6 pt-12", children: _jsxs("div", { className: "space-y-3", children: [_jsx("h3", { className: `font-semibold text-lg ${config.textColor} group-hover:text-opacity-90`, children: product.title }), _jsx("p", { className: "text-anchor-600 text-sm leading-relaxed", children: product.description }), _jsx("div", { className: "flex items-center justify-between pt-2", children: _jsx("span", { className: `text-xs font-medium ${config.textColor}`, children: product.category }) }), _jsxs("div", { className: "flex gap-2 pt-2", children: [_jsx(Button, { onClick: handleClick, className: "flex-1", size: "sm", children: product.url.startsWith('/downloads/') ? (_jsxs(_Fragment, { children: [_jsx(Download, { className: "w-4 h-4 mr-1" }), "Download"] })) : (_jsxs(_Fragment, { children: [_jsx(ExternalLink, { className: "w-4 h-4 mr-1" }), "View Product"] })) }), canUseTokens && (_jsxs(Button, { onClick: handleTokenDiscount, variant: "outline", size: "sm", className: "text-yellow-600 border-yellow-300 hover:bg-yellow-50 group", title: "Use 100 tokens for $5 discount", children: [_jsx(Coins, { className: "w-4 h-4 mr-1" }), _jsx("span", { className: "hidden sm:inline", children: "100" }), _jsx(Zap, { className: "w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" })] }))] }), user && user.tokens < 100 && product.tier !== 'free' && (_jsxs("p", { className: "text-xs text-anchor-500 bg-anchor-100 rounded px-2 py-1", children: ["\uD83D\uDCA1 Earn ", 100 - user.tokens, " more tokens for $5 discount"] }))] }) })] }));
};
export default async function handler(req, res) {
    // Only accept POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed',
            message: 'This endpoint only accepts POST requests'
        });
    }
    try {
        const payload = req.body;
        // Log incoming webhook for debugging
        console.log('📥 Gumroad webhook received:', {
            email: payload.email,
            price: payload.price,
            product_name: payload.product_name,
            sale_id: payload.sale_id,
            test: payload.test
        });
        // Validate required fields
        if (!payload.email || typeof payload.price !== 'number') {
            return res.status(400).json({
                error: 'Invalid payload',
                message: 'Missing required fields: email, price'
            });
        }
        // Calculate token reward (5 tokens per $1)
        const tokensEarned = Math.floor(payload.price * 5);
        // Determine tier upgrade based on purchase amount
        let newTier = 'free';
        let tierUpgraded = false;
        if (payload.price >= 200) {
            newTier = 'lifetime';
            tierUpgraded = true;
        }
        else if (payload.price >= 75) {
            newTier = 'top';
            tierUpgraded = true;
        }
        else if (payload.price >= 25) {
            newTier = 'mid';
            tierUpgraded = true;
        }
        // Create token transaction record
        const tokenTransaction = {
            id: `gumroad_${payload.sale_id}`,
            email: payload.email.toLowerCase(),
            action: 'earn',
            amount: tokensEarned,
            source: 'purchase',
            productId: payload.product_id,
            metadata: {
                gumroadSaleId: payload.sale_id,
                productName: payload.product_name,
                price: payload.price,
                currency: payload.currency,
                orderNumber: payload.order_number,
                test: payload.test
            },
            timestamp: new Date(payload.sale_timestamp),
        };
        // TODO: Save to your database
        // Example with Supabase:
        /*
        const { error } = await supabase
          .from('token_transactions')
          .insert([tokenTransaction])
        
        if (error) throw error
        
        if (tierUpgraded) {
          await supabase
            .from('users')
            .update({ tier: newTier })
            .eq('email', payload.email.toLowerCase())
        }
        */
        // For MVP: Log the transaction (replace with database save)
        console.log('🪙 Token transaction to save:', tokenTransaction);
        if (tierUpgraded) {
            console.log(`🎉 Tier upgrade for ${payload.email}: ${newTier}`);
        }
        // TODO: Send email notification to user
        // Example email content:
        /*
        const emailContent = {
          to: payload.email,
          subject: `🪙 You earned ${tokensEarned} Faith Tokens!`,
          html: `
            <h2>Thank you for your purchase!</h2>
            <p>You've earned <strong>${tokensEarned} Faith Tokens</strong> for purchasing ${payload.product_name}.</p>
            ${tierUpgraded ? `<p>🎉 Congratulations! You've been upgraded to <strong>${newTier}</strong> tier!</p>` : ''}
            <p>Visit your <a href="${process.env.FRONTEND_URL}/tokens">token dashboard</a> to see your balance and redeem rewards.</p>
          `
        }
        */
        // Success response
        const response = {
            success: true,
            tokensAwarded: tokensEarned,
            newTier: tierUpgraded ? newTier : null,
            tierUpgraded,
            saleId: payload.sale_id,
            test: payload.test,
            message: `Successfully processed token award for ${payload.email}`
        };
        console.log('✅ Webhook processed successfully:', response);
        return res.status(200).json(response);
    }
    catch (error) {
        console.error('❌ Webhook processing error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to process webhook',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
