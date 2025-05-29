
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Edit3, Save, X } from 'lucide-react';

interface Offer {
  id: number;
  caseId: number;
  agentName: string;
  expectedPrice: string;
  commission: string;
  bindingPeriod: string;
  salesStrategy: string;
  marketingPackage: string;
  submittedAt: string;
  deadline: string;
}

interface EditOfferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  offer: Offer | null;
  onSave: (updatedOffer: Offer) => void;
}

const EditOfferDialog: React.FC<EditOfferDialogProps> = ({
  open,
  onOpenChange,
  offer,
  onSave
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    expectedPrice: '',
    commission: '',
    bindingPeriod: '',
    salesStrategy: '',
    marketingPackage: ''
  });

  React.useEffect(() => {
    if (offer) {
      setFormData({
        expectedPrice: offer.expectedPrice.replace(/[^\d]/g, ''),
        commission: offer.commission.replace(/[^\d]/g, ''),
        bindingPeriod: offer.bindingPeriod,
        salesStrategy: offer.salesStrategy,
        marketingPackage: offer.marketingPackage
      });
    }
  }, [offer]);

  const handleSave = () => {
    if (!offer) return;

    const updatedOffer: Offer = {
      ...offer,
      expectedPrice: `${parseInt(formData.expectedPrice).toLocaleString('da-DK')} DKK`,
      commission: `${parseInt(formData.commission).toLocaleString('da-DK')} DKK`,
      bindingPeriod: formData.bindingPeriod,
      salesStrategy: formData.salesStrategy,
      marketingPackage: formData.marketingPackage
    };

    onSave(updatedOffer);
    
    toast({
      title: "Tilbud opdateret",
      description: "Dit tilbud er blevet opdateret og sendt til sælgeren.",
    });

    onOpenChange(false);
  };

  const isDeadlinePassed = offer ? new Date(offer.deadline) < new Date() : false;

  if (!offer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5" />
            Rediger tilbud - Sag #{offer.caseId}
          </DialogTitle>
        </DialogHeader>

        {isDeadlinePassed ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-medium">
              Fristen for at redigere dette tilbud er udløbet
            </p>
            <p className="text-red-600 text-sm mt-1">
              Deadline var: {new Date(offer.deadline).toLocaleString('da-DK')}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expectedPrice">Forventet salgspris (DKK)</Label>
                <Input
                  id="expectedPrice"
                  type="number"
                  value={formData.expectedPrice}
                  onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                  placeholder="4200000"
                />
              </div>

              <div>
                <Label htmlFor="commission">Salær (DKK)</Label>
                <Input
                  id="commission"
                  type="number"
                  value={formData.commission}
                  onChange={(e) => setFormData({ ...formData, commission: e.target.value })}
                  placeholder="65000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bindingPeriod">Bindingsperiode</Label>
                <Select value={formData.bindingPeriod} onValueChange={(value) => setFormData({ ...formData, bindingPeriod: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3 måneder">3 måneder</SelectItem>
                    <SelectItem value="4 måneder">4 måneder</SelectItem>
                    <SelectItem value="6 måneder">6 måneder</SelectItem>
                    <SelectItem value="12 måneder">12 måneder</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="marketingPackage">Markedsføringspakke</Label>
                <Select value={formData.marketingPackage} onValueChange={(value) => setFormData({ ...formData, marketingPackage: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="salesStrategy">Salgsstrategi</Label>
              <Textarea
                id="salesStrategy"
                value={formData.salesStrategy}
                onChange={(e) => setFormData({ ...formData, salesStrategy: e.target.value })}
                placeholder="Beskriv din salgsstrategi..."
                rows={4}
              />
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>Bemærk:</strong> Når du gemmer ændringerne, vil sælgeren automatisk få besked om det opdaterede tilbud.
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4 mr-2" />
            Annuller
          </Button>
          {!isDeadlinePassed && (
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Gem ændringer
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditOfferDialog;
