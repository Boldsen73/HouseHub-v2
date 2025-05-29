
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Info } from 'lucide-react';

interface PropertyAddressSectionProps {
  formData: {
    address: string;
    postalCode: string;
    city: string;
  };
  onInputChange: (field: string, value: string | boolean) => void;
}

const PropertyAddressSection = ({ formData, onInputChange }: PropertyAddressSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-blue-600" />
        <Label className="text-lg font-semibold">Boligens adresse</Label>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm text-blue-700">
              Vi har udfyldt adressen fra din profil. Du kan ændre den, hvis du vil sælge en anden bolig.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="address">Vejnavn og husnummer *</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => onInputChange('address', e.target.value)}
            placeholder="Eksempel: Nørrebrogade 12"
            required
          />
        </div>
        <div>
          <Label htmlFor="postalCode">Postnummer *</Label>
          <Input
            id="postalCode"
            value={formData.postalCode}
            onChange={(e) => onInputChange('postalCode', e.target.value)}
            placeholder="2200"
            required
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="city">By *</Label>
        <Input
          id="city"
          value={formData.city}
          onChange={(e) => onInputChange('city', e.target.value)}
          placeholder="København N"
          required
        />
      </div>
    </div>
  );
};

export default PropertyAddressSection;
