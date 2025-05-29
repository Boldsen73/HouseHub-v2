import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Home, 
  User, 
  DollarSign, 
  Calendar, 
  FileText, 
  Edit, 
  Trash2,
  Award,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Download,
  Users,
  Activity
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatDanishCurrency, formatDanishPercentage } from '@/lib/utils';

interface Message {
  id: number;
  sender: 'seller' | 'agent' | 'admin';
  senderName: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface TimelineEvent {
  id: number;
  event: string;
  timestamp: string;
  user?: string;
  type: 'created' | 'invited' | 'offer_received' | 'closed' | 'message' | 'other';
}

interface CaseDetails {
  id: number;
  sagsnummer: string;
  address: string;
  type: string;
  size: string;
  rooms: number;
  price: string;
  priceValue: number;
  status: string;
  seller: {
    name: string;
    email: string;
    phone: string;
    expectedTimeframe: string;
    priorities: string[];
  };
  offers: {
    id: number;
    agentName: string;
    agency: string;
    expectedPrice: string;
    expectedPriceValue: number;
    commission: string;
    commissionValue: number;
    bindingPeriod: string;
    marketingMethods: string[];
    submittedAt: string;
    status: string;
  }[];
  messages: Message[];
  timeline: TimelineEvent[];
}

interface AdminCaseDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseData: CaseDetails | null;
}

const AdminCaseDetails: React.FC<AdminCaseDetailsProps> = ({
  open,
  onOpenChange,
  caseData
}) => {
  const { toast } = useToast();
  const [editingOffer, setEditingOffer] = useState<number | null>(null);

  if (!caseData) return null;

  const handleDeleteOffer = (offerId: number) => {
    toast({
      title: "Tilbud slettet",
      description: "Tilbuddet er blevet slettet fra systemet.",
    });
  };

  const handleAssignWinner = (offerId: number) => {
    toast({
      title: "Vinder tildelt",
      description: "Mægleren er blevet tildelt som vinder af sagen.",
    });
  };

  const handleExportMessages = () => {
    toast({
      title: "Beskeder eksporteret",
      description: "Beskedhistorikken er blevet downloadet som CSV.",
    });
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

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'created': return <Home className="h-4 w-4 text-blue-500" />;
      case 'invited': return <Users className="h-4 w-4 text-purple-500" />;
      case 'offer_received': return <DollarSign className="h-4 w-4 text-green-500" />;
      case 'closed': return <Clock className="h-4 w-4 text-red-500" />;
      case 'message': return <MessageSquare className="h-4 w-4 text-orange-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSenderBadgeColor = (sender: string) => {
    switch (sender) {
      case 'seller': return 'bg-blue-100 text-blue-800';
      case 'agent': return 'bg-green-100 text-green-800';
      case 'admin': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSenderLabel = (sender: string) => {
    switch (sender) {
      case 'seller': return 'Sælger';
      case 'agent': return 'Mægler';
      case 'admin': return 'Admin';
      default: return 'Ukendt';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Sag detaljer - {caseData.sagsnummer}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Oversigt</TabsTrigger>
            <TabsTrigger value="seller">Sælger</TabsTrigger>
            <TabsTrigger value="offers">Tilbud ({caseData.offers.length})</TabsTrigger>
            <TabsTrigger value="messages">Beskeder ({caseData.messages.length})</TabsTrigger>
            <TabsTrigger value="timeline">Aktivitet</TabsTrigger>
            <TabsTrigger value="documents">Dokumenter</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Ejendom information
                  </CardTitle>
                  {getStatusBadge(caseData.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Adresse:</span>
                      <p className="text-gray-900">{caseData.address}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Type:</span>
                      <p className="text-gray-900">{caseData.type}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Størrelse:</span>
                      <p className="text-gray-900">{caseData.size}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Værelser:</span>
                      <p className="text-gray-900">{caseData.rooms}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Forventet pris:</span>
                      <p className="text-gray-900 font-semibold text-green-600">
                        {formatDanishCurrency(caseData.priceValue)}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Status:</span>
                      <p className="text-gray-900">{caseData.status}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seller" className="space-y-4">
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Sælger information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <span className="font-medium text-gray-700">Navn:</span>
                      <p className="text-gray-900 font-semibold">{caseData.seller.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="font-medium text-gray-700">Email:</span>
                      <p className="text-gray-900">{caseData.seller.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="font-medium text-gray-700">Telefon:</span>
                      <p className="text-gray-900">{caseData.seller.phone}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <span className="font-medium text-gray-700">Ønsket tidsramme:</span>
                      <p className="text-gray-900">{caseData.seller.expectedTimeframe}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Prioriteter:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {caseData.seller.priorities.map((priority, index) => (
                          <Badge key={index} variant="outline">{priority}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="offers" className="space-y-4">
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Modtagne tilbud
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mæglerkæde</TableHead>
                      <TableHead>Mægler</TableHead>
                      <TableHead>Forventet pris</TableHead>
                      <TableHead>Salær</TableHead>
                      <TableHead>Binding</TableHead>
                      <TableHead>Afgivet</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Handlinger</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {caseData.offers.map((offer) => (
                      <TableRow key={offer.id}>
                        <TableCell className="font-medium">{offer.agency}</TableCell>
                        <TableCell>{offer.agentName}</TableCell>
                        <TableCell className="text-green-600 font-medium">
                          {formatDanishCurrency(offer.expectedPriceValue)}
                        </TableCell>
                        <TableCell>
                          {formatDanishCurrency(offer.commissionValue)}
                        </TableCell>
                        <TableCell>{offer.bindingPeriod}</TableCell>
                        <TableCell>{new Date(offer.submittedAt).toLocaleDateString('da-DK')}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{offer.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteOffer(offer.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleAssignWinner(offer.id)}
                            >
                              <Award className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Beskedhistorik mellem sælger og mægler
                  </CardTitle>
                  <Button variant="outline" onClick={handleExportMessages}>
                    <Download className="h-4 w-4 mr-2" />
                    Eksporter som CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {caseData.messages.length > 0 ? (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {caseData.messages.map((message) => (
                      <div key={message.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Badge className={getSenderBadgeColor(message.sender)}>
                              {getSenderLabel(message.sender)}
                            </Badge>
                            <span className="font-medium text-gray-900">{message.senderName}</span>
                            {!message.read && message.sender !== 'admin' && (
                              <Badge variant="destructive" className="text-xs">Ulæst</Badge>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(message.timestamp).toLocaleString('da-DK', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-gray-700 leading-relaxed">{message.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Ingen beskeder udvekslet endnu</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Sag aktivitet og tidslinje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {caseData.timeline.map((event, index) => (
                    <div key={event.id} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 border-2 border-white shadow">
                          {getEventIcon(event.type)}
                        </div>
                        {index < caseData.timeline.length - 1 && (
                          <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900">{event.event}</h4>
                          <span className="text-sm text-gray-500">
                            {new Date(event.timestamp).toLocaleString('da-DK', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        {event.user && (
                          <p className="text-sm text-gray-600">Af: {event.user}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Dokumenter og filer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Ingen dokumenter uploadet endnu</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AdminCaseDetails;
