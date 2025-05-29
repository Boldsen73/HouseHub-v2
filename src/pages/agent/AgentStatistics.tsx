
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Award, DollarSign, Target, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminReturnBanner from '@/components/admin/AdminReturnBanner';

const AgentStatistics = () => {
  // Check if user is in admin session
  const isAdminSession = localStorage.getItem('admin_session_backup');

  // Mock data for agent statistics
  const monthlyPerformance = [
    { måned: 'Jan', vundneBud: 2, salær: 125000 },
    { måned: 'Feb', vundneBud: 3, salær: 185000 },
    { måned: 'Mar', vundneBud: 1, salær: 65000 },
    { måned: 'Apr', vundneBud: 4, salær: 240000 },
    { måned: 'Maj', vundneBud: 2, salær: 130000 },
    { måned: 'Jun', vundneBud: 3, salær: 195000 }
  ];

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
              <h1 className="text-3xl font-bold text-gray-900">Mit overblik</h1>
              <p className="text-gray-600">Overblik over din performance og indtjening</p>
            </div>
          </div>
          <Badge className="bg-blue-100 text-blue-800">
            Mægler: Lars Nielsen
          </Badge>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vundne sager</CardTitle>
              <Award className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">15</div>
              <p className="text-xs text-gray-600">I de sidste 6 måneder</p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total indtjening</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">940.000 kr</div>
              <p className="text-xs text-gray-600">I de sidste 6 måneder</p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Succesrate</CardTitle>
              <Target className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">68%</div>
              <p className="text-xs text-gray-600">Af afgivne tilbud</p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gns. salær</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">62.667 kr</div>
              <p className="text-xs text-gray-600">Per vundet sag</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="transition-all duration-300 ease-in-out hover:shadow-xl">
            <CardHeader>
              <CardTitle>Månedlig performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="måned" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'salær' ? `${value.toLocaleString('da-DK')} kr` : value,
                      name === 'vundneBud' ? 'Vundne bud' : 'Salær'
                    ]}
                  />
                  <Bar dataKey="vundneBud" fill="#3b82f6" name="vundneBud" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 ease-in-out hover:shadow-xl">
            <CardHeader>
              <CardTitle>Indtjening over tid</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="måned" />
                  <YAxis tickFormatter={(value) => `${(value / 1000)}k`} />
                  <Tooltip 
                    formatter={(value) => [`${value.toLocaleString('da-DK')} kr`, 'Salær']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="salær" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="salær"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Performance Summary */}
        <Card className="transition-all duration-300 ease-in-out hover:shadow-xl">
          <CardHeader>
            <CardTitle>Performance sammenfatning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md">
                <h4 className="font-medium text-green-800">Bedste måned</h4>
                <p className="text-2xl font-bold text-green-600">April 2024</p>
                <p className="text-sm text-green-700">4 vundne sager, 240.000 kr</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md">
                <h4 className="font-medium text-blue-800">Ranking</h4>
                <p className="text-2xl font-bold text-blue-600">3. plads</p>
                <p className="text-sm text-blue-700">Af alle EDC mæglere</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md">
                <h4 className="font-medium text-purple-800">Gennemsnitlig responstid</h4>
                <p className="text-2xl font-bold text-purple-600">1,2 dage</p>
                <p className="text-sm text-purple-700">Fra sag til tilbud</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentStatistics;
