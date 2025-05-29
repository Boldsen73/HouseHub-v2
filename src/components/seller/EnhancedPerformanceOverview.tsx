
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Award, Clock, TrendingUp, Target, Info } from 'lucide-react';

interface EnhancedPerformanceOverviewProps {
  performanceStats: {
    averageDiscount: number;
    averageResponseTime: number;
    successRate: number;
  };
  averageTimeOnMarket: number;
}

const EnhancedPerformanceOverview: React.FC<EnhancedPerformanceOverviewProps> = ({ 
  performanceStats, 
  averageTimeOnMarket 
}) => {
  const metrics = [
    {
      icon: Clock,
      value: averageTimeOnMarket,
      unit: 'dage',
      label: 'på markedet',
      sublabel: 'gennemsnit',
      color: 'blue',
      tooltip: 'Gennemsnitlig tid det tager at sælge en bolig i dit område'
    },
    {
      icon: TrendingUp,
      value: performanceStats.averageDiscount,
      unit: '%',
      label: 'under udbudspris',
      sublabel: 'gennemsnitlig rabat',
      color: 'green',
      tooltip: 'Hvor meget mindre end udbudsprisen boliger typisk sælges for'
    },
    {
      icon: Clock,
      value: performanceStats.averageResponseTime,
      unit: 'timer',
      label: 'responstid',
      sublabel: 'til første svar',
      color: 'purple',
      tooltip: 'Hvor hurtigt mæglere typisk svarer på henvendelser'
    },
    {
      icon: Target,
      value: performanceStats.successRate,
      unit: '%',
      label: 'succesrate',
      sublabel: 'solgte boliger',
      color: 'orange',
      tooltip: 'Andel af boliger der bliver solgt succesfuldt'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      purple: 'bg-purple-50 text-purple-600',
      orange: 'bg-orange-50 text-orange-600'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-50 text-gray-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Award className="h-5 w-5 text-blue-600" />
          Mægler Performance i Dit Område
        </CardTitle>
        <p className="text-sm text-gray-600">
          Gennemsnitlige tal baseret på HouseHub data
        </p>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className={`text-center p-4 rounded-lg ${getColorClasses(metric.color)}`}>
                <div className="flex items-center justify-center mb-2">
                  <metric.icon className="h-6 w-6" />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 ml-1 cursor-help opacity-60" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{metric.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="text-2xl font-bold">{metric.value}{metric.unit}</div>
                <div className="text-sm font-medium">{metric.label}</div>
                <div className="text-xs opacity-75 mt-1">{metric.sublabel}</div>
              </div>
            ))}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default EnhancedPerformanceOverview;
