
import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import CaseWithdrawal from './CaseWithdrawal';

interface CompactWithdrawalWarningProps {
  caseId: number;
  onWithdraw: () => void;
}

const CompactWithdrawalWarning: React.FC<CompactWithdrawalWarningProps> = ({
  caseId,
  onWithdraw
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center p-2 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center gap-2 text-sm text-red-600">
        <AlertTriangle className="h-4 w-4" />
        <span>OBS: Hvis du trækker sagen tilbage, refunderes betalingen ikke</span>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="link" size="sm" className="p-0 h-auto text-red-600 underline">
              Læs mere
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Annuller salg</DialogTitle>
              <DialogDescription>
                Er du sikker på, at du vil annullere dit salg?
              </DialogDescription>
            </DialogHeader>
            <CaseWithdrawal caseId={caseId} onWithdraw={() => {
              onWithdraw();
              setIsOpen(false);
            }} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CompactWithdrawalWarning;
