import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/components/FocusTimer.tsx
import { useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Target } from 'lucide-react';
import { useTimerStore } from '@/store/useTimerStore';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
export const FocusTimer = () => {
    const { timeLeft, isActive, currentSession, sessionsCompleted, isBreak, startTimer, pauseTimer, resetTimer, tick } = useTimerStore();
    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                tick();
            }, 1000);
        }
        else if (timeLeft === 0) {
            resetTimer();
        }
        return () => {
            if (interval)
                clearInterval(interval);
        };
    }, [isActive, timeLeft, tick, resetTimer]);
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    const getSessionType = () => {
        if (isBreak) {
            return sessionsCompleted % 4 === 0 && sessionsCompleted > 0 ? 'Long Break' : 'Short Break';
        }
        return 'Focus Session';
    };
    const getProgress = () => {
        const totalTime = isBreak
            ? (sessionsCompleted % 4 === 0 && sessionsCompleted > 0 ? 15 * 60 : 5 * 60)
            : 25 * 60;
        return ((totalTime - timeLeft) / totalTime) * 100;
    };
    return (_jsxs(Card, { className: "bg-white border-2 border-primary-200", children: [_jsx(CardHeader, { className: "text-center", children: _jsxs(CardTitle, { className: "flex items-center justify-center space-x-2", children: [isBreak ? (_jsx(Coffee, { className: "w-5 h-5 text-green-500" })) : (_jsx(Target, { className: "w-5 h-5 text-primary-500" })), _jsx("span", { className: isBreak ? 'text-green-600' : 'text-primary-600', children: getSessionType() })] }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsx("div", { className: "text-center", children: _jsxs("div", { className: "relative inline-block", children: [_jsxs("svg", { className: "w-48 h-48 transform -rotate-90", viewBox: "0 0 100 100", children: [_jsx("circle", { cx: "50", cy: "50", r: "45", fill: "none", stroke: "#e5e7eb", strokeWidth: "4" }), _jsx("circle", { cx: "50", cy: "50", r: "45", fill: "none", stroke: isBreak ? "#10b981" : "#3b82f6", strokeWidth: "4", strokeLinecap: "round", strokeDasharray: `${2 * Math.PI * 45}`, strokeDashoffset: `${2 * Math.PI * 45 * (1 - getProgress() / 100)}`, className: "transition-all duration-1000 ease-in-out" })] }), _jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [_jsx("div", { className: "text-4xl font-bold text-anchor-900 font-mono", children: formatTime(timeLeft) }), _jsxs("div", { className: "text-sm text-anchor-600 mt-1", children: ["Session ", currentSession] })] })] }) }), _jsxs("div", { className: "flex justify-center space-x-4", children: [_jsx(Button, { onClick: isActive ? pauseTimer : startTimer, className: `px-6 py-2 ${isActive
                                    ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                    : isBreak
                                        ? 'bg-green-500 hover:bg-green-600 text-white'
                                        : 'bg-primary-500 hover:bg-primary-600 text-white'}`, children: isActive ? (_jsxs(_Fragment, { children: [_jsx(Pause, { className: "w-4 h-4 mr-2" }), "Pause"] })) : (_jsxs(_Fragment, { children: [_jsx(Play, { className: "w-4 h-4 mr-2" }), "Start"] })) }), _jsxs(Button, { onClick: resetTimer, variant: "outline", className: "px-6 py-2", children: [_jsx(RotateCcw, { className: "w-4 h-4 mr-2" }), "Reset"] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 pt-4 border-t border-anchor-200", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-primary-600", children: sessionsCompleted }), _jsx("div", { className: "text-sm text-anchor-600", children: "Completed" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: Math.floor(sessionsCompleted / 4) }), _jsx("div", { className: "text-sm text-anchor-600", children: "Cycles Done" })] })] }), _jsx("div", { className: "text-center p-3 bg-anchor-50 rounded-md", children: _jsxs("p", { className: "text-sm text-anchor-600", children: ["Up next: ", isBreak
                                    ? 'Focus Session'
                                    : sessionsCompleted > 0 && (sessionsCompleted + 1) % 4 === 0
                                        ? 'Long Break (15 min)'
                                        : 'Short Break (5 min)'] }) })] })] }));
};
export default FocusTimer;
