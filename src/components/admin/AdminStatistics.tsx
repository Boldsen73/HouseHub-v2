import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Calendar, TrendingUp, Filter, Download } from 'lucide-react';
import { formatDanishCurrency } from '@/lib/utils';

interface AdminStatisticsProps {
  detailed?: boolean;
}

const AdminStatistics: React.FC<AdminStatisticsProps> = ({ detailed = false }) => {
  const [timeRange, setTimeRange] = useState('last_3_months');
  const [chartType, setChartType] = useState('monthly');

  // Enhanced mock data for detailed statistics
  const monthlyCasesData = [
    { month: 'Jan', sager: 22, tilbud: 67, afsluttede: 18 },
    { month: 'Feb', sager: 28, tilbud: 84, afsluttede: 24 },
    { month: 'Mar', sager: 35, tilbud: 98, afsluttede: 31 },
    { month: 'Apr', sager: 31, tilbud: 89, afsluttede: 28 },
    { month: 'Maj', sager: 42, tilbud: 126, afsluttede: 38 },
    { month: 'Jun', sager: 38, tilbud: 114, afsluttede: 35 }
  ];

  const salaryDevelopmentData = [
    { month: 'Jan', gennemsnit: 58000, median: 55000, min: 45000, max: 72000 },
    { month: 'Feb', gennemsnit: 59500, median: 56000, min: 46000, max: 74000 },
    { month: 'Mar', gennemsnit: 61000, median: 58000, min: 48000, max: 76000 },
    { month: 'Apr', gennemsnit: 62200, median: 59000, min: 49000, max: 78000 },
    { month: 'Maj', gennemsnit: 63800, median: 61000, min: 51000, max: 80000 },
    { month: 'Jun', gennemsnit: 64500, median: 62000, min: 52000, max: 82000 }
  ];

  const bidsPerCaseData = [
    { tilbudAntal: '1 tilbud', antal: 12, procent: 15.8 },
    { tilbudAntal: '2 tilbud', antal: 23, procent: 30.3 },
    { tilbudAntal: '3 tilbud', antal: 28, procent: 36.8 },
    { tilbudAntal: '4 tilbud', antal: 18, procent: 23.7 },
    { tilbudAntal: '5+ tilbud', antal: 15, procent: 19.7 }
  ];

  const agencyPerformanceData = [
    { name: 'EDC', value: 28, color: '#10b981' },
    { name: 'Danbolig', value: 22, color: '#3b82f6' },
    { name: 'Boligmægleren', value: 18, color: '#f59e0b' },
    { name: 'Nybolig', value: 15, color: '#8b5cf6' },
    { name: 'Andre', value: 17, color: '#6b7280' }
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#6b7280'];

  const responseTimeData = [
    { måned: 'Jan', gennemsnit: 2.8, målsætning: 2.0 },
    { måned: 'Feb', gennemsnit: 2.5, målsætning: 2.0 },
    { måned: 'Mar', gennemsnit: 2.2, målsætning: 2.0 },
    { måned: 'Apr', gennemsnit: 2.0, målsætning: 2.0 },
    { måned: 'Maj', gennemsnit: 1.8, målsætning: 2.0 },
    { måned: 'Jun', gennemsnit: 1.6, målsætning: 2.0 }
  ];

  // Custom formatter for tooltips with Danish formatting
  const formatTooltipValue = (value: any, name: string) => {
    if (name.includes('gennemsnit') || name.includes('median') || name.includes('min') || name.includes('max')) {
      return [formatDanishCurrency(value), name];
    }
    return [value, name];
  };

  return (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Statistik analyse
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Eksporter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Tidsperiode
              </label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last_month">Sidste måned</SelectItem>
                  <SelectItem value="last_3_months">Sidste 3 måneder</SelectItem>
                  <SelectItem value="last_6_months">Sidste 6 måneder</SelectItem>
                  <SelectItem value="last_year">Sidste år</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Visningstype
              </label>
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Månedlig</SelectItem>
                  <SelectItem value="weekly">Ugentlig</SelectItem>
                  <SelectItem value="quarterly">Kvartalsvis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                Data baseret på {timeRange.replace('last_', 'sidste ').replace('_', ' ')}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Cases and Offers */}
      <Card>
        <CardHeader>
          <CardTitle>Sager og tilbud udvikling</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={monthlyCasesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [value, name === 'sager' ? 'Nye sager' : name === 'tilbud' ? 'Nye tilbud' : 'Afsluttede sager']}
              />
              <Bar dataKey="sager" fill="#3b82f6" name="sager" />
              <Bar dataKey="tilbud" fill="#10b981" name="tilbud" />
              <Bar dataKey="afsluttede" fill="#8b5cf6" name="afsluttede" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Salary Development */}
      <Card>
        <CardHeader>
          <CardTitle>Salærudvikling over tid</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salaryDevelopmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `${(value / 1000)}k`} />
              <Tooltip 
                formatter={formatTooltipValue}
              />
              <Area type="monotone" dataKey="max" stackId="1" stroke="#ef4444" fill="#fef2f2" />
              <Area type="monotone" dataKey="gennemsnit" stackId="2" stroke="#3b82f6" fill="#dbeafe" />
              <Area type="monotone" dataKey="median" stackId="3" stroke="#10b981" fill="#dcfce7" />
              <Line type="monotone" dataKey="min" stroke="#f59e0b" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bid Distribution and Agency Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tilbud per sag fordeling</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={bidsPerCaseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tilbudAntal" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [value, name === 'antal' ? 'Antal sager' : 'Procent']}
                />
                <Bar dataKey="antal" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mæglerkæde performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={agencyPerformanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {agencyPerformanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Response Time Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Responstid udvikling</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="måned" />
              <YAxis label={{ value: 'Dage', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                formatter={(value, name) => [`${value} dage`, name === 'gennemsnit' ? 'Gennemsnit' : 'Målsætning']}
              />
              <Line type="monotone" dataKey="gennemsnit" stroke="#3b82f6" strokeWidth={3} name="gennemsnit" />
              <Line type="monotone" dataKey="målsætning" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="målsætning" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Summary with Danish formatting */}
      <Card>
        <CardHeader>
          <CardTitle>Performance sammenfatning</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800">Bedste måned</h4>
              <p className="text-2xl font-bold text-green-600">Maj 2024</p>
              <p className="text-sm text-green-700">42 nye sager, 90% success rate</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800">Gns. responstid</h4>
              <p className="text-2xl font-bold text-blue-600">1,8 dage</p>
              <p className="text-sm text-blue-700">Forbedring på 0,4 dage</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-800">Gns. salær</h4>
              <p className="text-2xl font-bold text-purple-600">{formatDanishCurrency(64500)}</p>
              <p className="text-sm text-purple-700">+10% vs. sidste år</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h4 className="font-medium text-orange-800">Top mæglerkæde</h4>
              <p className="text-2xl font-bold text-orange-600">EDC</p>
              <p className="text-sm text-orange-700">28% markedsandel</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStatistics;
