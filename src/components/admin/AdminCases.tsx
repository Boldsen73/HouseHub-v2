
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Eye, 
  Edit, 
  X, 
  User, 
  MessageSquare, 
  Building2,
  Clock,
  UserCog
} from 'lucide-react';

interface AdminCasesProps {
  onCloseCase?: (caseId: string, caseAddress?: string) => void;
  onEditCase?: (caseData: any) => void;
  onLoginAsUser?: (userData: any) => void;
}

const AdminCases: React.FC<AdminCasesProps> = ({
  onCloseCase,
  onEditCase,
  onLoginAsUser
}) => {
  const [cases, setCases] = useState<any[]>([]);

  // Load cases data and listen for updates
  useEffect(() => {
    const loadCases = () => {
      // Get closed cases to filter out
      const closedCases = JSON.parse(localStorage.getItem('househub_closed_cases') || '[]');
      const editedCases = JSON.parse(localStorage.getItem('househub_edited_cases') || '[]');
      
      // Mock cases data - in real app this would come from API
      let mockCases = [
        {
          id: 1,
          sagsnummer: "SAG-2024-001",
          address: "Åbyhøj Allé 123, 8230 Åbyhøj",
          type: "Villa",
          size: "180 m²",
          rooms: 6,
          price: "4.500.000 DKK",
          priceValue: 4500000,
          status: "Aktiv",
          createdAt: "2024-01-10T09:00:00",
          seller: {
            name: "Mette Hansen",
            email: "mette.hansen@email.dk",
            phone: "+45 12 34 56 78"
          },
          offers: 3,
          messages: 8,
          lastActivity: "2024-01-20T14:30:00"
        },
        {
          id: 2,
          sagsnummer: "SAG-2024-002",
          address: "Viby Torv 45, 8260 Viby J",
          type: "Lejlighed",
          size: "95 m²",
          rooms: 3,
          price: "2.800.000 DKK",
          priceValue: 2800000,
          status: "Tilbud modtaget",
          createdAt: "2024-01-15T11:20:00",
          seller: {
            name: "Peter Andersen",
            email: "peter.andersen@email.dk",
            phone: "+45 23 45 67 89"
          },
          offers: 5,
          messages: 12,
          lastActivity: "2024-01-19T16:45:00"
        },
        {
          id: 3,
          sagsnummer: "SAG-2024-003",
          address: "Risskov Hovedgade 67, 8240 Risskov",
          type: "Rækkehus",
          size: "140 m²",
          rooms: 5,
          price: "3.750.000 DKK",
          priceValue: 3750000,
          status: "Mægler valgt",
          createdAt: "2024-01-08T15:10:00",
          seller: {
            name: "Anne Larsen",
            email: "anne.larsen@email.dk",
            phone: "+45 34 56 78 90"
          },
          offers: 2,
          messages: 6,
          lastActivity: "2024-01-18T10:20:00"
        }
      ];

      // Apply edits to cases
      mockCases = mockCases.map(mockCase => {
        const editedCase = editedCases.find((ec: any) => ec.id === mockCase.id);
        return editedCase ? { ...mockCase, ...editedCase } : mockCase;
      });

      // Filter out closed cases
      const closedCaseIds = closedCases.map((cc: any) => cc.address);
      const activeCases = mockCases.filter(mockCase => 
        !closedCaseIds.includes(mockCase.address)
      );

      setCases(activeCases);
    };

    loadCases();

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'househub_closed_cases' || e.key === 'househub_edited_cases') {
        loadCases();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleCloseCase = (caseData: any) => {
    if (onCloseCase) {
      onCloseCase(caseData.id.toString(), caseData.address);
    }
  };

  const handleEditCase = (caseData: any) => {
    if (onEditCase) {
      onEditCase(caseData);
    }
  };

  const handleLoginAsSeller = (seller: any) => {
    if (onLoginAsUser) {
      onLoginAsUser({
        name: seller.name,
        type: 'sælger'
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Aktiv':
        return <Badge className="bg-green-100 text-green-800">Aktiv</Badge>;
      case 'Tilbud modtaget':
        return <Badge className="bg-blue-100 text-blue-800">Tilbud modtaget</Badge>;
      case 'Mægler valgt':
        return <Badge className="bg-purple-100 text-purple-800">Mægler valgt</Badge>;
      case 'Afsluttet':
        return <Badge className="bg-gray-100 text-gray-800">Afsluttet</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('da-DK');
  };

  const getDaysAgo = (dateString: string) => {
    const days = Math.floor((Date.now() - new Date(dateString).getTime()) / (1000 * 60 * 60 * 24));
    return `${days} dage siden`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Aktive sager</span>
          <Badge variant="outline">{cases.length} sager</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sagsnummer</TableHead>
              <TableHead>Adresse</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Pris</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tilbud</TableHead>
              <TableHead>Beskeder</TableHead>
              <TableHead>Sidste aktivitet</TableHead>
              <TableHead>Handlinger</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cases.map((caseItem) => (
              <TableRow key={caseItem.id}>
                <TableCell className="font-medium">{caseItem.sagsnummer}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{caseItem.address}</div>
                    <div className="text-sm text-gray-500">{caseItem.size} • {caseItem.rooms} værelser</div>
                  </div>
                </TableCell>
                <TableCell>{caseItem.type}</TableCell>
                <TableCell className="text-green-600 font-medium">{caseItem.price}</TableCell>
                <TableCell>{getStatusBadge(caseItem.status)}</TableCell>
                <TableCell>
                  <Badge variant="outline">{caseItem.offers} tilbud</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{caseItem.messages}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{getDaysAgo(caseItem.lastActivity)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditCase(caseItem)}
                      title="Rediger sag"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleLoginAsSeller(caseItem.seller)}
                      title="Log ind som sælger"
                    >
                      <UserCog className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCloseCase(caseItem)}
                      className="text-red-600 hover:text-red-700 hover:border-red-300"
                      title="Luk sag"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {cases.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Building2 className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p>Ingen aktive sager fundet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminCases;
