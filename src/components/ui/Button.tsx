
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const base = "rounded-2xl font-bold transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2";

  const sizes = {
    sm: "py-2 px-4 text-sm",
    md: "py-3.5 px-8 text-[16px]",
    lg: "py-4 px-10 text-lg"
  };

  const variants = {
    primary: "bg-[#186ade] text-white shadow-xl shadow-blue-500/30 hover:bg-[#1559bc]",
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

