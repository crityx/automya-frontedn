import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeSlash } from 'phosphor-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type = 'text', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === 'password';

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-black mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type={isPasswordType ? (showPassword ? 'text' : 'password') : type}
            ref={ref}
            className={cn(
              'w-full px-4 py-3 rounded-lg border-2 border-gray/30 bg-gray/5 text-black placeholder-gray/60 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              isPasswordType && 'pr-12',
              className
            )}
            {...props}
          />
          {isPasswordType && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray hover:text-primary transition-colors"
            >
              {showPassword ? (
                <EyeSlash size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;