
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
} from '@/components/ui/alert-dialog';
import { AlertTriangle } from 'lucide-react';

interface CaseClosureConfirmationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  caseAddress?: string;
}

const CaseClosureConfirmation: React.FC<CaseClosureConfirmationProps> = ({
  open,
  onOpenChange,
  onConfirm,
  caseAddress
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Luk sag
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Er du sikker på, at du vil lukke sagen{caseAddress ? ` for ${caseAddress}` : ''}?
            </p>
            <p className="font-medium text-red-600">
              Denne handling kan ikke fortrydes.
            </p>
            <p className="text-sm text-gray-600">
              Alle mæglere på sagen vil blive notificeret om, at sagen er lukket og fjernet fra aktiv visning.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuller</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            Luk sag
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CaseClosureConfirmation;
