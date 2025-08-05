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
// src/pages/Tokens.tsx - Complete Token Dashboard
import { useState } from 'react';
import { Gift, Star, Crown, Zap, Users, Trophy, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTokenStore } from '@/store/useTokenStore';
import { Card, CardContent } from '@/components/ui/Card';
export const Tokens = () => {
    const { user } = useTokenStore();
    const [activeTab, setActiveTab] = useState('earn');
    return className = "space-y-8" >
        { /* Hero Section */}
        < div;
    className = "text-center bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-8" >
        className;
    "w-16 h-16 text-yellow-600 mx-auto mb-4" /  >
        className;
    "text-3xl font-bold text-yellow-900 mb-4" >
        Faith;
    Tokens
        < /h1>
        < p;
    className = "text-lg text-yellow-700 max-w-2xl mx-auto mb-6" >
        Earn;
    rewards;
    for (faithful; engagement.Every; action)
        matters in building;
    your;
    creator;
    journey.
        < /p>;
    {
        !user && className;
        "text-yellow-600 font-medium" >
            Sign;
        up;
        below;
        to;
        start;
        earning;
        tokens;
        immediately
            < /p>;
    }
};
/div>;
{ /* Login Component */ }
{
    !user && />;
}
{ /* User Dashboard */ }
{
    user && ({ /* Tab Navigation */}
        < div);
    className = "flex justify-center" >
        className;
    "bg-white rounded-lg p-1 shadow-sm border border-anchor-200" >
        { [{ id: 'earn', label: 'Earn Tokens', icon: Zap },
                { id: 'redeem', label: 'Redeem', icon: Gift },
                { id: 'learn', label: 'How It Works', icon: Shield },
            ]: .map(({ id, label, icon: Icon }) => key = { id }, onClick = {}(), setActiveTab(id)) };
    className = {} `
                    flex items-center space-x-2 px-4 py-2 rounded-md transition-colors font-medium
                    ${activeTab === id
        ? 'bg-primary-100 text-primary-700'
        : 'text-anchor-600 hover:text-anchor-900 hover:bg-anchor-50'}
                  `;
}
    >
        className;
"w-4 h-4" /  >
    { label } < /span>
    < /button>;
/div>
    < /div>;
{ /* Tab Content */ }
className;
"grid grid-cols-1 lg:grid-cols-3 gap-8" >
    { /* Sidebar - Always show balance */}
    < div;
className = "lg:col-span-1" >
    />
    < /div>;
{ /* Main Content */ }
className;
"lg:col-span-2" >
    { activeTab } === 'earn' && />;
{
    activeTab === 'redeem' && />;
}
{
    activeTab === 'learn' && />;
}
/div>
    < /div>
    < />;
{ /* How It Works Section (Always Visible) */ }
/>;
{ /* Call to Action */ }
className;
"text-center bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-8" >
    className;
"text-xl font-bold text-primary-900 mb-4" >
    Ready;
to;
Start;
Your;
Token;
Journey ?
    /h3>
        < p : ;
className = "text-primary-700 max-w-2xl mx-auto mb-6" >
    Join;
thousands;
of;
faithful;
creators;
who;
are;
building;
their;
businesses;
with (intention)
    and;
earning;
rewards;
for (every; step.
    < /p>
    < div; className = "flex flex-col sm:flex-row gap-4 justify-center" >
    to)
     = "/vault" >
        variant;
"outline";
className = "flex items-center space-x-2" >
    className;
"w-4 h-4" /  >
    Browse;
Vault < /span>
    < /Button>
    < /Link>
    < Link;
to = "/focus" >
    className;
"flex items-center space-x-2" >
    className;
"w-4 h-4" /  >
    Start;
Earning < /span>
    < ArrowRight;
className = "w-4 h-4" /  >
    /Button>
    < /Link>
    < /div>
    < /div>
    < /div>;
