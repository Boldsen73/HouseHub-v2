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
  Building2, 
  Mail, 
  Phone, 
  Eye, 
  Edit, 
  UserCog,
  Award,
  Filter,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminAgentsProps {
  onLoginAsUser?: (userData: any) => void;
}

const AdminAgents: React.FC<AdminAgentsProps> = ({ onLoginAsUser }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [postalCodeFilter, setPostalCodeFilter] = useState('');
  const [activeCasesFilter, setActiveCasesFilter] = useState('all');
  const [lastLoginFilter, setLastLoginFilter] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock agent data with enhanced information
  const agents = [
    {
      id: 1,
      name: "Lars Nielsen",
      agency: "EDC Aarhus Syd",
      email: "lars.nielsen@edc.dk",
      phone: "+45 87 65 43 21",
      status: "Aktiv",
      casesCount: 12,
      activeCases: 8,
      wonCases: 8,
      successRate: 66.7,
      avgCommission: 1.8,
      joinedDate: "2023-03-15",
      lastLogin: "2024-01-20",
      postalCode: "8270",
      logo: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Anne Sørensen",
      agency: "Danbolig Aarhus",
      email: "anne.sorensen@danbolig.dk",
      phone: "+45 76 54 32 10",
      status: "Aktiv",
      casesCount: 8,
      activeCases: 3,
      wonCases: 5,
      successRate: 62.5,
      avgCommission: 1.9,
      joinedDate: "2023-01-20",
      lastLogin: "2024-01-19",
      postalCode: "8000",
      logo: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Michael Pedersen",
      agency: "Boligmægleren",
      email: "michael.pedersen@boligmaegleren.dk",
      phone: "+45 65 43 21 09",
      status: "Inaktiv",
      casesCount: 15,
      activeCases: 0,
      wonCases: 9,
      successRate: 60.0,
      avgCommission: 2.1,
      joinedDate: "2022-11-10",
      lastLogin: "2024-01-10",
      postalCode: "8240",
      logo: "/placeholder.svg"
    }
  ];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.agency.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesName = agent.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesPostalCode = agent.postalCode.includes(postalCodeFilter);
    const matchesStatus = filterStatus === 'all' || agent.status.toLowerCase() === filterStatus.toLowerCase();
    
    const matchesActiveCases = activeCasesFilter === 'all' || 
      (activeCasesFilter === '0' && agent.activeCases === 0) ||
      (activeCasesFilter === '1-5' && agent.activeCases >= 1 && agent.activeCases <= 5) ||
      (activeCasesFilter === '6-10' && agent.activeCases >= 6 && agent.activeCases <= 10) ||
      (activeCasesFilter === '10+' && agent.activeCases > 10);

    const daysSinceLogin = Math.floor((new Date().getTime() - new Date(agent.lastLogin).getTime()) / (1000 * 3600 * 24));
    const matchesLastLogin = lastLoginFilter === 'all' ||
      (lastLoginFilter === 'today' && daysSinceLogin === 0) ||
      (lastLoginFilter === 'week' && daysSinceLogin <= 7) ||
      (lastLoginFilter === 'month' && daysSinceLogin <= 30) ||
      (lastLoginFilter === 'older' && daysSinceLogin > 30);

    return matchesSearch && matchesName && matchesPostalCode && matchesStatus && matchesActiveCases && matchesLastLogin;
  });

  const handleLoginAsAgent = (agent: any) => {
    if (onLoginAsUser) {
      onLoginAsUser({
        name: agent.name,
        userType: 'mægler'
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
    return status === 'Aktiv' ? (
      <Badge className="bg-green-100 text-green-800">Aktiv</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800">Inaktiv</Badge>
    );
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
              Mæglere
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
                    placeholder="Søg mægler eller mæglerkæde..."
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
                  <SelectItem value="aktiv">Aktive</SelectItem>
                  <SelectItem value="inaktiv">Inaktive</SelectItem>
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
                    <SelectItem value="1-5">1-5 sager</SelectItem>
                    <SelectItem value="6-10">6-10 sager</SelectItem>
                    <SelectItem value="10+">10+ sager</SelectItem>
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
              <span>Viser {filteredAgents.length} af {agents.length} mæglere</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Agents Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mægler</TableHead>
                <TableHead>Mæglerkæde</TableHead>
                <TableHead>Postnummer</TableHead>
                <TableHead>Kontakt</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aktive sager</TableHead>
                <TableHead>Vundet</TableHead>
                <TableHead>Success rate</TableHead>
                <TableHead>Sidst logget ind</TableHead>
                <TableHead>Handlinger</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-sm text-gray-500">
                          Medlem siden {new Date(agent.joinedDate).toLocaleDateString('da-DK')}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <span>{agent.agency}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{agent.postalCode}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="w-3 h-3" />
                        <span>{agent.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="w-3 h-3" />
                        <span>{agent.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(agent.status)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={agent.activeCases > 5 ? "text-green-700 border-green-200" : "text-blue-700 border-blue-200"}
                    >
                      {agent.activeCases}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span>{agent.wonCases}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={agent.successRate > 65 ? "text-green-700 border-green-200" : "text-orange-700 border-orange-200"}
                    >
                      {agent.successRate}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">
                      {getLastLoginText(agent.lastLogin)}
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
                        onClick={() => handleLoginAsAgent(agent)}
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
            <div className="text-2xl font-bold text-blue-600">{filteredAgents.filter(a => a.status === 'Aktiv').length}</div>
            <div className="text-sm text-gray-600">Aktive mæglere</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{filteredAgents.reduce((sum, a) => sum + a.wonCases, 0)}</div>
            <div className="text-sm text-gray-600">Vundne sager i alt</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {filteredAgents.length > 0 ? Math.round(filteredAgents.reduce((sum, a) => sum + a.successRate, 0) / filteredAgents.length) : 0}%
            </div>
            <div className="text-sm text-gray-600">Gns. success rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {filteredAgents.length > 0 ? (filteredAgents.reduce((sum, a) => sum + a.avgCommission, 0) / filteredAgents.length).toFixed(1) : 0}%
            </div>
            <div className="text-sm text-gray-600">Gns. salær</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAgents;
