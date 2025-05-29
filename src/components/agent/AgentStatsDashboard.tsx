
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, Award, DollarSign } from 'lucide-react';

interface AgentStatsDashboardProps {
  totalBids: number;
  wonCases: number;
  activeCases: number;
  averageCommission: number;
}

const AgentStatsDashboard: React.FC<AgentStatsDashboardProps> = ({
  totalBids,
  wonCases,
  activeCases,
  averageCommission
}) => {
  const winRate = totalBids > 0 ? ((wonCases / totalBids) * 100).toFixed(1) : '0';
  
  const stats = [
    {
      title: 'Afgivne bud',
      value: totalBids,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Vundne sager',
      value: wonCases,
      icon: Award,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Vinderprocent',
      value: `${winRate}%`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Gns. salær',
      value: `${averageCommission.toLocaleString('da-DK')} kr`,
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Dine statistikker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className={`${stat.bgColor} p-3 rounded-lg mb-2`}>
                  <Icon className={`w-6 h-6 ${stat.color} mx-auto`} />
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            );
          })}
        </div>
        
        {activeCases > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              Du har {activeCases} aktive sager at byde på
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AgentStatsDashboard;
