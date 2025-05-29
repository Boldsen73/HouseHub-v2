
import { useState, useEffect } from 'react';
import { getTestCases } from '@/utils/testData';
import { getDisplayName } from '@/utils/userNameUtils';

interface DashboardCase {
  id: string;
  address: string;
  municipality: string;
  type: string;
  size: string;
  price: string;
  buildYear: number;
  status: string;
  sellerId: string;
  sagsnummer: string;
}

interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  type?: string;
}

export const useSellerDashboard = () => {
  const [userCases, setUserCases] = useState<DashboardCase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const getUserDisplayName = (user: User | null): string => {
    return getDisplayName(user);
  };

  const loadUserCases = () => {
    const savedUser = localStorage.getItem('currentUser');
    
    console.log('=== DASHBOARD LOADING ===');
    console.log('Raw currentUser from localStorage:', savedUser);
    
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        console.log('Parsed current user:', user);
        
        setCurrentUser(user);
        
        if (user.id) {
          const allCases = getTestCases();
          console.log('All cases in storage:', allCases);
          
          const userCreatedCases = [];
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('seller_case_')) {
              try {
                const caseData = JSON.parse(localStorage.getItem(key) || '{}');
                console.log(`Found case with key ${key}:`, caseData);
                if (caseData && caseData.address && caseData.sellerId === user.id) {
                  userCreatedCases.push({
                    id: key.replace('seller_case_', ''),
                    address: caseData.address,
                    municipality: caseData.municipality || 'Ikke angivet',
                    type: caseData.propertyType || 'Ikke angivet',
                    size: `${caseData.size || 0} m²`,
                    price: caseData.estimatedPrice || 'Ikke angivet',
                    buildYear: caseData.buildYear || new Date().getFullYear(),
                    status: 'active',
                    sellerId: caseData.sellerId,
                    sagsnummer: `SAG-${key.replace('seller_case_', '').substring(0, 6).toUpperCase()}`
                  });
                }
              } catch (error) {
                console.error('Error parsing case data:', error);
              }
            }
          }
          
          console.log('User created cases:', userCreatedCases);
          
          const testUserCases = allCases.filter(c => {
            console.log(`Checking case ${c.id}: sellerId=${c.sellerId} vs userId=${user.id}`);
            return c.sellerId === user.id;
          });
          
          const myCases = [...testUserCases, ...userCreatedCases];
          
          console.log('Combined user cases:', myCases);
          setUserCases(myCases);
        } else {
          console.log('No user ID found');
          setUserCases([]);
        }
      } catch (error) {
        console.error('Error parsing currentUser:', error);
        setCurrentUser(null);
        setUserCases([]);
      }
    } else {
      console.log('No currentUser found in localStorage');
      setCurrentUser(null);
      setUserCases([]);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    loadUserCases();
    
    const handleStorageChange = () => {
      console.log('Storage changed, reloading cases');
      loadUserCases();
    };
    
    const handleCaseCreated = () => {
      console.log('Case created event received, reloading cases');
      loadUserCases();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('caseCreated', handleCaseCreated);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('caseCreated', handleCaseCreated);
    };
  }, []);

  return {
    userCases,
    isLoading,
    currentUser,
    getUserDisplayName
  };
};
