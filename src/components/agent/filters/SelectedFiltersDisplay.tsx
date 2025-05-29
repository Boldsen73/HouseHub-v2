
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface SelectedFiltersDisplayProps {
  selectedMunicipalities: string[];
  onRemoveMunicipality: (municipality: string) => void;
}

const SelectedFiltersDisplay: React.FC<SelectedFiltersDisplayProps> = ({
  selectedMunicipalities,
  onRemoveMunicipality,
}) => {
  if (selectedMunicipalities.length === 0) {
    return null;
  }

  return (
    <div className="p-4 border rounded-md bg-gray-50 mb-6">
      <h4 className="text-sm font-medium mb-2">Valgte kommuner:</h4>
      <div className="flex flex-wrap gap-2">
        {selectedMunicipalities.map((municipality) => (
          <Badge key={municipality} variant="secondary" className="text-sm pr-1">
            {municipality}
            <button
              onClick={() => onRemoveMunicipality(municipality)}
              className="ml-1.5 p-0.5 rounded-full hover:bg-gray-300"
              aria-label={`Fjern ${municipality}`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default SelectedFiltersDisplay;
