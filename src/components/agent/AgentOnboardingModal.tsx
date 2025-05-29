
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DollarSign, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface AgentOnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
}

const AgentOnboardingModal = ({ open, onOpenChange, onAccept }: AgentOnboardingModalProps) => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (accepted) {
      onAccept();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-blue-600" />
            HouseHub – Betingelser for ejendomsmæglere
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed">
            Når du deltager i et udbud gennem HouseHub, accepterer du følgende:
          </p>
          
          <Alert className="border-blue-200 bg-blue-50">
            <DollarSign className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <div className="space-y-2">
                <p className="font-semibold">🔹 Hvis du vinder sagen, betaler du 1 promille (0,1 %) af den oplyste salgspris</p>
                <p className="text-sm">Eksempel: Ved en salgspris på 2.500.000 kr. → HouseHub opkræver 2.500 kr.</p>
                <p className="text-sm font-medium">🔹 Prisen er ekskl. moms</p>
              </div>
            </AlertDescription>
          </Alert>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Du må ikke kontakte sælger før sagen er vundet</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Dine tilbud og resultater præsenteres for sælgeren</span>
            </div>
            <div className="flex items-center gap-3">
              <XCircle className="w-5 h-5 text-red-600" />
              <span className="text-gray-700">Du må ikke afgive vildledende salgspriser</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
            <Checkbox 
              id="accept-terms" 
              checked={accepted}
              onCheckedChange={(checked) => setAccepted(checked as boolean)}
            />
            <label 
              htmlFor="accept-terms" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Jeg accepterer betingelserne og vil overholde HouseHub's regler
            </label>
          </div>
          
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Annuller
            </Button>
            <Button 
              onClick={handleAccept}
              disabled={!accepted}
              className="flex-1"
            >
              Jeg accepterer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgentOnboardingModal;
