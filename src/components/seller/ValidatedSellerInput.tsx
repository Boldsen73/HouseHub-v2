
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface ValidatedSellerInputProps extends React.ComponentProps<typeof Input> {
  label: string;
  error?: string;
  required?: boolean;
  touched?: boolean;
  formatType?: 'currency' | 'number' | 'postalCode' | 'year' | 'area';
  onFormatChange?: (formattedValue: string, rawValue: string) => void;
}

const ValidatedSellerInput = React.forwardRef<HTMLInputElement, ValidatedSellerInputProps>(
  ({ label, error, required, touched, formatType, onFormatChange, className, onChange, ...props }, ref) => {
    const hasError = touched && error;
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      let formattedValue = value;
      let rawValue = value;

      if (formatType) {
        // Extract numbers only for formatting
        const numbers = value.replace(/[^\d]/g, '');
        rawValue = numbers;

        switch (formatType) {
          case 'currency':
            if (numbers) {
              formattedValue = `${parseInt(numbers).toLocaleString('da-DK')} kr`;
            } else {
              formattedValue = '';
            }
            break;
          case 'number':
          case 'area':
            if (numbers) {
              formattedValue = parseInt(numbers).toLocaleString('da-DK');
            } else {
              formattedValue = '';
            }
            break;
          case 'postalCode':
            formattedValue = numbers.slice(0, 4);
            break;
          case 'year':
            formattedValue = numbers.slice(0, 4);
            break;
          default:
            formattedValue = value;
        }

        // Update the input value
        e.target.value = formattedValue;
        
        if (onFormatChange) {
          onFormatChange(formattedValue, rawValue);
        }
      }

      if (onChange) {
        onChange(e);
      }
    };
    
    return (
      <div className="space-y-2">
        <Label htmlFor={props.id} className={cn(hasError && "text-red-600")}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <Input
          ref={ref}
          className={cn(
            hasError && "border-red-500 focus-visible:ring-red-500 bg-red-50",
            className
          )}
          onChange={handleChange}
          {...props}
        />
        {hasError && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">!</span>
            {error}
          </p>
        )}
      </div>
    );
  }
);

ValidatedSellerInput.displayName = "ValidatedSellerInput";

export { ValidatedSellerInput };
