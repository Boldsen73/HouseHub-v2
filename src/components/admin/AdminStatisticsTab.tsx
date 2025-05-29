
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Download, Home, Clock, Users, Award } from 'lucide-react';

const AdminStatisticsTab: React.FC = () => {
  const [timeRange, setTimeRange] = useState('last_3_months');

  // Mock statistics data
  const summaryStats = {
    totalCases: 203,
    closedCases: 156,
    avgBidsPerCase: 3.2,
    avgResponseTime: 1.8 // days
  };

  const weeklyData = [
    { uge: 'Uge 20', sager: 8 },
    { uge: 'Uge 21', sager: 12 },
    { uge: 'Uge 22', sager: 15 },
    { uge: 'Uge 23', sager: 9 },
    { uge: 'Uge 24', sager: 11 },
    { uge: 'Uge 25', sager: 13 }
  ];

  const monthlyData = [
    { måned: 'Jan', sager: 32 },
    { måned: 'Feb', sager: 28 },
    { måned: 'Mar', sager: 45 },
    { måned: 'Apr', sager: 38 },
    { måned: 'Maj', sager: 42 },
    { måned: 'Jun', sager: 35 }
  ];

  const agencyData = [
    { name: 'EDC', value: 28, color: '#10b981' },
    { name: 'Danbolig', value: 22, color: '#3b82f6' },
    { name: 'Boligmægleren', value: 18, color: '#f59e0b' },
    { name: 'Nybolig', value: 15, color: '#8b5cf6' },
    { name: 'Andre', value: 17, color: '#6b7280' }
  ];

  const handleExportCSV = () => {
    // Mock CSV export
    const csvData = `Periode,Nye sager,Afsluttede sager
Januar,32,28
Februar,28,24
Marts,45,38
April,38,32
Maj,42,36
Juni,35,30`;
    
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'househub-statistik.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header with Export */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Statistik og Analytics</h2>
        <Button onClick={handleExportCSV} className="bg-green-600 hover:bg-green-700">
          <Download className="w-4 h-4 mr-2" />
          Download som CSV
        </Button>
      </div>

      {/* Time Range Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">
              Tidsperiode:
            </label>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last_month">Sidste måned</SelectItem>
                <SelectItem value="last_3_months">Sidste 3 måneder</SelectItem>
                <SelectItem value="last_6_months">Sidste 6 måneder</SelectItem>
                <SelectItem value="last_year">Sidste år</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              Data baseret på {timeRange.replace('last_', 'sidste ').replace('_', ' ')}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totale sager</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{summaryStats.totalCases}</div>
            <p className="text-xs text-muted-foreground">
              Alle sager i systemet
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Afsluttede sager</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{summaryStats.closedCases}</div>
            <p className="text-xs text-muted-foreground">
              Gennemførte handler
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gns. bud pr. sag</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{summaryStats.avgBidsPerCase}</div>
            <p className="text-xs text-muted-foreground">
              Gennemsnitligt antal tilbud
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gns. responstid</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{summaryStats.avgResponseTime} dage</div>
            <p className="text-xs text-muted-foreground">
              Fra oprettelse til første bud
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Cases Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Sager pr. uge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="uge" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sager" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Cases Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Sager pr. måned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="måned" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sager" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Agency Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Mæglerkæde fordeling</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={agencyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {agencyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="space-y-3">
              {agencyData.map((agency) => (
                <div key={agency.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: agency.color }}
                    />
                    <span className="font-medium">{agency.name}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {agency.value} sager
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance oversigt</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800">Konverteringsrate</h4>
              <p className="text-2xl font-bold text-green-600">76%</p>
              <p className="text-sm text-green-700">Sager der får tilbud</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800">Afslutningsrate</h4>
              <p className="text-2xl font-bold text-blue-600">68%</p>
              <p className="text-sm text-blue-700">Tilbud der accepteres</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-800">Vækst</h4>
              <p className="text-2xl font-bold text-purple-600">+12%</p>
              <p className="text-sm text-purple-700">Vs. sidste måned</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStatisticsTab;
