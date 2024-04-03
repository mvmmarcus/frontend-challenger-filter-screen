import { ComponentProps, ReactNode } from 'react';

import { cn } from '../../../app/utils/cn';

interface ButtonProps extends ComponentProps<'button'> {
  size?: 'small' | 'normal';
  variant?: 'outlined' | 'filled';
  icon?: ReactNode;
}

export function Button({
  children,
  className,
  disabled,
  size = 'normal',
  variant = 'filled',
  icon,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(
        `flex gap-1 justify-center items-center text-white rounded-md font-normal px-[10px] text-sm
      disabled:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed border-4 border-transparent transition-all`,
        size === 'normal' ? 'py-3 h-10' : 'py-1 h-6',
        variant === 'outlined'
          ? 'bg-transparent border-solid border-[1px] border-colors-border-grey text-colors-text-grey'
          : 'bg-colors-filter-black text-colors-text-white',
        className
      )}
    >
      {children}
      {icon && icon}
    </button>
  );
}
