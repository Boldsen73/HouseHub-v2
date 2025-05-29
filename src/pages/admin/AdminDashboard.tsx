import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  Home, 
  TrendingUp, 
  Archive, 
  Search,
  ChevronRight,
  Settings,
  MessageSquare
} from 'lucide-react';
import { getTestCases, getTestUsers, updateCaseStatus, archiveCaseMessages, TestCase, TestUser } from '@/utils/testData';
import UserManagement from '@/components/admin/UserManagement';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [cases, setCases] = useState<TestCase[]>([]);
  const [users, setUsers] = useState<TestUser[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'overview' | 'cases' | 'users' | 'archive'>('overview');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setCases(getTestCases());
    setUsers(getTestUsers());
  };

  const handleStatusChange = (caseId: string, newStatus: TestCase['status']) => {
    updateCaseStatus(caseId, newStatus);
    
    // If case is being archived, archive messages too
    if (newStatus === 'archived') {
      archiveCaseMessages(caseId);
    }
    
    loadData();
    toast({
      title: "Sagsstatus opdateret",
      description: `Sagen er nu ${getStatusText(newStatus)}`,
    });
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      'draft': 'kladde',
      'active': 'aktiv',
      'showing_booked': 'fremvisning booket',
      'showing_completed': 'fremvisning afsluttet',
      'offers_received': 'tilbud modtaget',
      'realtor_selected': 'mægler valgt',
      'archived': 'arkiveret',
      'withdrawn': 'trukket tilbage'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap = {
      'draft': 'bg-gray-100 text-gray-800',
      'active': 'bg-blue-100 text-blue-800',
      'showing_booked': 'bg-yellow-100 text-yellow-800',
      'showing_completed': 'bg-orange-100 text-orange-800',
      'offers_received': 'bg-purple-100 text-purple-800',
      'realtor_selected': 'bg-green-100 text-green-800',
      'archived': 'bg-gray-100 text-gray-600',
      'withdrawn': 'bg-red-100 text-red-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredCases = cases.filter(case_ => {
    const matchesSearch = searchTerm === '' || 
      case_.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.sagsnummer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || case_.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const activeCases = cases.filter(c => !['archived', 'withdrawn'].includes(c.status));
  const archivedCases = cases.filter(c => ['archived', 'withdrawn'].includes(c.status));
  const sellers = users.filter(u => u.role === 'seller');
  const agents = users.filter(u => u.role === 'agent');

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Aktive sager</CardTitle>
          <Home className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeCases.length}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sælgere</CardTitle>
          <Users className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{sellers.length}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Mæglere</CardTitle>
          <Users className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{agents.length}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Arkiverede</CardTitle>
          <Archive className="h-4 w-4 text-gray-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{archivedCases.length}</div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCases = () => (
    <div>
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Søg i sager..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrer efter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle statuser</SelectItem>
            <SelectItem value="active">Aktiv</SelectItem>
            <SelectItem value="showing_booked">Fremvisning booket</SelectItem>
            <SelectItem value="showing_completed">Fremvisning afsluttet</SelectItem>
            <SelectItem value="offers_received">Tilbud modtaget</SelectItem>
            <SelectItem value="realtor_selected">Mægler valgt</SelectItem>
            <SelectItem value="archived">Arkiveret</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredCases.map((case_) => (
          <Card key={case_.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{case_.sagsnummer}</h3>
                    <Badge className={getStatusColor(case_.status)}>
                      {getStatusText(case_.status)}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-1">{case_.address}</p>
                  <p className="text-sm text-gray-500">
                    {case_.type} • {case_.size} m² • {case_.price}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  {case_.status === 'showing_completed' && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusChange(case_.id, 'offers_received')}
                    >
                      Gør tilbud tilgængelige
                    </Button>
                  )}
                  
                  {case_.status === 'offers_received' && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusChange(case_.id, 'realtor_selected')}
                    >
                      Marker som valgt
                    </Button>
                  )}
                  
                  {!['archived', 'withdrawn'].includes(case_.status) && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusChange(case_.id, 'archived')}
                    >
                      Arkiver
                    </Button>
                  )}
                  
                  <Button size="sm" variant="outline">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderUsers = () => (
    <UserManagement users={users} onUsersUpdated={loadData} />
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Administrator Dashboard</h1>
          <p className="text-gray-600">Administrer sager, brugere og systemindstillinger</p>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: 'overview', label: 'Oversigt', icon: TrendingUp },
              { key: 'cases', label: 'Sager', icon: Home },
              { key: 'users', label: 'Brugere', icon: Users },
              { key: 'archive', label: 'Arkiv', icon: Archive }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(key as any)}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'cases' && renderCases()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'archive' && renderCases()}
      </div>
    </div>
  );
};

export default AdminDashboard;
