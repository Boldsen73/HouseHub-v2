
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface PropertyNotesSectionProps {
  formData: {
    notes: string;
  };
  onInputChange: (field: string, value: string | boolean) => void;
}

const PropertyNotesSection = ({ formData, onInputChange }: PropertyNotesSectionProps) => {
  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold">Yderligere oplysninger</Label>
      
      <div>
        <Label htmlFor="notes">Yderligere bemærkninger</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => onInputChange('notes', e.target.value)}
          placeholder="Fortæl os om eventuelle særlige forhold ved boligen..."
          rows={3}
        />
      </div>
    </div>
  );
};

export default PropertyNotesSection;
