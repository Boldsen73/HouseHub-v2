
import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import TestEnvironmentBanner from '@/components/TestEnvironmentBanner';
import AgentNavigation from '@/components/agent/dashboard/AgentNavigation';
import AgentHeroSection from '@/components/agent/dashboard/AgentHeroSection';
import AgentBenefitsSection from '@/components/agent/dashboard/AgentBenefitsSection';
import AgentQuickActions from '@/components/agent/dashboard/AgentQuickActions';
import AgentActivitySummary from '@/components/agent/dashboard/AgentActivitySummary';
import { useTestAuth } from '@/hooks/useTestAuth';
import { getTestCases } from '@/utils/testData';

const AgentDashboard = () => {
  const { user } = useTestAuth();
  const [showBenefits, setShowBenefits] = useState(false);
  const [hasActiveCases, setHasActiveCases] = useState(false);

  useEffect(() => {
    const hasSeenBenefits = localStorage.getItem('agent_has_seen_benefits');
    if (!hasSeenBenefits) {
      setShowBenefits(true);
      localStorage.setItem('agent_has_seen_benefits', 'true');
    }

    // Check if there are any active cases for this agent
    const allCases = getTestCases();
    const activeCasesExist = allCases.length > 0;
    setHasActiveCases(activeCasesExist);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-lato">
      <AgentNavigation />
      
      <main className="flex-grow">
        <div className="container mx-auto px-6 py-8">
          <TestEnvironmentBanner />
        </div>

        <AgentHeroSection />

        {/* Only show activity summary if there are active cases */}
        {hasActiveCases && (
          <AgentActivitySummary />
        )}

        <AgentQuickActions />
        
        <AgentBenefitsSection 
          showBenefits={showBenefits}
          onToggleBenefits={setShowBenefits}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default AgentDashboard;
