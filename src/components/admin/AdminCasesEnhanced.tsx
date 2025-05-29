
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Eye, 
  Edit, 
  Trash2, 
  User, 
  MessageSquare, 
  Building2,
  Phone,
  Mail,
  X,
  UserCog
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AdminCaseDetails from '@/components/admin/AdminCaseDetails';

interface AdminCasesEnhancedProps {
  onCloseCase?: (caseData: any) => void;
  onLoginAsUser?: (userData: any) => void;
}

const AdminCasesEnhanced: React.FC<AdminCasesEnhancedProps> = ({
  onCloseCase,
  onLoginAsUser
}) => {
  const { toast } = useToast();
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Mock enhanced case data with realtor info and messages
  const cases = [
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
      seller: {
        name: "Mette Hansen",
        email: "mette.hansen@email.dk",
        phone: "+45 12 34 56 78",
        expectedTimeframe: "Inden for 3 måneder",
        priorities: ["Høj pris", "Hurtig salg", "Professionel markedsføring"]
      },
      offers: [
        {
          id: 1,
          agentName: "Lars Nielsen",
          agency: "EDC Aarhus Syd",
          agencyLogo: "/placeholder.svg",
          expectedPrice: "4.200.000 DKK",
          expectedPriceValue: 4200000,
          commission: "65.000 DKK",
          commissionValue: 65000,
          bindingPeriod: "6 måneder",
          marketingMethods: ["Online annoncering", "Print materiale", "Sociale medier"],
          submittedAt: "2024-01-13T10:30:00",
          status: "Afventer svar",
          contact: {
            phone: "+45 87 65 43 21",
            email: "lars.nielsen@edc.dk"
          },
          presentation: "Erfaren mægler med 15 års erfaring i Aarhus området."
        }
      ],
      messages: [
        {
          id: 1,
          sender: 'seller' as const,
          senderName: "Mette Hansen",
          message: "Hvornår kan I starte med fremvisninger?",
          timestamp: "2024-01-13T14:20:00"
        },
        {
          id: 2,
          sender: 'agent' as const,
          senderName: "Lars Nielsen",
          message: "Vi kan starte allerede næste uge. Jeg foreslår tirsdage og torsdage kl. 17-18.",
          timestamp: "2024-01-13T15:45:00"
        }
      ],
      timeline: [
        {
          id: 1,
          event: "Sag oprettet",
          timestamp: "2024-01-10T09:00:00",
          user: "System"
        },
        {
          id: 2,
          event: "Første tilbud modtaget",
          timestamp: "2024-01-13T10:30:00",
          user: "Lars Nielsen (EDC)"
        }
      ]
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
      status: "Afventer tilbud",
      seller: {
        name: "Peter Andersen",
        email: "peter.andersen@email.dk",
        phone: "+45 23 45 67 89",
        expectedTimeframe: "Inden for 6 måneder",
        priorities: ["Høj pris", "Minimal administration"]
      },
      offers: [],
      messages: [],
      timeline: [
        {
          id: 1,
          event: "Sag oprettet",
          timestamp: "2024-01-15T11:20:00",
          user: "System"
        }
      ]
    }
  ];

  const handleViewDetails = (caseData: any) => {
    setSelectedCase(caseData);
    setShowDetails(true);
  };

  const handleCloseCase = (caseData: any) => {
    if (onCloseCase) {
      onCloseCase(caseData);
    }
  };

  const handleLoginAsSeller = (seller: any) => {
    if (onLoginAsUser) {
      onLoginAsUser({
        name: seller.name,
        userType: 'sælger'
      });
    }
  };

  const handleLoginAsAgent = (agent: any) => {
    if (onLoginAsUser) {
      onLoginAsUser({
        name: agent.agentName,
        userType: 'mægler'
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Aktiv':
        return <Badge className="bg-green-100 text-green-800">Aktiv</Badge>;
      case 'Afventer tilbud':
        return <Badge className="bg-yellow-100 text-yellow-800">Afventer tilbud</Badge>;
      case 'Lukket':
        return <Badge className="bg-gray-100 text-gray-800">Lukket</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sager oversigt</CardTitle>
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
                <TableHead>Handlinger</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((caseItem) => (
                <TableRow key={caseItem.id}>
                  <TableCell className="font-medium">{caseItem.sagsnummer}</TableCell>
                  <TableCell>{caseItem.address}</TableCell>
                  <TableCell>{caseItem.type}</TableCell>
                  <TableCell className="text-green-600 font-medium">{caseItem.price}</TableCell>
                  <TableCell>{getStatusBadge(caseItem.status)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{caseItem.offers.length} tilbud</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{caseItem.messages.length}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(caseItem)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleLoginAsSeller(caseItem.seller)}
                      >
                        <UserCog className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCloseCase(caseItem)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Case Details Modal */}
      <AdminCaseDetails
        open={showDetails}
        onOpenChange={setShowDetails}
        caseData={selectedCase}
      />
    </div>
  );
};

export default AdminCasesEnhanced;
