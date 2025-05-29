
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Eye, Edit, Trash2, Award, DollarSign } from 'lucide-react';

interface Offer {
  id: number;
  caseAddress: string;
  agentName: string;
  agencyName: string;
  offerPrice: number;
  commission: number;
  bindingPeriod: string;
  marketingMethods: string[];
  status: 'pending' | 'accepted' | 'rejected';
  submittedDate: string;
  sellerName: string;
  score: number;
}

const AdminOffers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Mock data
  const offers: Offer[] = [
    {
      id: 1,
      caseAddress: 'Strandvejen 45, 2900 Hellerup',
      agentName: 'Maria Hansen',
      agencyName: 'EDC Aarhus Syd',
      offerPrice: 4250000,
      commission: 65000,
      bindingPeriod: '6 måneder',
      marketingMethods: ['Boligsiden', 'Facebook', 'Lokalaviser'],
      status: 'accepted',
      submittedDate: '16/01/2024',
      sellerName: 'Lars Petersen',
      score: 88
    },
    {
      id: 2,
      caseAddress: 'Strandvejen 45, 2900 Hellerup',
      agentName: 'Peter Nielsen',
      agencyName: 'Danbolig København',
      offerPrice: 4100000,
      commission: 62000,
      bindingPeriod: '4 måneder',
      marketingMethods: ['Boligsiden', 'Instagram'],
      status: 'rejected',
      submittedDate: '17/01/2024',
      sellerName: 'Lars Petersen',
      score: 75
    },
    {
      id: 3,
      caseAddress: 'Nørrebrogade 123, 2200 København N',
      agentName: 'Camilla Mikkelsen',
      agencyName: 'EDC København',
      offerPrice: 3150000,
      commission: 55000,
      bindingPeriod: '6 måneder',
      marketingMethods: ['Boligsiden', 'Facebook', 'Google Ads'],
      status: 'pending',
      submittedDate: '18/01/2024',
      sellerName: 'Maria Hansen',
      score: 92
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return <Badge className="bg-green-100 text-green-800">Accepteret</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Afvist</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Afventer</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('da-DK', { 
      style: 'currency', 
      currency: 'DKK', 
      minimumFractionDigits: 0 
    }).format(value);
  };

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.caseAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.agencyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.sellerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || offer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewOffer = (offer: Offer) => {
    setSelectedOffer(offer);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Søg og filtrer tilbud
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Søg på adresse, mægler eller sælger..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle statusser</SelectItem>
                <SelectItem value="pending">Afventer</SelectItem>
                <SelectItem value="accepted">Accepteret</SelectItem>
                <SelectItem value="rejected">Afvist</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Offers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Alle tilbud ({filteredOffers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sag</TableHead>
                <TableHead>Mægler</TableHead>
                <TableHead>Agentur</TableHead>
                <TableHead>Tilbudspris</TableHead>
                <TableHead>Salær</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Afgivet</TableHead>
                <TableHead>Handlinger</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOffers.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell className="font-medium">{offer.caseAddress}</TableCell>
                  <TableCell>{offer.agentName}</TableCell>
                  <TableCell>{offer.agencyName}</TableCell>
                  <TableCell>{formatCurrency(offer.offerPrice)}</TableCell>
                  <TableCell>{formatCurrency(offer.commission)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {offer.score}/100
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(offer.status)}</TableCell>
                  <TableCell>{offer.submittedDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewOffer(offer)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Offer Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Tilbud Detaljer - {selectedOffer?.agentName}
            </DialogTitle>
          </DialogHeader>
          
          {selectedOffer && (
            <div className="space-y-6">
              {/* Offer Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Tilbudsdetaljer
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="font-medium">Sag:</span> {selectedOffer.caseAddress}
                    </div>
                    <div>
                      <span className="font-medium">Sælger:</span> {selectedOffer.sellerName}
                    </div>
                    <div>
                      <span className="font-medium">Tilbudspris:</span> {formatCurrency(selectedOffer.offerPrice)}
                    </div>
                    <div>
                      <span className="font-medium">Salær:</span> {formatCurrency(selectedOffer.commission)}
                    </div>
                    <div>
                      <span className="font-medium">Salær %:</span> {((selectedOffer.commission / selectedOffer.offerPrice) * 100).toFixed(2)}%
                    </div>
                    <div>
                      <span className="font-medium">Bindingsperiode:</span> {selectedOffer.bindingPeriod}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span> {getStatusBadge(selectedOffer.status)}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Mægler</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="font-medium">Navn:</span> {selectedOffer.agentName}
                    </div>
                    <div>
                      <span className="font-medium">Agentur:</span> {selectedOffer.agencyName}
                    </div>
                    <div>
                      <span className="font-medium">HouseHub Score:</span> 
                      <Badge className="ml-2 bg-blue-100 text-blue-800">
                        {selectedOffer.score}/100
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium">Afgivet:</span> {selectedOffer.submittedDate}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Marketing Methods */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Markedsføringsmetoder
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedOffer.marketingMethods.map((method, index) => (
                      <Badge 
                        key={index} 
                        className="bg-green-100 text-green-800 border-green-200"
                      >
                        {method}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Admin Actions */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg">Administrator handlinger</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Rediger tilbud
                    </Button>
                    <Button variant="outline" className="text-green-600 hover:text-green-700">
                      <Award className="w-4 h-4 mr-2" />
                      Tildel som vinder
                    </Button>
                    <Button variant="outline" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Slet tilbud
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOffers;
