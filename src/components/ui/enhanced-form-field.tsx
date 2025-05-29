
import React, { forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface EnhancedFormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'number' | 'password' | 'textarea';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  rows?: number;
  formatType?: 'currency' | 'number' | 'postalCode' | 'year' | 'area';
  onFormatChange?: (formattedValue: string, rawValue: string) => void;
}

const EnhancedFormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, EnhancedFormFieldProps>(
  ({ 
    label, 
    name, 
    type = 'text', 
    value, 
    onChange, 
    onBlur,
    error, 
    touched, 
    required, 
    placeholder, 
    disabled, 
    className,
    rows = 3,
    formatType,
    onFormatChange,
    ...props 
  }, ref) => {
    const hasError = touched && error;
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let processedValue = e.target.value;
      let rawValue = processedValue;

      if (formatType && type !== 'textarea') {
        const numbers = processedValue.replace(/[^\d]/g, '');
        rawValue = numbers;

        switch (formatType) {
          case 'currency':
            if (numbers) {
              processedValue = `${parseInt(numbers).toLocaleString('da-DK')} kr`;
            } else {
              processedValue = '';
            }
            break;
          case 'number':
          case 'area':
            if (numbers) {
              processedValue = parseInt(numbers).toLocaleString('da-DK');
            } else {
              processedValue = '';
            }
            break;
          case 'postalCode':
            processedValue = numbers.slice(0, 4);
            break;
          case 'year':
            processedValue = numbers.slice(0, 4);
            break;
        }

        e.target.value = processedValue;
        
        if (onFormatChange) {
          onFormatChange(processedValue, rawValue);
        }
      }

      onChange(e);
    };
    
    const inputClasses = cn(
      "transition-all duration-200",
      hasError && "border-red-500 focus-visible:ring-red-500 bg-red-50",
      !hasError && "focus-visible:ring-blue-500 border-gray-300",
      className
    );
    
    return (
      <div className="space-y-2">
        <Label 
          htmlFor={name} 
          className={cn(
            "text-sm font-medium transition-colors duration-200",
            hasError ? "text-red-600" : "text-gray-700"
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1" aria-label="påkrævet">*</span>}
        </Label>
        
        {type === 'textarea' ? (
          <Textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            className={inputClasses}
            aria-invalid={hasError ? true : false}
            aria-describedby={hasError ? `${name}-error` : undefined}
            {...props}
          />
        ) : (
          <Input
            ref={ref as React.Ref<HTMLInputElement>}
            type={formatType ? 'text' : type}
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClasses}
            aria-invalid={hasError ? true : false}
            aria-describedby={hasError ? `${name}-error` : undefined}
            {...props}
          />
        )}
        
        {hasError && (
          <div 
            id={`${name}-error`}
            className="flex items-center gap-2 text-sm text-red-600 animate-fade-in"
            role="alert"
            aria-live="polite"
          >
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

EnhancedFormField.displayName = "EnhancedFormField";

export { EnhancedFormField };
