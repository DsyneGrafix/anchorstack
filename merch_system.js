import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
export const MerchRewardModal = ({ isOpen, onClose, merchItem, rewardCode }) => {
    const copyCode = () => {
        navigator.clipboard.writeText(rewardCode);
        // Could add toast notification here
    };
    if (!isOpen)
        return null;
    return className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" >
        className;
    "max-w-md w-full bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300" >
        className;
    "p-6 text-center" >
        className;
    "text-4xl mb-4" > ;
    /div>
        < h2;
    className = "text-xl font-bold text-orange-900 mb-2" >
        Treasure;
    Unlocked
        < /h2>
        < p;
    className = "text-orange-700 mb-4" >
        You;
    've earned exclusive access to:
        < /p>
        < div;
    className = "bg-white rounded-lg p-4 mb-4 border border-orange-200" >
        className;
    "font-semibold text-gray-900" > { merchItem, : .title } < /h3>
        < p;
    className = "text-sm text-gray-600 mt-1" > { merchItem, : .description } < /p>;
    {
        merchItem.tier === 'free' ? className = "inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-2" >
            FREE : ;
        DOWNLOAD
            < /span>;
    }
};
className = "inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mt-2" >
    EXCLUSIVE;
DISCOUNT
    < /span>;
/div>
    < div;
className = "bg-gray-100 rounded-lg p-3 mb-4" >
    className;
"text-xs text-gray-600 mb-1" > Your;
Reward;
Code: /p>
    < div;
className = "flex items-center justify-between bg-white rounded px-3 py-2 border" >
    className;
"text-sm font-mono text-gray-900" > { rewardCode } < /code>
    < Button;
onClick = { copyCode };
variant = "ghost";
size = "sm";
className = "p-1 h-auto"
    >
        className;
"w-4 h-4" /  >
    /Button>
    < /div>
    < /div>
    < div;
className = "flex space-x-3" >
    onClick;
{
    () => window.open(merchItem.shopUrl, '_blank');
}
className = "flex-1 bg-orange-600 hover:bg-orange-700"
    >
        className;
"w-4 h-4 mr-2" /  >
    Claim;
Treasure
    < /Button>
    < Button;
onClick = { onClose };
variant = "outline";
className = "flex-1"
    >
        Later
    < /Button>
    < /div>
    < /CardContent>
    < /Card>
    < /div>;
export const MerchTile = ({ item, onUnlock }) => {
    const getTierColor = (tier) => {
        switch (tier) {
            case 'free': return 'bg-green-50 border-green-200 text-green-800';
            case 'mid': return 'bg-blue-50 border-blue-200 text-blue-800';
            case 'high': return 'bg-purple-50 border-purple-200 text-purple-800';
            default: return 'bg-gray-50 border-gray-200 text-gray-800';
        }
    };
    const getCategoryIcon = (category) => {
        switch (category) {
            case 'bootyquest': return '🏴‍☠️';
            case 'anchorstack': return '⚓';
            case 'combo': return '🔥';
            default: return '🎁';
        }
    };
    return className = {} `transition-all duration-200 hover:shadow-lg ${item.isUnlocked ? 'cursor-pointer hover:scale-105' : 'opacity-75'}`;
};
 >
    className;
"p-4" >
    className;
"flex items-start justify-between mb-3" >
    className;
"text-2xl" > { getCategoryIcon(item) { }, : .category } < /span>
    < span;
className = {} `text-xs px-2 py-1 rounded-full font-medium ${getTierColor(item.tier)}`;
 >
    { item, : .tier.toUpperCase() }
    < /span>
    < /div>
    < h3;
className = "font-semibold text-gray-900 mb-1" > { item, : .title } < /h3>
    < p;
className = "text-sm text-gray-600 mb-3 line-clamp-2" > { item, : .description } < /p>;
{
    item.isUnlocked ? onClick = {}() : ;
    window.open(item.shopUrl, '_blank');
}
className = "w-full";
size = "sm"
    >
        className;
"w-4 h-4 mr-2" /  >
    { item, : .tier === 'free' ? 'Download' : `$${item.price}` }
    < /Button>;
className = "flex items-center justify-center space-x-2 py-2 text-gray-500" >
    className;
"w-4 h-4" /  >
    className;
"text-sm" >
    { item, : .unlockCondition?.type === 'quest_complete' && 'Complete Quest' };
{
    item.unlockCondition?.type === 'vault_access' && 'Unlock Vault';
}
{
    item.unlockCondition?.type === 'timer_sessions' && `${item.unlockCondition.value} Focus Sessions`;
}
/span>
    < /div>;
/CardContent>
    < /Card>;
