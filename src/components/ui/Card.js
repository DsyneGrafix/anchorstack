import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '@/utils/cn';
export const Card = ({ className, children, ...props }) => {
    return (_jsx("div", { className: cn('rounded-lg border border-anchor-200 bg-white shadow-sm', className), ...props, children: children }));
};
export const CardHeader = ({ className, children, ...props }) => {
    return (_jsx("div", { className: cn('flex flex-col space-y-1.5 p-6 pb-4', className), ...props, children: children }));
};
export const CardTitle = ({ className, children, ...props }) => {
    return (_jsx("h3", { className: cn('text-lg font-semibold leading-none tracking-tight text-anchor-900', className), ...props, children: children }));
};
export const CardContent = ({ className, children, ...props }) => {
    return (_jsx("div", { className: cn('p-6 pt-0', className), ...props, children: children }));
};
