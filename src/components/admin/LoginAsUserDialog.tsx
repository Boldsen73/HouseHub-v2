
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Shield } from 'lucide-react';

interface LoginAsUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  userName?: string;
  userType?: 'mægler' | 'sælger';
}

const LoginAsUserDialog: React.FC<LoginAsUserDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  userName,
  userType
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-500" />
            Log ind som bruger
          </DialogTitle>
          <DialogDescription className="space-y-2">
            <p>
              Du er ved at logge ind som {userName} 
              {userType && (
                <Badge variant="outline" className="ml-2">
                  {userType}
                </Badge>
              )}
            </p>
            <p className="text-sm text-gray-600">
              Dette vil give dig adgang til brugerens perspektiv for test og support formål.
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuller
          </Button>
          <Button onClick={onConfirm} className="bg-blue-600 hover:bg-blue-700">
            <User className="h-4 w-4 mr-2" />
            Log ind som {userName}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginAsUserDialog;
