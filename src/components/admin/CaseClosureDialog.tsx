
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

interface CaseClosureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  caseAddress?: string;
}

const CaseClosureDialog: React.FC<CaseClosureDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  caseAddress
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bekræft lukning af sag</AlertDialogTitle>
          <AlertDialogDescription>
            Er du sikker på, at du vil lukke sagen{caseAddress ? ` for ${caseAddress}` : ''}? 
            Denne handling kan ikke fortrydes.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuller</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-red-600 hover:bg-red-700">
            Luk sag
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CaseClosureDialog;
