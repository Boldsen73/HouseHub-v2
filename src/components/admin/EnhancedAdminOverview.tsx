
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Home, 
  TrendingUp, 
  Clock,
  Calendar,
  Eye,
  Plus
} from 'lucide-react';

const EnhancedAdminOverview = () => {
  // Mock data for the enhanced overview
  const overviewData = {
    totalCases: 156,
    totalAgents: 47,
    averageBids: 3.2,
    activeCases: 23,
    weeklyNewCases: 5,
    lastCaseCreated: '2 timer siden',
    lastAgentLogin: 'Maria Hansen - 15 min siden',
    weeklyHighlights: [
      { label: 'Nye sager', value: 5, change: '+2 vs. sidste uge' },
      { label: 'Nye tilbud', value: 18, change: '+6 vs. sidste uge' },
      { label: 'Afsluttede sager', value: 3, change: '2 gevinster' }
    ]
  };

  const recentActivity = [
    {
      id: 1,
      type: 'case_created',
      description: 'Ny sag oprettet - Østerbrogade 123',
      time: '2 timer siden',
      status: 'new'
    },
    {
      id: 2,
      type: 'offer_submitted',
      description: 'Nyt tilbud fra Lars Andersen (EDC)',
      time: '4 timer siden',
      status: 'active'
    },
    {
      id: 3,
      type: 'case_won',
      description: 'Sag vundet af Maria Hansen',
      time: '1 dag siden',
      status: 'completed'
    },
    {
      id: 4,
      type: 'agent_registered',
      description: 'Ny mægler tilmeldt - Thomas Nielsen',
      time: '2 dage siden',
      status: 'new'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'case_created': return <Home className="h-4 w-4" />;
      case 'offer_submitted': return <TrendingUp className="h-4 w-4" />;
      case 'case_won': return <Users className="h-4 w-4" />;
      case 'agent_registered': return <Plus className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new': return <Badge className="bg-green-100 text-green-800">Ny</Badge>;
      case 'active': return <Badge className="bg-blue-100 text-blue-800">Aktiv</Badge>;
      case 'completed': return <Badge className="bg-gray-100 text-gray-800">Afsluttet</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Home className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total sager</p>
                <p className="text-2xl font-bold">{overviewData.totalCases}</p>
                <p className="text-xs text-gray-500">{overviewData.activeCases} aktive</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Mæglere</p>
                <p className="text-2xl font-bold">{overviewData.totalAgents}</p>
                <p className="text-xs text-gray-500">Aktive på platformen</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Gns. tilbud</p>
                <p className="text-2xl font-bold">{overviewData.averageBids}</p>
                <p className="text-xs text-gray-500">Per sag</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Sidste aktivitet</p>
                <p className="text-lg font-bold">2 timer</p>
                <p className="text-xs text-gray-500">siden</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Highlights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Ugentlige highlights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {overviewData.weeklyHighlights.map((highlight, index) => (
              <div key={index} className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{highlight.value}</div>
                <div className="text-sm font-medium text-gray-700">{highlight.label}</div>
                <div className="text-xs text-green-600 mt-1">{highlight.change}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Seneste aktivitet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.description}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(activity.status)}
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Hurtige handlinger</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-16 flex flex-col items-center justify-center gap-2">
              <Plus className="h-5 w-5" />
              Opret test-sag
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-2">
              <Users className="h-5 w-5" />
              Se alle mæglere
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Eksporter data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedAdminOverview;
