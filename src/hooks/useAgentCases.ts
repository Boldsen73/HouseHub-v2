import { useState, useEffect } from 'react';
import { Case } from '@/types/case';
import { CaseStatus, AgentOffer } from '@/types/agent';
import { getTestCases } from '@/utils/testData';

interface CaseWithStatus extends Case {
  agentStatus: CaseStatus;
  agentOffer?: AgentOffer;
  rejectedAt?: string;
  submittedAt?: string;
  deadline?: string;
}

export const useAgentCases = () => {
  const [activeTab, setActiveTab] = useState<CaseStatus>('active');
  const [cases, setCases] = useState<CaseWithStatus[]>([]);

  useEffect(() => {
    // Load saved tab from localStorage
    const savedTab = localStorage.getItem('agentActiveTab') as CaseStatus;
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  useEffect(() => {
    const loadCases = () => {
      console.log('Loading cases for agent...');
      
      // Get test cases from utils
      const allTestCases = getTestCases();
      console.log('All test cases:', allTestCases);
      
      // Get user-created cases from localStorage - scan for ALL seller cases
      const userCases = [];
      console.log('Scanning localStorage for seller cases...');
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('seller_case_')) {
          try {
            const caseData = JSON.parse(localStorage.getItem(key) || '{}');
            console.log(`Found seller case with key ${key}:`, caseData);
            
            // Include ALL seller cases regardless of sellerId - agents should see all available cases
            if (caseData && caseData.address) {
              const caseId = key.replace('seller_case_', '');
              
              // Check if the case is still active from seller perspective
              const sellerCaseStatus = localStorage.getItem(`seller_case_status_${caseId}`);
              const isActive = !sellerCaseStatus || sellerCaseStatus === 'active';
              
              if (isActive) {
                userCases.push({
                  id: caseId,
                  address: caseData.address,
                  municipality: caseData.municipality || 'Ikke angivet',
                  type: caseData.propertyType || 'Ikke angivet',
                  size: caseData.size || 0,
                  price: caseData.estimatedPrice || 'Ikke angivet',
                  priceValue: parseInt(caseData.estimatedPrice?.replace(/[^\d]/g, '') || '0'),
                  buildYear: caseData.buildYear || new Date().getFullYear(),
                  status: 'waiting_for_offers' as const,
                  sellerId: caseData.sellerId,
                  rooms: caseData.rooms || "Ikke angivet",
                  description: `${caseData.propertyType || 'Bolig'} i ${caseData.municipality || 'Danmark'}`,
                  energyLabel: "Ikke angivet",
                  constructionYear: caseData.buildYear || new Date().getFullYear()
                });
                console.log(`Added case ${caseId} to agent view`);
              } else {
                console.log(`Case ${caseId} is not active (status: ${sellerCaseStatus})`);
              }
            }
          } catch (error) {
            console.error(`Error parsing case data for key ${key}:`, error);
          }
        }
      }
      
      console.log('User created cases found:', userCases);
      
      // Combine test cases and user cases
      const allCases = [...allTestCases, ...userCases];
      console.log('Combined cases:', allCases);
      
      if (!allCases || allCases.length === 0) {
        console.log('No cases found');
        setCases([]);
        return;
      }
      
      // Convert cases to agent case format
      const agentCaseStates = JSON.parse(localStorage.getItem('agentCaseStates') || '{}');
      console.log('Agent case states:', agentCaseStates);
      
      const convertedCases = allCases.map(testCase => {
        const caseId = parseInt(testCase.id);
        const agentState = agentCaseStates[testCase.id];
        
        return {
          id: caseId,
          address: testCase.address,
          municipality: testCase.municipality,
          type: testCase.type,
          size: typeof testCase.size === 'string' ? testCase.size : `${testCase.size} m²`,
          price: testCase.price,
          priceValue: testCase.priceValue || 0,
          rooms: testCase.rooms || "Ikke angivet",
          constructionYear: testCase.buildYear || testCase.constructionYear || new Date().getFullYear(),
          description: testCase.description || `${testCase.type} i ${testCase.municipality}`,
          status: 'waiting_for_offers' as const,
          energyLabel: testCase.energyLabel || "Ikke angivet",
          agentStatus: agentState?.agentStatus || 'active' as CaseStatus,
          submittedAt: agentState?.submittedAt,
          rejectedAt: agentState?.rejectedAt,
          agentOffer: agentState?.agentOffer,
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
        };
      });
      
      console.log('Converted cases for agent view:', convertedCases);
      setCases(convertedCases);
    };

    // Initial load
    loadCases();
    
    // Listen for storage changes to update when new cases are created
    const handleStorageChange = () => {
      console.log('Storage changed, reloading cases');
      loadCases();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events when cases are created
    const handleCaseCreated = () => {
      console.log('Case created event received, reloading cases');
      loadCases();
    };
    
    window.addEventListener('caseCreated', handleCaseCreated);
    
    // Set up interval to check for new cases periodically
    const interval = setInterval(loadCases, 5000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('caseCreated', handleCaseCreated);
      clearInterval(interval);
    };
  }, []);

  const saveCaseStates = (caseId: number, agentStatus: CaseStatus, offer?: AgentOffer) => {
    const savedCaseStates = localStorage.getItem('agentCaseStates');
    let caseStates = {};
    if (savedCaseStates) {
      try {
        caseStates = JSON.parse(savedCaseStates);
      } catch (error) {
        console.error('Error parsing saved case states:', error);
      }
    }

    caseStates[caseId] = {
      agentStatus,
      submittedAt: agentStatus === 'offer_submitted' ? new Date().toISOString() : caseStates[caseId]?.submittedAt,
      rejectedAt: agentStatus === 'rejected' ? new Date().toISOString() : caseStates[caseId]?.rejectedAt,
      agentOffer: offer || caseStates[caseId]?.agentOffer
    };

    localStorage.setItem('agentCaseStates', JSON.stringify(caseStates));
  };

  const updateCaseStatus = (caseId: number, newStatus: CaseStatus, offer?: AgentOffer) => {
    saveCaseStates(caseId, newStatus, offer);
    // Trigger a storage event to update other components
    window.dispatchEvent(new Event('storage'));
  };

  const unrejectCase = (caseId: number) => {
    updateCaseStatus(caseId, 'active');
  };

  const saveActiveTab = (tab: CaseStatus) => {
    setActiveTab(tab);
    localStorage.setItem('agentActiveTab', tab);
  };

  const getTimeRemaining = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffMs = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: 'Udløbet', color: 'text-red-600', bgColor: 'bg-red-100' };
    if (diffDays === 0) return { text: 'I dag', color: 'text-red-600', bgColor: 'bg-red-100' };
    if (diffDays === 1) return { text: '1 dag tilbage', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    if (diffDays === 2) return { text: '2 dage tilbage', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { text: `${diffDays} dage tilbage`, color: 'text-green-600', bgColor: 'bg-green-100' };
  };

  return {
    activeTab,
    setActiveTab: saveActiveTab,
    updateCaseStatus,
    unrejectCase,
    getTimeRemaining,
    cases
  };
};
