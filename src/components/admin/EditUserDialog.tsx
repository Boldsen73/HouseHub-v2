
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TestUser, updateTestUser } from '@/utils/testData';
import { useToast } from '@/hooks/use-toast';

interface EditUserDialogProps {
  user: TestUser;
  isOpen: boolean;
  onClose: () => void;
  onUserUpdated: () => void;
}

const EditUserDialog = ({ user, isOpen, onClose, onUserUpdated }: EditUserDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    company: user.company || '',
    address: user.address || ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setShowConfirmation(true);
  };

  const confirmSave = () => {
    try {
      updateTestUser(user.id, formData);
      toast({
        title: "Bruger opdateret",
        description: "Brugeroplysningerne er blevet gemt successfully.",
      });
      onUserUpdated();
      onClose();
      setShowConfirmation(false);
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Der opstod en fejl ved opdatering af brugeren.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rediger bruger</DialogTitle>
            <DialogDescription>
              Opdater oplysninger for {user.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Navn</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Fulde navn"
              />
            </div>
            
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="email@example.com"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Telefonnummer</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="12 34 56 78"
              />
            </div>
            
            {user.role === 'agent' && (
              <div>
                <Label htmlFor="company">Firma</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Mæglervirksomhed"
                />
              </div>
            )}
            
            {user.role === 'seller' && (
              <div>
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Adresse"
                />
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Annuller
            </Button>
            <Button onClick={handleSave}>
              Gem ændringer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bekræft opdatering</AlertDialogTitle>
            <AlertDialogDescription>
              Er du sikker på, at du vil opdatere oplysningerne for denne bruger?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuller</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSave}>
              Opdater
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EditUserDialog;
