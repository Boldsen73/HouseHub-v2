
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home } from 'lucide-react';

interface PropertyDetailsSectionProps {
  formData: {
    propertyType: string;
    size: string;
    rooms: string;
    buildYear: string;
    condition: string;
    energyLabel: string;
  };
  onInputChange: (field: string, value: string | boolean) => void;
}

const PropertyDetailsSection = ({ formData, onInputChange }: PropertyDetailsSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Home className="h-5 w-5 text-green-600" />
        <Label className="text-lg font-semibold">Boligdetaljer</Label>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="propertyType">Boligtype *</Label>
          <Select value={formData.propertyType} onValueChange={(value) => onInputChange('propertyType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Vælg boligtype" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="lejlighed">Lejlighed</SelectItem>
              <SelectItem value="raekkeHus">Rækkehus</SelectItem>
              <SelectItem value="lejlighedEjerlejlighed">Ejerlejlighed</SelectItem>
              <SelectItem value="sommerhus">Sommerhus</SelectItem>
              <SelectItem value="grund">Grund</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="size">Størrelse (m²) *</Label>
          <Input
            id="size"
            type="number"
            value={formData.size}
            onChange={(e) => onInputChange('size', e.target.value)}
            placeholder="85"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="rooms">Antal værelser</Label>
          <Input
            id="rooms"
            type="number"
            value={formData.rooms}
            onChange={(e) => onInputChange('rooms', e.target.value)}
            placeholder="3"
          />
        </div>
        
        <div>
          <Label htmlFor="buildYear">Byggeår</Label>
          <Input
            id="buildYear"
            type="number"
            value={formData.buildYear}
            onChange={(e) => onInputChange('buildYear', e.target.value)}
            placeholder="1965"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="condition">Stand</Label>
        <Select value={formData.condition} onValueChange={(value) => onInputChange('condition', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Vælg boligens stand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nybygget">Nybygget</SelectItem>
            <SelectItem value="nyistandsat">Nyistandsat</SelectItem>
            <SelectItem value="velvedligeholdt">Velvedligeholdt</SelectItem>
            <SelectItem value="istandsaettelseskraevende">Istandsættelseskrævende</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="energyLabel">Energimærke</Label>
        <Select value={formData.energyLabel} onValueChange={(value) => onInputChange('energyLabel', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Vælg energimærke" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A2020">A2020</SelectItem>
            <SelectItem value="A2015">A2015</SelectItem>
            <SelectItem value="A2010">A2010</SelectItem>
            <SelectItem value="B">B</SelectItem>
            <SelectItem value="C">C</SelectItem>
            <SelectItem value="D">D</SelectItem>
            <SelectItem value="E">E</SelectItem>
            <SelectItem value="F">F</SelectItem>
            <SelectItem value="G">G</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PropertyDetailsSection;
