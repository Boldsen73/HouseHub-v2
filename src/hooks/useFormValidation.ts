
import { useState, useCallback } from 'react';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

interface ValidationErrors {
  [key: string]: string;
}

export const useFormValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = useCallback((name: string, value: any): string => {
    const rule = rules[name];
    if (!rule) return '';

    if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return 'Dette felt skal udfyldes';
    }

    if (rule.minLength && typeof value === 'string' && value.length < rule.minLength) {
      return `Mindst ${rule.minLength} tegn påkrævet`;
    }

    if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
      return 'Ugyldig format';
    }

    if (rule.custom) {
      const customError = rule.custom(value);
      if (customError) return customError;
    }

    return '';
  }, [rules]);

  const validateForm = useCallback((formData: { [key: string]: any }) => {
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
    return { isValid, errors: newErrors };
  }, [validateField, rules]);

  const validateSingleField = useCallback((name: string, value: any) => {
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    setTouched(prev => ({ ...prev, [name]: true }));
    return error === '';
  }, [validateField]);

  const scrollToFirstError = useCallback((errors: ValidationErrors) => {
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField) {
      const element = document.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
    }
  }, []);

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

  return {
    errors,
    touched,
    validateForm,
    validateSingleField,
    scrollToFirstError,
    clearErrors,
    hasError,
    getErrorMessage
  };
};
