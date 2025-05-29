
import React from 'react';
import { Button } from '@/components/ui/button';
import { Case } from '@/types/case';
import CaseCard from './CaseCard';

interface CaseListProps {
  cases: (Case & {
    agentStatus: 'active' | 'offer_submitted' | 'rejected' | 'archived';
    submittedAt?: string;
    rejectedAt?: string;
    agentOffer?: any;
  })[];
  onResetFilters: () => void;
  onUnrejectCase?: (caseId: number) => void;
}

const CaseList: React.FC<CaseListProps> = ({ cases, onResetFilters, onUnrejectCase }) => {
  if (cases.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-500">Ingen sager matcher dine filtre.</p>
        <Button variant="link" onClick={onResetFilters} className="mt-2">
          Nulstil filtre for at se alle sager
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {cases.map((case_) => (
        <CaseCard 
          key={case_.id} 
          case={case_} 
          onUnrejectCase={onUnrejectCase} 
        />
      ))}
    </div>
  );
};

export default CaseList;
