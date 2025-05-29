
import { useState, useCallback } from 'react';

interface SellerFormData {
  postnummer?: string;
  boligareal?: string;
  grundareal?: string;
  byggeaar?: string;
  forventetPris?: string;
  [key: string]: any;
}

interface ValidationErrors {
  [key: string]: string;
}

export const useSellerFormValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const requiredFields = [
    'postnummer',
    'boligareal', 
    'byggeaar',
    'forventetPris'
  ];

  const validateNumberField = (value: string, fieldName: string): string => {
    if (!value || value.trim() === '') {
      return 'Dette felt skal udfyldes';
    }
    
    const numericValue = value.replace(/[^\d]/g, '');
    if (!numericValue || isNaN(parseInt(numericValue))) {
      return 'Kun tal er tilladt';
    }

    // Field-specific validation
    if (fieldName === 'postnummer' && numericValue.length !== 4) {
      return 'Postnummer skal være 4 cifre';
    }
    
    if (fieldName === 'byggeaar') {
      const year = parseInt(numericValue);
      const currentYear = new Date().getFullYear();
      if (year < 1800 || year > currentYear) {
        return `Byggeår skal være mellem 1800 og ${currentYear}`;
      }
    }

    if (fieldName === 'boligareal') {
      const area = parseInt(numericValue);
      if (area < 10 || area > 2000) {
        return 'Boligareal skal være mellem 10 og 2000 m²';
      }
    }

    return '';
  };

  const validateForm = useCallback((formData: SellerFormData) => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    // Check required fields
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        newErrors[field] = 'Dette felt skal udfyldes';
        isValid = false;
      } else {
        // Validate number fields
        if (['postnummer', 'boligareal', 'grundareal', 'byggeaar'].includes(field)) {
          const error = validateNumberField(formData[field], field);
          if (error) {
            newErrors[field] = error;
            isValid = false;
          }
        }
      }
    });

    // Validate price field separately as it has different formatting
    if (formData.forventetPris) {
      const cleanPrice = formData.forventetPris.replace(/[^\d]/g, '');
      if (!cleanPrice || isNaN(parseInt(cleanPrice))) {
        newErrors.forventetPris = 'Ugyldig prisformat';
        isValid = false;
      } else {
        const price = parseInt(cleanPrice);
        if (price < 100000 || price > 50000000) {
          newErrors.forventetPris = 'Pris skal være mellem 100.000 og 50.000.000 kr';
          isValid = false;
        }
      }
    }

    setErrors(newErrors);
    setTouched(prev => {
      const newTouched = { ...prev };
      Object.keys(formData).forEach(key => {
        newTouched[key] = true;
      });
      return newTouched;
    });

    return { isValid, errors: newErrors };
  }, []);

  const validateSingleField = useCallback((name: string, value: string) => {
    let error = '';
    
    if (requiredFields.includes(name) && (!value || value.trim() === '')) {
      error = 'Dette felt skal udfyldes';
    } else if (['postnummer', 'boligareal', 'grundareal', 'byggeaar'].includes(name)) {
      error = validateNumberField(value, name);
    } else if (name === 'forventetPris' && value) {
      const cleanPrice = value.replace(/[^\d]/g, '');
      if (!cleanPrice || isNaN(parseInt(cleanPrice))) {
        error = 'Ugyldig prisformat';
      }
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    setTouched(prev => ({ ...prev, [name]: true }));
    
    return error === '';
  }, []);

  const formatCurrency = (value: string): string => {
    const numbers = value.replace(/[^\d]/g, '');
    if (!numbers) return '';
    
    const formatted = parseInt(numbers).toLocaleString('da-DK');
    return `${formatted} kr`;
  };

  const formatNumber = (value: string): string => {
    const numbers = value.replace(/[^\d]/g, '');
    if (!numbers) return '';
    return parseInt(numbers).toLocaleString('da-DK');
  };

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
    validateForm,
    validateSingleField,
    formatCurrency,
    formatNumber,
    clearErrors,
    hasError,
    getErrorMessage,
    scrollToFirstError
  };
};
