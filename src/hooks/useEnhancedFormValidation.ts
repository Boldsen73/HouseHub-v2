
import { useState, useCallback } from 'react';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  min?: number;
  max?: number;
  custom?: (value: any) => string | null;
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

interface ValidationErrors {
  [key: string]: string;
}

interface FormData {
  [key: string]: any;
}

export const useEnhancedFormValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isValidating, setIsValidating] = useState(false);

  const validateField = useCallback((name: string, value: any): string => {
    const rule = rules[name];
    if (!rule) return '';

    // Required validation
    if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return 'Dette felt skal udfyldes';
    }

    // Skip other validations if field is empty and not required
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return '';
    }

    // String validations
    if (typeof value === 'string') {
      if (rule.minLength && value.length < rule.minLength) {
        return `Mindst ${rule.minLength} tegn påkrævet`;
      }
      
      if (rule.maxLength && value.length > rule.maxLength) {
        return `Maksimalt ${rule.maxLength} tegn tilladt`;
      }
      
      if (rule.pattern && !rule.pattern.test(value)) {
        return 'Ugyldig format';
      }
    }

    // Number validations
    if (typeof value === 'number' || (typeof value === 'string' && !isNaN(Number(value)))) {
      const numValue = typeof value === 'number' ? value : Number(value);
      
      if (rule.min !== undefined && numValue < rule.min) {
        return `Værdi skal være mindst ${rule.min}`;
      }
      
      if (rule.max !== undefined && numValue > rule.max) {
        return `Værdi må ikke overstige ${rule.max}`;
      }
    }

    // Custom validation
    if (rule.custom) {
      const customError = rule.custom(value);
      if (customError) return customError;
    }

    return '';
  }, [rules]);

  const validateForm = useCallback((formData: FormData) => {
    setIsValidating(true);
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(rules).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(prev => {
      const newTouched = { ...prev };
      Object.keys(formData).forEach(key => {
        newTouched[key] = true;
      });
      return newTouched;
    });
    
    setIsValidating(false);
    return { isValid, errors: newErrors };
  }, [validateField, rules]);

  const validateSingleField = useCallback((name: string, value: any) => {
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    setTouched(prev => ({ ...prev, [name]: true }));
    return error === '';
  }, [validateField]);

  const clearErrors = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  const hasError = useCallback((fieldName: string) => {
    return touched[fieldName] && !!errors[fieldName];
  }, [errors, touched]);

  const getErrorMessage = useCallback((fieldName: string) => {
    return touched[fieldName] ? errors[fieldName] : '';
  }, [errors, touched]);

  const scrollToFirstError = useCallback(() => {
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField) {
      const element = document.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
    }
  }, [errors]);

  return {
    errors,
    touched,
    isValidating,
    validateForm,
    validateSingleField,
    clearErrors,
    hasError,
    getErrorMessage,
    scrollToFirstError,
    hasAnyErrors: Object.keys(errors).length > 0
  };
};
