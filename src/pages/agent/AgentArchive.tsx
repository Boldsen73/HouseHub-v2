
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Eye, Calendar, MapPin, Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminReturnBanner from '@/components/admin/AdminReturnBanner';

const AgentArchive = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Check if user is in admin session
  const isAdminSession = localStorage.getItem('admin_session_backup');

  // Mock archived cases data
  const archivedCases = [
    {
      id: 'HH-2024-001',
      address: 'Strandvejen 45, 2900 Hellerup',
      propertyType: 'Lejlighed',
      status: 'Vundet',
      submittedDate: '2024-01-15',
      closedDate: '2024-02-20',
      commission: '65.000 kr',
      expectedPrice: '4.200.000 kr',
      finalPrice: '4.150.000 kr'
    },
    {
      id: 'HH-2024-002',
      address: 'Østerbrogade 112, 2100 København Ø',
      propertyType: 'Hus',
      status: 'Tabt',
      submittedDate: '2024-01-20',
      closedDate: '2024-02-10',
      commission: '75.000 kr',
      expectedPrice: '5.800.000 kr',
      finalPrice: null
    },
    {
      id: 'HH-2024-003',
      address: 'Æbeløgade 15, 2100 København Ø',
      propertyType: 'Rækkehus',
      status: 'Vundet',
      submittedDate: '2024-02-01',
      closedDate: '2024-03-15',
      commission: '52.000 kr',
      expectedPrice: '3.400.000 kr',
      finalPrice: '3.450.000 kr'
    },
    {
      id: 'HH-2024-004',
      address: 'Skovvej 8, 3000 Helsingør',
      propertyType: 'Sommerhus',
      status: 'Vundet',
      submittedDate: '2024-02-15',
      closedDate: '2024-03-30',
      commission: '38.000 kr',
      expectedPrice: '2.200.000 kr',
      finalPrice: '2.180.000 kr'
    }
  ];

  const filteredCases = archivedCases.filter(case_ => {
    const matchesSearch = case_.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || case_.status.toLowerCase() === statusFilter;
    const matchesType = typeFilter === 'all' || case_.propertyType.toLowerCase() === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Vundet':
        return <Badge className="bg-green-100 text-green-800">Vundet</Badge>;
      case 'Tabt':
        return <Badge className="bg-red-100 text-red-800">Tabt</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isAdminSession && <AdminReturnBanner />}
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/maegler/dashboard">
              <Button variant="outline" size="sm" className="transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Tilbage til dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Arkiv</h1>
              <p className="text-gray-600">Oversigt over tidligere sager og tilbud</p>
            </div>
          </div>
          <Badge className="bg-blue-100 text-blue-800">
            {filteredCases.length} arkiverede sager
          </Badge>
        </div>

        {/* Filters */}
        <Card className="mb-6 transition-all duration-300 ease-in-out hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtrer sager
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Søg i sager
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Søg adresse eller sag-ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Status
                </label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle statusser</SelectItem>
                    <SelectItem value="vundet">Vundet</SelectItem>
                    <SelectItem value="tabt">Tabt</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Boligtype
                </label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle typer</SelectItem>
                    <SelectItem value="hus">Hus</SelectItem>
                    <SelectItem value="lejlighed">Lejlighed</SelectItem>
                    <SelectItem value="rækkehus">Rækkehus</SelectItem>
                    <SelectItem value="sommerhus">Sommerhus</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Periode
                </label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle perioder</SelectItem>
                    <SelectItem value="last_month">Sidste måned</SelectItem>
                    <SelectItem value="last_3_months">Sidste 3 måneder</SelectItem>
                    <SelectItem value="last_6_months">Sidste 6 måneder</SelectItem>
                    <SelectItem value="last_year">Sidste år</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cases List */}
        <div className="space-y-4">
          {filteredCases.map((case_) => (
            <Card key={case_.id} className="transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{case_.address}</h3>
                    <p className="text-gray-600 text-sm">Sag-ID: {case_.id}</p>
                  </div>
                  {getStatusBadge(case_.status)}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{case_.propertyType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Afsluttet: {case_.closedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Salær: {case_.commission}</span>
                  </div>
                  <div className="text-right">
                    <Button variant="outline" size="sm" className="transition-all duration-300 ease-in-out hover:scale-105">
                      <Eye className="w-4 h-4 mr-1" />
                      Se detaljer
                    </Button>
                  </div>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Forventet pris:</strong> {case_.expectedPrice}</p>
                  {case_.finalPrice && (
                    <p><strong>Endelig pris:</strong> {case_.finalPrice}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCases.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-gray-500 text-lg">Ingen sager fundet med de valgte filtre.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AgentArchive;
