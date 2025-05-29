
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { propertyTypes as allPropertyTypes } from '@/data/municipalities'; // Using the exported constant

interface PropertyTypeFilterProps {
  selectedPropertyTypes: string[];
  onPropertyTypeChange: (types: string[]) => void;
}

const PropertyTypeFilter: React.FC<PropertyTypeFilterProps> = ({
  selectedPropertyTypes,
  onPropertyTypeChange,
}) => {
  const handleCheckedChange = (type: string, checked: boolean | 'indeterminate') => {
    const newSelection = checked
      ? [...selectedPropertyTypes, type]
      : selectedPropertyTypes.filter((t) => t !== type);
    onPropertyTypeChange(newSelection);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Boligtype</label>
      {allPropertyTypes.map((type) => (
        <div key={type} className="flex items-center space-x-2">
          <Checkbox
            id={`type-${type}`}
            checked={selectedPropertyTypes.includes(type)}
            onCheckedChange={(checked) => handleCheckedChange(type, checked)}
          />
          <Label htmlFor={`type-${type}`} className="text-sm font-normal">
            {type}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default PropertyTypeFilter;
