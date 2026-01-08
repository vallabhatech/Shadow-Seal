import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary hover:bg-blue-600 text-white focus:ring-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-white focus:ring-slate-500',
    danger: 'bg-danger hover:bg-red-600 text-white focus:ring-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]',
    ghost: 'bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};