// src/pages/Merch.tsx
import { useState } from 'react';
// Mock data - replace with your real merch catalog
const merchItems = [
    {
        id: 'founding-crew-tee',
        title: 'Founding Crew Tee',
        description: 'Limited edition shirt for early BootyQuest adventurers',
        price: 25,
        category: 'bootyquest',
        tier: 'high',
        imageUrl: '/images/founding-crew-tee.jpg',
        shopUrl: 'https://your-store.com/founding-crew-tee',
        unlockCondition: { type: 'quest_complete', value: 'treasure_map_1' },
        isUnlocked: true, // Set based on user progress
        rewardCode: 'CREW2024'
    },
    {
        id: 'pirate-map-poster',
        title: 'Treasure Map Poster',
        description: 'High-quality print of the complete BootyQuest world',
        price: 0,
        category: 'bootyquest',
        tier: 'free',
        imageUrl: '/images/treasure-map.jpg',
        shopUrl: 'https://your-store.com/free-map-download',
        unlockCondition: { type: 'vault_access', value: 'any' },
        isUnlocked: true,
        rewardCode: 'FREEMAP'
    },
    {
        id: 'focus-deck',
        title: 'AnchorStack Focus Cards',
        description: 'Physical deck for analog Pomodoro sessions',
        price: 15,
        category: 'anchorstack',
        tier: 'mid',
        imageUrl: '/images/focus-cards.jpg',
        shopUrl: 'https://your-store.com/focus-cards',
        unlockCondition: { type: 'timer_sessions', value: 25 },
        isUnlocked: false
    }
];
export const Merch = () => {
    const [selectedReward, setSelectedReward] = useState(null);
    const groupedMerch = merchItems.reduce((acc, item) => {
        if (!acc[item.category])
            acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});
    return className = "space-y-8" >
        className;
    "text-center" >
        className;
    "text-3xl font-bold text-anchor-900 mb-2" >
        Treasure;
    Trove
        < /h1>
        < p;
    className = "text-anchor-600 max-w-2xl mx-auto" >
        Unlock;
    exclusive;
    merch;
    through;
    your;
    AnchorStack;
    journey.Complete;
    quests,
        master;
    focus;
    sessions, and;
    claim;
    your;
    rewards.
        < /p>
        < /div>;
    { /* Progress Stats */ }
    className;
    "grid grid-cols-1 md:grid-cols-3 gap-6" >
        className;
    "bg-green-50 border-green-200" >
        className;
    "text-center py-6" >
        className;
    "text-2xl font-bold text-green-600 mb-2" >
        { merchItems, : .filter(item => item.isUnlocked && item.tier === 'free').length }
        < /div>
        < div;
    className = "text-sm text-green-700" > Free;
    Treasures;
    Unlocked < /div>
        < /CardContent>
        < /Card>
        < Card;
    className = "bg-blue-50 border-blue-200" >
        className;
    "text-center py-6" >
        className;
    "text-2xl font-bold text-blue-600 mb-2" >
        { merchItems, : .filter(item => item.isUnlocked && item.tier !== 'free').length }
        < /div>
        < div;
    className = "text-sm text-blue-700" > Premium;
    Access;
    Earned < /div>
        < /CardContent>
        < /Card>
        < Card;
    className = "bg-purple-50 border-purple-200" >
        className;
    "text-center py-6" >
        className;
    "text-2xl font-bold text-purple-600 mb-2" >
        { merchItems, : .filter(item => !item.isUnlocked).length }
        < /div>
        < div;
    className = "text-sm text-purple-700" > Still;
    to;
    Unlock < /div>
        < /CardContent>
        < /Card>
        < /div>;
    { /* Merch Categories */ }
    {
        Object.entries(groupedMerch).map(([category, items]) => key = { category }, className = "space-y-4" >
            className, "text-xl font-semibold text-anchor-800 border-b border-anchor-200 pb-2 capitalize" >
            { category } === 'bootyquest' ? '🏴‍☠️ BootyQuest Collection' :
            category === 'anchorstack' ? '⚓ AnchorStack Gear' :
                '🔥 Combo Treasures');
    }
    /h2>
        < div;
    className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
        { items, : .map((item) => key = { item, : .id }, item = { item }, onUnlock = {}()) };
};
setSelectedReward(item);
/>;
/div>
    < /div>;
{ /* Reward Modal */ }
{
    selectedReward && isOpen;
    {
        !!selectedReward;
    }
    onClose = {}();
    setSelectedReward(null);
}
merchItem = { selectedReward };
rewardCode = { selectedReward, : .rewardCode || 'REWARD2024' }
    /  >
;
/div>;
