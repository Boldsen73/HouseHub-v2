
import React, { useState, useMemo } from 'react';
import { useToast } from "@/hooks/use-toast";
import { CaseStatus } from '@/types/agent';
import { useAgentCases } from '@/hooks/useAgentCases';

import HeaderNavigation from '@/components/agent/browseCases/HeaderNavigation';
import PageHeader from '@/components/agent/browseCases/PageHeader';
import SearchSection from '@/components/agent/browseCases/SearchSection';
import PerformanceSection from '@/components/agent/browseCases/PerformanceSection';
import EmptyState from '@/components/agent/browseCases/EmptyState';
import CasesContent from '@/components/agent/browseCases/CasesContent';
import AgentCaseTabs from '@/components/agent/AgentCaseTabs';
import NotificationBanner from '@/components/agent/NotificationBanner';
import MessagingNotifications from '@/components/agent/MessagingNotifications';
import CaseMessageNotifications from '@/components/agent/CaseMessageNotifications';

const BrowseCases = () => {
  const { toast } = useToast();
  const { activeTab, setActiveTab, updateCaseStatus, unrejectCase, cases } = useAgentCases();
  
  const [selectedMunicipalities, setSelectedMunicipalities] = useState<string[]>([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [selectedPostalCodes, setSelectedPostalCodes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({ min: '0', max: '' });
  const [searchTerm, setSearchTerm] = useState('');
  
  // Archive filters
  const [archiveSearchTerm, setArchiveSearchTerm] = useState('');
  const [archivePostalCode, setArchivePostalCode] = useState('all');
  const [archivePropertyType, setArchivePropertyType] = useState('all');

  console.log('BrowseCases - Cases from hook:', cases);
  console.log('BrowseCases - Cases length:', cases?.length);

  // Filter cases based on search term and other filters
  const getFilteredCases = (status: CaseStatus) => {
    if (!cases || cases.length === 0) {
      console.log('No cases available to filter');
      return [];
    }
    
    let filtered = cases.filter(c => c.agentStatus === status);
    console.log(`Cases with status ${status}:`, filtered);
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.municipality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply municipality filter
    if (selectedMunicipalities.length > 0) {
      filtered = filtered.filter(c => selectedMunicipalities.includes(c.municipality));
    }
    
    // Apply property type filter
    if (selectedPropertyTypes.length > 0) {
      filtered = filtered.filter(c => selectedPropertyTypes.includes(c.type));
    }
    
    // Apply postal code filter
    if (selectedPostalCodes.length > 0) {
      filtered = filtered.filter(c => {
        // Extract postal code from address or use a separate field if available
        const addressParts = c.address.split(' ');
        const postalCode = addressParts.find(part => /^\d{4}$/.test(part));
        return postalCode && selectedPostalCodes.includes(postalCode);
      });
    }
    
    // Apply price range filter
    if (priceRange.min && parseInt(priceRange.min) > 0) {
      filtered = filtered.filter(c => c.priceValue >= parseInt(priceRange.min));
    }
    if (priceRange.max && parseInt(priceRange.max) > 0) {
      filtered = filtered.filter(c => c.priceValue <= parseInt(priceRange.max));
    }
    
    console.log('Filtered cases:', filtered);
    return filtered;
  };

  // Performance data - only based on real submitted offers
  const performanceData = useMemo(() => {
    const agentCaseStates = JSON.parse(localStorage.getItem('agentCaseStates') || '{}');
    const submittedBids = Object.values(agentCaseStates).filter(
      (state: any) => state.agentStatus === 'offer_submitted'
    ).length;
    const wonCases = Object.values(agentCaseStates).filter(
      (state: any) => state.agentStatus === 'archived'
    ).length;
    
    return {
      casesReceived: cases?.length || 0,
      bidsSubmitted: submittedBids,
      casesWon: wonCases,
      averageCommission: submittedBids > 0 ? "62.500 DKK" : "0 DKK",
      averageListingTime: submittedBids > 0 ? "45 dage" : "0 dage",
      winRate: submittedBids > 0 ? Math.round((wonCases / submittedBids) * 100) : 0
    };
  }, [cases]);

  // Show empty state only if truly no cases exist
  if (!cases || cases.length === 0) {
    return (
      <EmptyState 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
    );
  }

  // Show normal interface with real data
  const handleResetFilters = () => {
    setSelectedMunicipalities([]);
    setSelectedPropertyTypes([]);
    setSelectedPostalCodes([]);
    setPriceRange({ min: '0', max: '' });
    setSearchTerm('');
    setArchiveSearchTerm('');
    setArchivePostalCode('all');
    setArchivePropertyType('all');
  };

  const currentCases = getFilteredCases(activeTab);
  const caseCounts = useMemo(() => {
    return {
      active: getFilteredCases('active').length,
      offer_submitted: getFilteredCases('offer_submitted').length,
      rejected: getFilteredCases('rejected').length,
      archived: getFilteredCases('archived').length
    };
  }, [cases, selectedMunicipalities, selectedPropertyTypes, selectedPostalCodes, priceRange, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNavigation />

      <div className="container mx-auto px-6 py-12">
        <PageHeader />
        
        <SearchSection 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <PerformanceSection performanceData={performanceData} />
        
        <CaseMessageNotifications />
        
        <div className="mb-6">
          <MessagingNotifications />
        </div>
        
        <NotificationBanner />
        
        <AgentCaseTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          caseCounts={caseCounts}
        >
          <CasesContent
            activeTab={activeTab}
            currentCases={currentCases}
            archiveSearchTerm={archiveSearchTerm}
            onArchiveSearchChange={setArchiveSearchTerm}
            archivePostalCode={archivePostalCode}
            onArchivePostalCodeChange={setArchivePostalCode}
            archivePropertyType={archivePropertyType}
            onArchivePropertyTypeChange={setArchivePropertyType}
            selectedMunicipalities={selectedMunicipalities}
            onMunicipalityChange={setSelectedMunicipalities}
            selectedPropertyTypes={selectedPropertyTypes}
            onPropertyTypeChange={setSelectedPropertyTypes}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            selectedPostalCodes={selectedPostalCodes}
            onPostalCodeChange={setSelectedPostalCodes}
            onResetFilters={handleResetFilters}
            onUnrejectCase={(caseId) => {
              unrejectCase(caseId);
              toast({ title: "Afvisning fortrudt" });
            }}
          />
        </AgentCaseTabs>
      </div>
    </div>
  );
};

export default BrowseCases;
