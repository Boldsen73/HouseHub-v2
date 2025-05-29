
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Clock, TrendingUp, Target } from 'lucide-react';

interface AgentPerformanceOverviewProps {
  performanceStats: {
    averageDiscount: number;
    averageResponseTime: number;
    successRate: number;
  };
  averageTimeOnMarket: number;
}

const AgentPerformanceOverview: React.FC<AgentPerformanceOverviewProps> = ({ 
  performanceStats, 
  averageTimeOnMarket 
}) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-blue-600" />
          Mægler Performance Oversigt
        </CardTitle>
        <p className="text-sm text-gray-600">
          Gennemsnitlige tal for mæglere i dit område baseret på HouseHub data
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{averageTimeOnMarket}</div>
            <div className="text-sm text-gray-600 font-medium">dage på markedet</div>
            <div className="text-xs text-gray-500 mt-1">gennemsnit</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{performanceStats.averageDiscount}%</div>
            <div className="text-sm text-gray-600 font-medium">under udbudspris</div>
            <div className="text-xs text-gray-500 mt-1">gennemsnitlig rabat</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{performanceStats.averageResponseTime}</div>
            <div className="text-sm text-gray-600 font-medium">timer responstid</div>
            <div className="text-xs text-gray-500 mt-1">til første svar</div>
          </div>
          
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <Target className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">{performanceStats.successRate}%</div>
            <div className="text-sm text-gray-600 font-medium">succesrate</div>
            <div className="text-xs text-gray-500 mt-1">solgte boliger</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentPerformanceOverview;
