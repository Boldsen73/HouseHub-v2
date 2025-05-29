
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface ValidatedInputProps extends React.ComponentProps<typeof Input> {
  label?: string;
  error?: string;
  required?: boolean;
  touched?: boolean;
}

const ValidatedInput = React.forwardRef<HTMLInputElement, ValidatedInputProps>(
  ({ label, error, required, touched, className, ...props }, ref) => {
    const hasError = touched && error;
    
    return (
      <div className="space-y-2">
        {label && (
          <Label htmlFor={props.id} className={cn(hasError && "text-red-600")}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        )}
        <Input
          ref={ref}
          className={cn(
            hasError && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          {...props}
        />
        {hasError && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

ValidatedInput.displayName = "ValidatedInput";

export { ValidatedInput };
