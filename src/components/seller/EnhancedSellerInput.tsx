
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface EnhancedSellerInputProps {
  label: string;
  error?: string;
  required?: boolean;
  touched?: boolean;
  formatType?: 'currency' | 'number' | 'postalCode' | 'year' | 'area';
  onFormatChange?: (formattedValue: string, rawValue: string) => void;
  type?: 'input' | 'textarea';
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  id?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

const EnhancedSellerInput = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, EnhancedSellerInputProps>(
  ({ label, error, required, touched, formatType, onFormatChange, className, onChange, type = 'input', ...props }, ref) => {
    const hasError = touched && error;
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      let formattedValue = value;
      let rawValue = value;

      if (formatType && type === 'input') {
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

        e.target.value = formattedValue;
        
        if (onFormatChange) {
          onFormatChange(formattedValue, rawValue);
        }
      }

      if (onChange) {
        onChange(e);
      }
    };
    
    const inputClasses = cn(
      hasError && "border-red-500 focus-visible:ring-red-500 bg-red-50",
      className
    );
    
    return (
      <div className="space-y-2">
        <Label htmlFor={props.id} className={cn(hasError && "text-red-600")}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {type === 'textarea' ? (
          <Textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={inputClasses}
            onChange={handleChange}
            id={props.id}
            name={props.name}
            value={props.value}
            placeholder={props.placeholder}
            disabled={props.disabled}
            readOnly={props.readOnly}
          />
        ) : (
          <Input
            ref={ref as React.Ref<HTMLInputElement>}
            className={inputClasses}
            onChange={handleChange}
            id={props.id}
            name={props.name}
            value={props.value}
            placeholder={props.placeholder}
            disabled={props.disabled}
            readOnly={props.readOnly}
          />
        )}
        {hasError && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">!</span>
            Udfyld venligst dette felt
          </p>
        )}
      </div>
    );
  }
);

EnhancedSellerInput.displayName = "EnhancedSellerInput";

export { EnhancedSellerInput };
