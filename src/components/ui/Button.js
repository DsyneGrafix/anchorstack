import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '@/utils/cn';
export const Button = ({ variant = 'default', size = 'md', className, children, ...props }) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none';
    const variants = {
        default: 'bg-primary-600 text-white hover:bg-primary-700',
        outline: 'border border-anchor-300 bg-white text-anchor-700 hover:bg-anchor-50',
        ghost: 'text-anchor-700 hover:bg-anchor-100'
    };
    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base'
    };
    return (_jsx("button", { className: cn(baseClasses, variants[variant], sizes[size], className), ...props, children: children }));
};