// Token Education Component
const TokenEducation = () => {
    return className = "space-y-6" >
        Faith;
    Token;
    System < /CardTitle>
        < /CardHeader>
        < CardContent;
    className = "space-y-4" >
        className;
    "font-semibold text-anchor-800 mb-2" > What;
    are;
    Faith;
    Tokens ? /h4>
        < p : ;
    className = "text-anchor-600 text-sm" >
        Faith;
    Tokens;
    are;
    our;
    way;
    of;
    rewarding;
    consistent;
    engagement;
    and;
    loyal;
    community;
    participation.
    ;
    Think;
    of;
    them;
    points;
    that;
    have;
    real;
    value in the;
    AnchorStack;
    ecosystem.
        < /p>
        < /div>
        < div >
        className;
    "font-semibold text-anchor-800 mb-2" > Why;
    "Faith";
    Tokens ? /h4>
        < p : ;
    className = "text-anchor-600 text-sm" >
        Because;
    building;
    a;
    creator;
    business;
    requires;
    faith - faith in your;
    vision, faith in the;
    process,
        and;
    faith in showing;
    up;
    consistently.We;
    reward;
    that;
    faithfulness.
        < /p>
        < /div>
        < div >
        className;
    "font-semibold text-anchor-800 mb-2" > Fair;
    Play;
    Promise < /h4>
        < p;
    className = "text-anchor-600 text-sm" >
        Our;
    system;
    has;
    built -  in limits;
    to;
    prevent;
    abuse;
    and;
    ensure;
    everyone;
    has;
    a;
    fair;
    chance;
    to;
    earn.
    ;
    Higher;
    membership;
    tiers;
    unlock;
    better;
    earning;
    potential;
    invest;
    more in your;
    creator;
    journey.
        < /p>
        < /div>
        < /CardContent>
        < /Card>
        < Card;
    className = "bg-blue-50 border-blue-200" >
        className;
    "p-6" >
        className;
    "font-semibold text-blue-800 mb-3 flex items-center" >
        className;
    "w-5 h-5 mr-2" /  >
        Token;
    Security & Limits
        < /h4>
        < div;
    className = "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm" >
        className;
    "font-medium text-blue-700 mb-1" > Daily;
    Limits < /div>
        < ul;
    className = "text-blue-600 space-y-0.5" >
    ;
    Login: 2;
    tokens / day;
    max < (/li>);
    Quests: 50;
    tokens / day;
    max < (/li>);
    Social: 15;
    tokens / week;
    max < /li>
        < /ul>
        < /div>
        < div >
        className;
    "font-medium text-blue-700 mb-1" > Monthly;
    Caps;
    by;
    Tier < /div>
        < ul;
    className = "text-blue-600 space-y-0.5" >
    ;
    Free: 100;
    tokens / month < (/li>);
    Mid: 300;
    tokens / month < (/li>);
    Top: 500;
    tokens / month < (/li>);
    Lifetime: 1000;
    tokens / month < /li>
        < /ul>
        < /div>
        < /div>
        < /CardContent>
        < /Card>
        < /div>;
};
// Token Overview Component
const TokenOverview = () => {
    return className = "space-y-8" >
        { /* How to Earn */}
        < div >
        className;
    "text-2xl font-bold text-anchor-900 mb-6 text-center" > How;
    to;
    Earn;
    Faith;
    Tokens < /h2>
        < div;
    className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" >
        { [{
                title: 'Daily Check-in',
                description: 'Log in every day',
                icon: Zap,
                tokens: '2/day',
                color: 'green'
            },
                {
                    title: 'Complete Quests',
                    description: 'Focus sessions & BootyQuest',
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
                }]: .map((method) => {
                const IconComponent = method.icon;
                return key = { method, : .title };
                className = "text-center" >
                    className;
                "p-6" >
                    className;
                {
                    `w-12 h-12 bg-${method.color}-100 rounded-lg flex items-center justify-center mx-auto mb-3`;
                }
                 >
                    className;
                {
                    `w-6 h-6 text-${method.color}-600`;
                }
                />
                    < /div>
                    < h3;
                className = "font-semibold text-anchor-800 mb-2" > { method, : .title } < /h3>
                    < p;
                className = "text-sm text-anchor-600 mb-3" > { method, : .description } < /p>
                    < div;
                className = {} `bg-${method.color}-100 text-${method.color}-700 px-2 py-1 rounded text-xs font-bold`;
            },  >
                +{ method, : .tokens }
                < /div>
                < /CardContent>
                < /Card>)
        };
};
/div>
    < /div>;
{ /* Membership Tiers */ }
className;
"text-2xl font-bold text-anchor-900 mb-6 text-center" > Membership;
Tiers < /h2>
    < div;
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" >
    { [{
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
            }]: .map((tier) => {
            const IconComponent = tier.icon;
            return key = { tier, : .tier };
            className = "relative" >
                className;
            "text-center p-6" >
                { tier, : .tier === 'Top' && className, "absolute -top-3 left-1/2 transform -translate-x-1/2":  >
                        className, "bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold":  >
                        Most } / span >
                /div>;
        }) }
    < div;
