
import React from 'react';
import { Button } from '@/components/ui/button';
import MunicipalityFilter from './MunicipalityFilter';
import PropertyTypeFilter from './PropertyTypeFilter';
import PriceRangeFilter from './PriceRangeFilter';
import PostalCodeFilter from './PostalCodeFilter';
import { danishMunicipalities } from '@/data/municipalities';

interface FilterSidebarProps {
  selectedMunicipalities: string[];
  onMunicipalityChange: (municipalities: string[]) => void;
  selectedPropertyTypes: string[];
  onPropertyTypeChange: (types: string[]) => void;
  priceRange: { min: string; max: string };
  onPriceRangeChange: (range: { min: string; max: string }) => void;
  selectedPostalCodes?: string[];
  onPostalCodeChange?: (codes: string[]) => void;
  onSavePreferences: () => void;
  onResetFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedMunicipalities,
  onMunicipalityChange,
  selectedPropertyTypes,
  onPropertyTypeChange,
  priceRange,
  onPriceRangeChange,
  selectedPostalCodes = [],
  onPostalCodeChange = () => {},
  onSavePreferences,
  onResetFilters,
}) => {
  return (
    <div className="w-full md:w-80 lg:w-96 p-6 bg-white shadow-lg rounded-lg border border-gray-200 space-y-6 h-fit">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">Filtre</h3>
        <Button onClick={onResetFilters} variant="outline" size="sm">
          Nulstil alle
        </Button>
      </div>
      
      <MunicipalityFilter
        allMunicipalities={danishMunicipalities}
        selectedMunicipalities={selectedMunicipalities}
        onMunicipalityChange={onMunicipalityChange}
      />
      
      <PostalCodeFilter
        selectedPostalCodes={selectedPostalCodes}
        onPostalCodeChange={onPostalCodeChange}
      />
      
      <PropertyTypeFilter
        selectedPropertyTypes={selectedPropertyTypes}
        onPropertyTypeChange={onPropertyTypeChange}
      />
      
      <PriceRangeFilter
        priceRange={priceRange}
        onPriceRangeChange={onPriceRangeChange}
      />
      
      <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
        <Button onClick={onSavePreferences} className="w-full">
          Gem præferencer
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
