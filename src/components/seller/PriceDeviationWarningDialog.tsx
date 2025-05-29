
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { formatDanishNumber } from "@/lib/utils";
import { AlertTriangle } from 'lucide-react';

interface PriceDeviationWarningDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expectedPrice: number;
  publicValuation: number;
  onAccept: () => void;
  onModify: () => void;
}

const PriceDeviationWarningDialog: React.FC<PriceDeviationWarningDialogProps> = ({
  open,
  onOpenChange,
  expectedPrice,
  publicValuation,
  onAccept,
  onModify,
}) => {
  const deviationPercentage = publicValuation > 0 && expectedPrice > 0 
    ? Math.abs((expectedPrice - publicValuation) / publicValuation) * 100 
    : 0;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center">
            <AlertTriangle className="h-6 w-6 mr-2 text-yellow-500" />
            Advarsel: Prisafvigelse
          </AlertDialogTitle>
          <AlertDialogDescription>
            Din forventede salgspris ({formatDanishNumber(expectedPrice)} DKK) afviger med {deviationPercentage.toFixed(1)}% fra den seneste offentlige vurdering ({formatDanishNumber(publicValuation)} DKK).
            <br /><br />
            Er du sikker på, at du vil fortsætte med denne pris? En pris, der afviger meget fra markedsværdien, kan påvirke salgstiden og antallet af henvendelser.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onModify}>Tilbage (ændre pris)</AlertDialogCancel>
          <AlertDialogAction onClick={onAccept} className="bg-primary hover:bg-primary/90">
            Fortsæt med denne pris
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PriceDeviationWarningDialog;

