import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  Search, 
  Home, 
  Mail, 
  Phone, 
  Eye, 
  Edit, 
  UserCog,
  Calendar,
  Filter,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminSellersProps {
  onLoginAsUser?: (userData: any) => void;
}

const AdminSellers: React.FC<AdminSellersProps> = ({ onLoginAsUser }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [postalCodeFilter, setPostalCodeFilter] = useState('');
  const [activeCasesFilter, setActiveCasesFilter] = useState('all');
  const [lastLoginFilter, setLastLoginFilter] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock seller data with enhanced information
  const sellers = [
    {
      id: 1,
      name: "Mette Hansen",
      email: "mette.hansen@email.dk",
      phone: "+45 12 34 56 78",
      address: "Åbyhøj Allé 123, 8230 Åbyhøj",
      postalCode: "8230",
      caseStatus: "Aktiv",
      activeCases: 1,
      registeredDate: "2024-01-10",
      lastLogin: "2024-01-20",
      expectedPrice: "4.500.000 DKK",
      offersReceived: 3,
      selectedBroker: null
    },
    {
      id: 2,
      name: "Peter Andersen",
      email: "peter.andersen@email.dk",
      phone: "+45 23 45 67 89",
      address: "Viby Torv 45, 8260 Viby J",
      postalCode: "8260",
      caseStatus: "Afventer tilbud",
      activeCases: 1,
      registeredDate: "2024-01-15",
      lastLogin: "2024-01-19",
      expectedPrice: "2.800.000 DKK",
      offersReceived: 0,
      selectedBroker: null
    },
    {
      id: 3,
      name: "Søren Christensen",
      email: "soren.christensen@email.dk",
      phone: "+45 34 56 78 90",
      address: "Risskov Hovedgade 78, 8240 Risskov",
      postalCode: "8240",
      caseStatus: "Mægler valgt",
      activeCases: 0,
      registeredDate: "2023-12-20",
      lastLogin: "2024-01-18",
      expectedPrice: "6.200.000 DKK",
      offersReceived: 5,
      selectedBroker: "Lars Nielsen (EDC)"
    },
    {
      id: 4,
      name: "Karen Nielsen",
      email: "karen.nielsen@email.dk",
      phone: "+45 45 67 89 01",
      address: "Brabrand Torv 12, 8220 Brabrand",
      postalCode: "8220",
      caseStatus: "Aktiv",
      activeCases: 2,
      registeredDate: "2024-01-05",
      lastLogin: "2024-01-15",
      expectedPrice: "3.200.000 DKK",
      offersReceived: 2,
      selectedBroker: null
    }
  ];

  const filteredSellers = sellers.filter(seller => {
    const matchesSearch = seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seller.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesName = seller.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesPostalCode = seller.postalCode.includes(postalCodeFilter);
    const matchesStatus = filterStatus === 'all' || seller.caseStatus.toLowerCase().includes(filterStatus.toLowerCase());
    
    const matchesActiveCases = activeCasesFilter === 'all' || 
      (activeCasesFilter === '0' && seller.activeCases === 0) ||
      (activeCasesFilter === '1' && seller.activeCases === 1) ||
      (activeCasesFilter === '2+' && seller.activeCases >= 2);

    const daysSinceLogin = Math.floor((new Date().getTime() - new Date(seller.lastLogin).getTime()) / (1000 * 3600 * 24));
    const matchesLastLogin = lastLoginFilter === 'all' ||
      (lastLoginFilter === 'today' && daysSinceLogin === 0) ||
      (lastLoginFilter === 'week' && daysSinceLogin <= 7) ||
      (lastLoginFilter === 'month' && daysSinceLogin <= 30) ||
      (lastLoginFilter === 'older' && daysSinceLogin > 30);

    return matchesSearch && matchesName && matchesPostalCode && matchesStatus && matchesActiveCases && matchesLastLogin;
  });

  const handleLoginAsSeller = (seller: any) => {
    if (onLoginAsUser) {
      onLoginAsUser({
        name: seller.name,
        userType: 'sælger'
      });
    }
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setNameFilter('');
    setPostalCodeFilter('');
    setActiveCasesFilter('all');
    setLastLoginFilter('all');
    setFilterStatus('all');
  };

  const hasActiveFilters = searchTerm || nameFilter || postalCodeFilter || 
    activeCasesFilter !== 'all' || lastLoginFilter !== 'all' || filterStatus !== 'all';

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Aktiv':
        return <Badge className="bg-green-100 text-green-800">Aktiv</Badge>;
      case 'Afventer tilbud':
        return <Badge className="bg-yellow-100 text-yellow-800">Afventer tilbud</Badge>;
      case 'Mægler valgt':
        return <Badge className="bg-blue-100 text-blue-800">Mægler valgt</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getLastLoginText = (lastLogin: string) => {
    const daysSince = Math.floor((new Date().getTime() - new Date(lastLogin).getTime()) / (1000 * 3600 * 24));
    if (daysSince === 0) return 'I dag';
    if (daysSince === 1) return 'I går';
    if (daysSince <= 7) return `${daysSince} dage siden`;
    if (daysSince <= 30) return `${Math.floor(daysSince / 7)} uger siden`;
    return `${Math.floor(daysSince / 30)} måneder siden`;
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Sælgere
            </CardTitle>
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearAllFilters}>
                <X className="w-4 h-4 mr-2" />
                Ryd filtre
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Main search */}
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Søg sælger eller adresse..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle statuser</SelectItem>
                  <SelectItem value="aktiv">Aktive sager</SelectItem>
                  <SelectItem value="afventer">Afventer tilbud</SelectItem>
                  <SelectItem value="valgt">Mægler valgt</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Advanced filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Navn</label>
                <Input
                  placeholder="Filtrer på navn"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Postnummer</label>
                <Input
                  placeholder="Filtrer på postnummer"
                  value={postalCodeFilter}
                  onChange={(e) => setPostalCodeFilter(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Antal aktive sager</label>
                <Select value={activeCasesFilter} onValueChange={setActiveCasesFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Alle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle</SelectItem>
                    <SelectItem value="0">0 sager</SelectItem>
                    <SelectItem value="1">1 sag</SelectItem>
                    <SelectItem value="2+">2+ sager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Sidst logget ind</label>
                <Select value={lastLoginFilter} onValueChange={setLastLoginFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Alle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle</SelectItem>
                    <SelectItem value="today">I dag</SelectItem>
                    <SelectItem value="week">Sidste uge</SelectItem>
                    <SelectItem value="month">Sidste måned</SelectItem>
                    <SelectItem value="older">Ældre end 1 måned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results summary */}
      {hasActiveFilters && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Filter className="w-4 h-4" />
              <span>Viser {filteredSellers.length} af {sellers.length} sælgere</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sellers Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sælger</TableHead>
                <TableHead>Ejendom</TableHead>
                <TableHead>Postnummer</TableHead>
                <TableHead>Kontakt</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aktive sager</TableHead>
                <TableHead>Forventet pris</TableHead>
                <TableHead>Tilbud</TableHead>
                <TableHead>Sidst logget ind</TableHead>
                <TableHead>Handlinger</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSellers.map((seller) => (
                <TableRow key={seller.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium">{seller.name}</div>
                        {seller.selectedBroker && (
                          <div className="text-sm text-blue-600">
                            Valgt: {seller.selectedBroker}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{seller.address}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{seller.postalCode}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="w-3 h-3" />
                        <span>{seller.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="w-3 h-3" />
                        <span>{seller.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(seller.caseStatus)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={seller.activeCases > 1 ? "text-orange-700 border-orange-200" : seller.activeCases === 1 ? "text-green-700 border-green-200" : "text-gray-700 border-gray-200"}
                    >
                      {seller.activeCases}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-green-600 font-medium">
                    {seller.expectedPrice}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {seller.offersReceived} tilbud
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">
                      {getLastLoginText(seller.lastLogin)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleLoginAsSeller(seller)}
                        className="text-blue-600 hover:text-blue-700"
                        title="Log ind som denne bruger"
                      >
                        <UserCog className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{filteredSellers.length}</div>
            <div className="text-sm text-gray-600">Aktive sælgere</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{filteredSellers.reduce((sum, s) => sum + s.offersReceived, 0)}</div>
            <div className="text-sm text-gray-600">Tilbud i alt</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {filteredSellers.length > 0 ? Math.round(filteredSellers.reduce((sum, s) => sum + s.activeCases, 0) / filteredSellers.length * 10) / 10 : 0}
            </div>
            <div className="text-sm text-gray-600">Gns. aktive sager</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {filteredSellers.length > 0 ? (filteredSellers.reduce((sum, s) => sum + s.offersReceived, 0) / filteredSellers.length).toFixed(1) : 0}
            </div>
            <div className="text-sm text-gray-600">Gns. tilbud per sag</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSellers;
