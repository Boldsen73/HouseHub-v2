
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Clock, DollarSign, Target, Award } from 'lucide-react';

interface PerformanceData {
  casesReceived: number;
  bidsSubmitted: number;
  casesWon: number;
  averageCommission: string;
  averageListingTime: string;
  winRate: number;
}

interface PerformanceDashboardProps {
  data: PerformanceData;
}

const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({ data }) => {
  const stats = [
    {
      title: "Sager modtaget",
      value: data.casesReceived,
      icon: <BarChart3 className="h-5 w-5 text-blue-600" />,
      bgColor: "bg-blue-50"
    },
    {
      title: "Bud afgivet",
      value: data.bidsSubmitted,
      icon: <Target className="h-5 w-5 text-green-600" />,
      bgColor: "bg-green-50"
    },
    {
      title: "Sager vundet",
      value: data.casesWon,
      icon: <Award className="h-5 w-5 text-purple-600" />,
      bgColor: "bg-purple-50"
    },
    {
      title: "Gennemsnitligt salær",
      value: data.averageCommission,
      icon: <DollarSign className="h-5 w-5 text-orange-600" />,
      bgColor: "bg-orange-50"
    },
    {
      title: "Gennemsnitlig liggetid",
      value: data.averageListingTime,
      icon: <Clock className="h-5 w-5 text-red-600" />,
      bgColor: "bg-red-50"
    },
    {
      title: "Vinderprocent",
      value: `${data.winRate}%`,
      icon: <TrendingUp className="h-5 w-5 text-indigo-600" />,
      bgColor: "bg-indigo-50"
    }
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Min præstation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.bgColor} p-4 rounded-lg border`}>
              <div className="flex items-center gap-2 mb-2">
                {stat.icon}
                <span className="text-sm font-medium text-gray-600">{stat.title}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceDashboard;
