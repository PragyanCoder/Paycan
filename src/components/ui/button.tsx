import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild, ...props }, ref) => {
    const Comp = asChild ? 'div' : 'button';
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      primary: "bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500",
      secondary: "bg-secondary-600 text-white hover:bg-secondary-700 focus-visible:ring-secondary-500",
      outline: "border border-gray-300 bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500",
      accent: "bg-accent-500 text-white hover:bg-accent-600 focus-visible:ring-accent-400"
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-10 px-6 text-base",
      lg: "h-11 px-8 text-lg"
    };

    return (
      <Comp
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };