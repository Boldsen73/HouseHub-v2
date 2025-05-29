
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PriceRangeFilterProps {
  priceRange: { min: string; max: string };
  onPriceRangeChange: (range: { min: string; max: string }) => void;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  priceRange,
  onPriceRangeChange,
}) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPriceRangeChange({ ...priceRange, min: e.target.value });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPriceRangeChange({ ...priceRange, max: e.target.value });
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Prisinterval (DKK)</label>
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <Label htmlFor="min-price" className="text-xs">Fra</Label>
          <Input
            id="min-price"
            type="number"
            placeholder="0"
            value={priceRange.min}
            onChange={handleMinChange}
            className="text-sm"
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="max-price" className="text-xs">Til</Label>
          <Input
            id="max-price"
            type="number"
            placeholder="Ubegrænset"
            value={priceRange.max}
            onChange={handleMaxChange}
            className="text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
