
// Utility functions for handling user names consistently
export const storeUserEnteredName = (name: string) => {
  if (name && name.trim()) {
    localStorage.setItem('enteredUserName', name.trim());
    console.log('Stored entered user name:', name.trim());
  }
};

export const getUserEnteredName = (): string | null => {
  const enteredName = localStorage.getItem('enteredUserName');
  console.log('Retrieved entered user name from storage:', enteredName);
  return enteredName;
};

export const extractUserNameFromRegistration = (): string | null => {
  try {
    const registrationData = localStorage.getItem('sellerRegistrationData');
    if (registrationData) {
      const regData = JSON.parse(registrationData);
      console.log('Found registration data:', regData);
      
      // Try firstName first, then name, then fullName
      if (regData.firstName && regData.firstName.trim()) {
        console.log('Using firstName from registration:', regData.firstName);
        return regData.firstName.trim();
      }
      
      if (regData.name && regData.name.trim()) {
        console.log('Using name from registration:', regData.name);
        return regData.name.trim();
      }
      
      if (regData.fullName && regData.fullName.trim()) {
        console.log('Using fullName from registration:', regData.fullName);
        return regData.fullName.trim();
      }
    }
  } catch (error) {
    console.error('Error parsing registration data:', error);
  }
  return null;
};

export const getDisplayName = (user: any): string => {
  console.log('=== getDisplayName DEBUG ===');
  console.log('Input user object:', user);
  
  // Priority 1: Check stored entered name
  const enteredName = getUserEnteredName();
  if (enteredName && enteredName.trim() && !enteredName.toLowerCase().includes('demo')) {
    console.log('Using stored entered name:', enteredName);
    return enteredName;
  }
  
  // Priority 2: Check registration data
  const regName = extractUserNameFromRegistration();
  if (regName && !regName.toLowerCase().includes('demo')) {
    console.log('Using registration name:', regName);
    return regName;
  }
  
  // Priority 3: Use user object properties
  if (user) {
    // Try firstName
    if (user.firstName && user.firstName.trim() && !user.firstName.toLowerCase().includes('demo')) {
      console.log('Using user firstName:', user.firstName);
      return user.firstName.trim();
    }
    
    // Try name but avoid generated names
    if (user.name && user.name.trim()) {
      const name = user.name.trim();
      // Skip generated demo names
      if (!name.toLowerCase().includes('demo') && 
          !name.toLowerCase().includes('test') &&
          !name.toLowerCase().includes('seller') &&
          !name.match(/seller\d+/i)) {
        console.log('Using user name:', name);
        return name;
      }
    }
    
    // Try email if it's not generated
    if (user.email && user.email.trim()) {
      const emailName = user.email.split('@')[0].trim();
      if (!emailName.toLowerCase().includes('demo') && 
          !emailName.toLowerCase().includes('test') && 
          !emailName.toLowerCase().includes('seller') &&
          !emailName.match(/seller\d+/i)) {
        console.log('Using email name:', emailName);
        return emailName;
      }
    }
  }
  
  console.log('No valid name found, using fallback');
  return 'Bruger';
};
