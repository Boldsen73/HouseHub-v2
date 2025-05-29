
import React from 'react';
import CaseArchiveFilters from '@/components/agent/filters/CaseArchiveFilters';
import CaseList from './CaseList';
import PaginationInfo from './PaginationInfo';
import FilterSection from './FilterSection';
import { CaseStatus } from '@/types/agent';
import { Case } from '@/types/case';

interface CasesContentProps {
  activeTab: CaseStatus;
  currentCases: (Case & {
    agentStatus: 'active' | 'offer_submitted' | 'rejected' | 'archived';
    submittedAt?: string;
    rejectedAt?: string;
    agentOffer?: any;
  })[];
  archiveSearchTerm: string;
  onArchiveSearchChange: (value: string) => void;
  archivePostalCode: string;
  onArchivePostalCodeChange: (value: string) => void;
  archivePropertyType: string;
  onArchivePropertyTypeChange: (value: string) => void;
  selectedMunicipalities: string[];
  onMunicipalityChange: (municipalities: string[]) => void;
  selectedPropertyTypes: string[];
  onPropertyTypeChange: (types: string[]) => void;
  priceRange: { min: string; max: string };
  onPriceRangeChange: (range: { min: string; max: string }) => void;
  selectedPostalCodes: string[];
  onPostalCodeChange: (codes: string[]) => void;
  onResetFilters: () => void;
  onUnrejectCase: (caseId: number) => void;
}

const CasesContent: React.FC<CasesContentProps> = ({
  activeTab,
  currentCases,
  archiveSearchTerm,
  onArchiveSearchChange,
  archivePostalCode,
  onArchivePostalCodeChange,
  archivePropertyType,
  onArchivePropertyTypeChange,
  selectedMunicipalities,
  onMunicipalityChange,
  selectedPropertyTypes,
  onPropertyTypeChange,
  priceRange,
  onPriceRangeChange,
  selectedPostalCodes,
  onPostalCodeChange,
  onResetFilters,
  onUnrejectCase,
}) => {
  return (
    <>
      {/* Archive Filters for non-active tabs */}
      {activeTab !== 'active' && (
        <CaseArchiveFilters
          searchTerm={archiveSearchTerm}
          onSearchChange={onArchiveSearchChange}
          selectedPostalCode={archivePostalCode}
          onPostalCodeChange={onArchivePostalCodeChange}
          selectedPropertyType={archivePropertyType}
          onPropertyTypeChange={onArchivePropertyTypeChange}
          onResetFilters={onResetFilters}
        />
      )}
      
      <div className="flex flex-col md:flex-row gap-8">
        {activeTab === 'active' && (
          <FilterSection
            selectedMunicipalities={selectedMunicipalities}
            onMunicipalityChange={onMunicipalityChange}
            selectedPropertyTypes={selectedPropertyTypes}
            onPropertyTypeChange={onPropertyTypeChange}
            priceRange={priceRange}
            onPriceRangeChange={onPriceRangeChange}
            selectedPostalCodes={selectedPostalCodes}
            onPostalCodeChange={onPostalCodeChange}
            onResetFilters={onResetFilters}
          />
        )}

        <div className="flex-1 min-w-0">
          <CaseList 
            cases={currentCases} 
            onResetFilters={onResetFilters}
            onUnrejectCase={onUnrejectCase}
          />
          <PaginationInfo filteredCount={currentCases.length} totalCount={currentCases.length} />
        </div>
      </div>
    </>
  );
};

export default CasesContent;
