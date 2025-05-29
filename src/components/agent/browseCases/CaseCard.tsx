
import React from 'react';
import { Card } from '@/components/ui/card';
import { Case } from '@/types/case';
import { CaseStatus } from '@/types/agent';
import { useAgentCases } from '@/hooks/useAgentCases';
import CaseCardHeader from './CaseCardHeader';
import CaseCardContent from './CaseCardContent';
import CaseCardActions from './CaseCardActions';
import { formatPrice, getViewingText, checkForNewMessages } from '@/utils/caseCardUtils';

interface CaseCardProps {
  case: Case & { 
    agentStatus: CaseStatus; 
    deadline?: string;
    submittedAt?: string;
    rejectedAt?: string;
  };
  onResetFilters?: () => void;
  onUnrejectCase?: (caseId: number) => void;
}

const CaseCard: React.FC<CaseCardProps> = ({ case: caseItem, onUnrejectCase }) => {
  const { getTimeRemaining } = useAgentCases();
  
  const timeRemaining = caseItem.deadline ? getTimeRemaining(caseItem.deadline) : null;
  const hasNewMessages = checkForNewMessages(caseItem.agentStatus);
  const newMessageCount = hasNewMessages ? 1 : 0;

  const handleDownloadPDF = () => {
    // Mock PDF download functionality
    console.log(`Downloading PDF for case ${caseItem.id}`);
    // In real app, this would generate and download the actual PDF
  };

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CaseCardHeader
        address={caseItem.address}
        agentStatus={caseItem.agentStatus}
        timeRemaining={timeRemaining}
        newMessageCount={newMessageCount}
      />
      
      <CaseCardContent
        case={caseItem}
        formatPrice={formatPrice}
        getViewingText={() => getViewingText(caseItem.id)}
      />

      <div className="px-6 pb-6">
        <CaseCardActions
          caseId={caseItem.id}
          agentStatus={caseItem.agentStatus}
          newMessageCount={newMessageCount}
          onUnrejectCase={onUnrejectCase}
          handleDownloadPDF={handleDownloadPDF}
        />
      </div>
    </Card>
  );
};

export default CaseCard;
