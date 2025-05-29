
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, DollarSign, Calendar } from 'lucide-react';
import type { OfferWithMarketing } from '@/types/case';

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  selectedOffer: OfferWithMarketing | null;
  isLoading?: boolean;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  selectedOffer,
  isLoading = false
}) => {
  if (!selectedOffer) return null;

  const commissionPercentage = ((selectedOffer.commissionValue / selectedOffer.priceValue) * 100).toFixed(2);
  
  // Format agency and agent name display
  const agencyName = selectedOffer.agencyName || "EDC Aarhus Syd"; // Fallback for demo
  const agentName = selectedOffer.agentName;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            Bekræft valg af mægler
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold">{agencyName}</h3>
                  <p className="text-base text-gray-600">v. {agentName}</p>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Forventet salgspris</p>
                      <p className="font-semibold text-green-600">{selectedOffer.expectedPrice}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Salær</p>
                      <p className="font-semibold">
                        {selectedOffer.commission} ({commissionPercentage}%)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-600">Bindingsperiode</p>
                      <p className="font-semibold">{selectedOffer.bindingPeriod}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-sm text-gray-600">Markedsføringspakke</p>
                      <p className="font-semibold">{selectedOffer.marketingPackage}</p>
                    </div>
                  </div>
                </div>
                
                {selectedOffer.marketingMethods && selectedOffer.marketingMethods.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Inkluderet markedsføring</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedOffer.marketingMethods
                          .filter(method => method.included)
                          .map((method, index) => (
                            <Badge key={index} variant="secondary">
                              {method.name}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Vigtigt:</strong> Ved at bekræfte dette valg indgår du en bindende aftale med mægleren. 
              Du vil modtage en bekræftelse på email med alle detaljer.
            </p>
          </div>
        </div>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Annuller
          </Button>
          <Button onClick={onConfirm} disabled={isLoading}>
            {isLoading ? 'Bekræfter...' : 'Bekræft valg'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
