
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Edit, Save } from 'lucide-react';

interface CaseEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseData?: any;
}

const CaseEditDialog: React.FC<CaseEditDialogProps> = ({
  open,
  onOpenChange,
  caseData
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    address: '',
    type: '',
    price: '',
    status: '',
    description: '',
    rooms: '',
    size: ''
  });

  useEffect(() => {
    if (caseData) {
      setFormData({
        address: caseData.address || '',
        type: caseData.type || '',
        price: caseData.price || '',
        status: caseData.status || '',
        description: caseData.description || '',
        rooms: caseData.rooms?.toString() || '',
        size: caseData.size || ''
      });
    }
  }, [caseData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Save to localStorage for persistence
    const existingCases = JSON.parse(localStorage.getItem('househub_edited_cases') || '[]');
    const editedCase = {
      ...caseData,
      ...formData,
      editedAt: new Date().toISOString(),
      editedBy: 'admin'
    };
    
    const updatedCases = existingCases.filter((c: any) => c.id !== caseData.id);
    updatedCases.push(editedCase);
    
    localStorage.setItem('househub_edited_cases', JSON.stringify(updatedCases));
    
    // Trigger storage event for other components
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'househub_edited_cases',
      newValue: JSON.stringify(updatedCases)
    }));

    toast({
      title: "Sag opdateret",
      description: `Sagen for ${formData.address} er blevet opdateret.`,
    });

    onOpenChange(false);
  };

  const propertyTypes = ['Villa', 'Rækkehus', 'Ejerlejlighed', 'Andelsbolig', 'Fritidshus'];
  const statusOptions = ['Aktiv', 'Afventer tilbud', 'Tilbud modtaget', 'Mægler valgt', 'Afsluttet'];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5 text-blue-500" />
            Rediger sag
          </DialogTitle>
          <DialogDescription>
            Rediger oplysninger for sagen. Ændringer gemmes automatisk.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="address">Adresse</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Indtast adresse"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Boligtype</Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Vælg boligtype" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Pris</Label>
            <Input
              id="price"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              placeholder="4.500.000 DKK"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Vælg status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rooms">Antal værelser</Label>
            <Input
              id="rooms"
              type="number"
              value={formData.rooms}
              onChange={(e) => handleInputChange('rooms', e.target.value)}
              placeholder="5"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="size">Størrelse</Label>
            <Input
              id="size"
              value={formData.size}
              onChange={(e) => handleInputChange('size', e.target.value)}
              placeholder="180 m²"
            />
          </div>

          <div className="col-span-2 space-y-2">
            <Label htmlFor="description">Beskrivelse</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Tilføj en beskrivelse af ejendommen..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuller
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Gem ændringer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CaseEditDialog;