className = {} `w-12 h-12 bg-${tier.color}-100 rounded-lg flex items-center justify-center mx-auto mb-3`;
 >
    className;
{
    `w-6 h-6 text-${tier.color}-600`;
}
/>
    < /div>
    < h3;
className = "font-semibold text-anchor-800 mb-1" > { tier, : .tier } < /h3>
    < p;
className = "text-sm text-anchor-500 mb-3" > { tier, : .price } < /p>
    < div;
className = {} `bg-${tier.color}-100 text-${tier.color}-700 px-3 py-1 rounded font-bold text-sm mb-4`;
 >
    { tier, : .monthlyCap };
tokens / month
    < /div>
    < ul;
className = "text-xs text-anchor-600 space-y-1" >
    { tier, : .features.map((feature, index) => key = { index } > , { feature } < /li>) }
    < /ul>
    < /CardContent>
    < /Card>;
/div>
    < /div>
    < /div>;
import { Download } from 'lucide-react';
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
    return className = {} `
        ${config.bgColor} ${config.borderColor} 
        transition-all duration-200 hover:shadow-lg hover:scale-[1.02]
        group relative overflow-hidden
      `;
};
onMouseEnter = {}();
setShowTokenOption(true);
onMouseLeave = {}();
setShowTokenOption(false);
    >
        { /* Tier Badge */}
    < div;
className = {} `
        absolute top-3 right-3 z-10
        ${config.badgeColor} ${config.textColor}
        px-2 py-1 rounded-full text-xs font-bold
        flex items-center space-x-1
      `;
 >
    className;
"w-3 h-3" /  >
    { config, : .label } < /span>
    < /div>;
{ /* Token Discount Badge */ }
{
    canUseTokens && showTokenOption && className;
    "absolute top-3 left-3 z-10 bg-yellow-100 border border-yellow-300 px-2 py-1 rounded-full" >
        className;
    "flex items-center space-x-1" >
        className;
    "w-3 h-3 text-yellow-600" /  >
        className;
    "text-xs font-bold text-yellow-700" > -100;
    for ($5; off < /span>
        < /div>
        < /div>;)
        ;
}
className;
"p-6 pt-12" >
    className;
"space-y-3" >
    className;
{
    `font-semibold text-lg ${config.textColor} group-hover:text-opacity-90`;
}
 >
    { product, : .title }
    < /h3>
    < p;
className = "text-anchor-600 text-sm leading-relaxed" >
    { product, : .description }
    < /p>
    < div;
className = "flex items-center justify-between pt-2" >
    className;
{
    `text-xs font-medium ${config.textColor}`;
}
 >
    { product, : .category }
    < /span>
    < /div>;
{ /* Action Buttons */ }
className;
"flex gap-2 pt-2" >
    onClick;
{
    handleClick;
}
className = "flex-1";
size = "sm"
    >
        { product, : .url.startsWith('/downloads/') ? className = "w-4 h-4 mr-1" /  >
                Download
                < />
                :
        }(className, "w-4 h-4 mr-1" /  >
            View, Product
            < />);
/Button>;
{ /* Token Discount Button */ }
{
    canUseTokens && onClick;
    {
        handleTokenDiscount;
    }
    variant = "outline";
    size = "sm";
    className = "text-yellow-600 border-yellow-300 hover:bg-yellow-50 group";
    title = "Use 100 tokens for $5 discount"
        >
            className;
    "w-4 h-4 mr-1" /  >
        className;
    "hidden sm:inline" > 100 < /span>
        < Zap;
    className = "w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /  >
        /Button>;
}
/div>;
{ /* Token Hint */ }
{
    user && user.tokens < 100 && product.tier !== 'free' && className;
    "text-xs text-anchor-500 bg-anchor-100 rounded px-2 py-1" >
    ;
    Earn;
    {
        100 - user.tokens;
    }
    more;
    tokens;
    for ($5; discount
        < /p>;)
        ;
}
/div>
    < /CardContent>
    < /Card>;
