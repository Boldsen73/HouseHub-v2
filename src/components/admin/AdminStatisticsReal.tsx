
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Download, Home, Clock, Users, Award, Building2, Target, DollarSign } from 'lucide-react';

const AdminStatisticsReal = () => {
  const [timeRange, setTimeRange] = useState('last_3_months');
  const [statistics, setStatistics] = useState({
    activeCases: 0,
    closedCases: 0,
    totalAgents: 0,
    averageCommission: 0,
    avgResponseTime: 0,
    winningBidsPerAgent: 0
  });

  useEffect(() => {
    loadStatistics();
    
    // Listen for data changes
    const handleStorageChange = () => {
      loadStatistics();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadStatistics = () => {
    // Get closed cases
    const closedCases = JSON.parse(localStorage.getItem('househub_closed_cases') || '[]');
    const editedCases = JSON.parse(localStorage.getItem('househub_edited_cases') || '[]');
    
    // Mock data - in real app this would come from API
    const mockCases = [
      { id: 1, status: 'Aktiv', commission: 65000 },
      { id: 2, status: 'Tilbud modtaget', commission: 58000 },
      { id: 3, status: 'Mægler valgt', commission: 72000 }
    ];

    // Filter out closed cases
    const activeCases = mockCases.filter(c => 
      !closedCases.some((cc: any) => cc.id === c.id.toString())
    );

    // Calculate statistics
    const totalCommission = activeCases.reduce((sum, c) => sum + c.commission, 0);
    const avgCommission = activeCases.length > 0 ? totalCommission / activeCases.length : 0;

    setStatistics({
      activeCases: activeCases.length,
      closedCases: closedCases.length,
      totalAgents: 47, // Mock data
      averageCommission: avgCommission,
      avgResponseTime: 1.8,
      winningBidsPerAgent: 2.3
    });
  };

  // Mock data for charts
  const monthlyData = [
    { måned: 'Jan', sager: 22, afsluttede: 18, salær: 58000 },
    { måned: 'Feb', sager: 28, afsluttede: 24, salær: 62000 },
    { måned: 'Mar', sager: 35, afsluttede: 31, salær: 65000 },
    { måned: 'Apr', sager: 31, afsluttede: 28, salær: 59000 },
    { måned: 'Maj', sager: 42, afsluttede: 38, salær: 67000 },
    { måned: 'Jun', sager: 38, afsluttede: 35, salær: 64000 }
  ];

  const agentPerformanceData = [
    { mægler: 'Maria Hansen', vundneBud: 12, salær: 62000 },
    { mægler: 'Peter Nielsen', vundneBud: 8, salær: 58000 },
    { mægler: 'Lars Petersen', vundneBud: 15, salær: 65000 },
    { mægler: 'Anne Christensen', vundneBud: 10, salær: 61000 },
    { mægler: 'Thomas Andersen', vundneBud: 6, salær: 55000 }
  ];

  const caseStatusData = [
    { status: 'Aktive', antal: statistics.activeCases, color: '#10b981' },
    { status: 'Lukkede', antal: statistics.closedCases, color: '#6b7280' },
    { status: 'Under behandling', antal: 8, color: '#f59e0b' },
    { status: 'Afventer svar', antal: 12, color: '#3b82f6' }
  ];

  const handleExportStatistics = () => {
    const csvData = `Statistik,Værdi
Aktive sager,${statistics.activeCases}
Lukkede sager,${statistics.closedCases}
Totale mæglere,${statistics.totalAgents}
Gennemsnitligt salær,${statistics.averageCommission.toFixed(0)}
Gennemsnitlig responstid,${statistics.avgResponseTime} dage
Vundne bud per mægler,${statistics.winningBidsPerAgent}`;
    
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `househub-statistik-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Statistik og KPI'er</h2>
          <p className="text-gray-600">Realtidsdata fra HouseHub platformen</p>
        </div>
        <div className="flex items-center gap-4">
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
          <Button onClick={handleExportStatistics} className="bg-green-600 hover:bg-green-700">
            <Download className="w-4 h-4 mr-2" />
            Eksporter statistik
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktive sager</CardTitle>
            <Home className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{statistics.activeCases}</div>
            <p className="text-xs text-gray-600">Sager under behandling</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lukkede sager</CardTitle>
            <Award className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statistics.closedCases}</div>
            <p className="text-xs text-gray-600">Afsluttede sager</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totale mæglere</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{statistics.totalAgents}</div>
            <p className="text-xs text-gray-600">Aktive på platformen</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gennemsnitligt salær</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {statistics.averageCommission.toLocaleString('da-DK')} kr
            </div>
            <p className="text-xs text-gray-600">Per afsluttet sag</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gns. responstid</CardTitle>
            <Clock className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{statistics.avgResponseTime} dage</div>
            <p className="text-xs text-gray-600">Fra oprettelse til første bud</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vundne bud per mægler</CardTitle>
            <Target className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600">{statistics.winningBidsPerAgent}</div>
            <p className="text-xs text-gray-600">Gennemsnitligt antal</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Månedlig performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="måned" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'salær' ? `${value.toLocaleString('da-DK')} kr` : value,
                    name === 'sager' ? 'Nye sager' : name === 'afsluttede' ? 'Afsluttede' : 'Gennemsnitligt salær'
                  ]}
                />
                <Bar dataKey="sager" fill="#3b82f6" name="sager" />
                <Bar dataKey="afsluttede" fill="#10b981" name="afsluttede" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Case Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Sag status fordeling</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={caseStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ status, percent }) => `${status} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="antal"
                >
                  {caseStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Agent Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top mæglere performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Mægler</th>
                  <th className="text-left py-3 px-4">Vundne bud</th>
                  <th className="text-left py-3 px-4">Gennemsnitligt salær</th>
                  <th className="text-left py-3 px-4">Performance</th>
                </tr>
              </thead>
              <tbody>
                {agentPerformanceData.map((agent, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4 font-medium">{agent.mægler}</td>
                    <td className="py-3 px-4">
                      <Badge className="bg-blue-100 text-blue-800">
                        {agent.vundneBud} bud
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-green-600 font-medium">
                      {agent.salær.toLocaleString('da-DK')} kr
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(agent.vundneBud / 15) * 100}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance sammenfatning</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800">Succesrate</h4>
              <p className="text-2xl font-bold text-green-600">76%</p>
              <p className="text-sm text-green-700">Sager der får tilbud</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800">Konverteringsrate</h4>
              <p className="text-2xl font-bold text-blue-600">68%</p>
              <p className="text-sm text-blue-700">Tilbud der accepteres</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-800">Vækst</h4>
              <p className="text-2xl font-bold text-purple-600">+12%</p>
              <p className="text-sm text-purple-700">Vs. sidste måned</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h4 className="font-medium text-orange-800">Kundertilfredshed</h4>
              <p className="text-2xl font-bold text-orange-600">4.8/5</p>
              <p className="text-sm text-orange-700">Gennemsnitlig rating</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStatisticsReal;
