
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { Edit, UserMinus, Trash2 } from 'lucide-react';
import { TestUser, deactivateTestUser, deleteTestUser } from '@/utils/testData';
import { useToast } from '@/hooks/use-toast';
import EditUserDialog from './EditUserDialog';

interface UserManagementProps {
  users: TestUser[];
  onUsersUpdated: () => void;
}

const UserManagement = ({ users, onUsersUpdated }: UserManagementProps) => {
  const { toast } = useToast();
  const [editingUser, setEditingUser] = useState<TestUser | null>(null);
  const [deactivatingUser, setDeactivatingUser] = useState<TestUser | null>(null);
  const [deletingUser, setDeletingUser] = useState<TestUser | null>(null);

  const sellers = users.filter(u => u.role === 'seller');
  const agents = users.filter(u => u.role === 'agent');

  const handleDeactivateUser = (user: TestUser) => {
    setDeactivatingUser(user);
  };

  const confirmDeactivation = () => {
    if (deactivatingUser) {
      try {
        deactivateTestUser(deactivatingUser.id);
        toast({
          title: "Bruger deaktiveret",
          description: `${deactivatingUser.name} er blevet deaktiveret.`,
        });
        onUsersUpdated();
        setDeactivatingUser(null);
      } catch (error) {
        toast({
          title: "Fejl",
          description: "Der opstod en fejl ved deaktivering af brugeren.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteUser = (user: TestUser) => {
    setDeletingUser(user);
  };

  const confirmDeletion = () => {
    if (deletingUser) {
      try {
        deleteTestUser(deletingUser.id);
        toast({
          title: "Bruger slettet",
          description: `${deletingUser.name} og tilhørende data er blevet permanent fjernet.`,
        });
        onUsersUpdated();
        setDeletingUser(null);
      } catch (error) {
        toast({
          title: "Fejl",
          description: "Der opstod en fejl ved sletning af brugeren.",
          variant: "destructive",
        });
      }
    }
  };

  const renderUserCard = (user: TestUser) => (
    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <p className="font-medium">{user.name}</p>
          {user.isActive === false && (
            <Badge variant="destructive">Deaktiveret</Badge>
          )}
        </div>
        <p className="text-sm text-gray-600">{user.email}</p>
        {user.phone && (
          <p className="text-sm text-gray-500">{user.phone}</p>
        )}
        {user.company && (
          <p className="text-sm text-gray-500">{user.company}</p>
        )}
        {user.address && (
          <p className="text-sm text-gray-500">{user.address}</p>
        )}
      </div>
      
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setEditingUser(user)}
        >
          <Edit className="h-4 w-4 mr-1" />
          Rediger
        </Button>
        
        {user.isActive !== false && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleDeactivateUser(user)}
          >
            <UserMinus className="h-4 w-4 mr-1" />
            Deaktiver
          </Button>
        )}
        
        <Button
          size="sm"
          variant="destructive"
          onClick={() => handleDeleteUser(user)}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Slet
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sælgere ({sellers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {sellers.length === 0 ? (
            <p className="text-gray-500">Ingen sælgere endnu</p>
          ) : (
            <div className="space-y-3">
              {sellers.map(renderUserCard)}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mæglere ({agents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {agents.length === 0 ? (
            <p className="text-gray-500">Ingen mæglere endnu</p>
          ) : (
            <div className="space-y-3">
              {agents.map(renderUserCard)}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      {editingUser && (
        <EditUserDialog
          user={editingUser}
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
          onUserUpdated={onUsersUpdated}
        />
      )}

      {/* Deactivation Confirmation */}
      <AlertDialog open={!!deactivatingUser} onOpenChange={() => setDeactivatingUser(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bekræft deaktivering</AlertDialogTitle>
            <AlertDialogDescription>
              Du er ved at deaktivere en bruger. Er du sikker?
              <br />
              Brugeren vil ikke længere kunne logge ind.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuller</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeactivation}>
              Deaktiver bruger
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Deletion Confirmation */}
      <AlertDialog open={!!deletingUser} onOpenChange={() => setDeletingUser(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bekræft sletning</AlertDialogTitle>
            <AlertDialogDescription>
              Denne handling vil permanent fjerne brugeren og tilhørende sager. Er du sikker?
              <br />
              <strong>Dette kan ikke fortrydes.</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuller</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeletion} className="bg-red-600 hover:bg-red-700">
              Slet permanent
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserManagement;
