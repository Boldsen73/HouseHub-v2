
import React from 'react';
import FilterSidebar from '@/components/agent/filters/FilterSidebar';
import { useToast } from "@/hooks/use-toast";

interface FilterSectionProps {
  selectedMunicipalities: string[];
  onMunicipalityChange: (municipalities: string[]) => void;
  selectedPropertyTypes: string[];
  onPropertyTypeChange: (types: string[]) => void;
  priceRange: { min: string; max: string };
  onPriceRangeChange: (range: { min: string; max: string }) => void;
  selectedPostalCodes: string[];
  onPostalCodeChange: (codes: string[]) => void;
  onResetFilters: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  selectedMunicipalities,
  onMunicipalityChange,
  selectedPropertyTypes,
  onPropertyTypeChange,
  priceRange,
  onPriceRangeChange,
  selectedPostalCodes,
  onPostalCodeChange,
  onResetFilters,
}) => {
  const { toast } = useToast();

  return (
    <div className="w-full md:w-auto md:max-w-xs lg:max-w-sm xl:max-w-md flex-shrink-0">
      <FilterSidebar
        selectedMunicipalities={selectedMunicipalities}
        onMunicipalityChange={onMunicipalityChange}
        selectedPropertyTypes={selectedPropertyTypes}
        onPropertyTypeChange={onPropertyTypeChange}
        priceRange={priceRange}
        onPriceRangeChange={onPriceRangeChange}
        selectedPostalCodes={selectedPostalCodes}
        onPostalCodeChange={onPostalCodeChange}
        onSavePreferences={() => toast({ title: "Filtre gemt" })}
        onResetFilters={onResetFilters}
      />
    </div>
  );
};

export default FilterSection;
