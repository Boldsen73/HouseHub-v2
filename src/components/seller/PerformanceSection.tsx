
import React from 'react';
import { Target, DollarSign, Clock, TrendingDown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface PerformanceSectionProps {
  performanceData: {
    avgCommission: number;
    avgTimeOnMarket: number;
    avgPriceReduction: number;
  };
}

const PerformanceSection: React.FC<PerformanceSectionProps> = ({ performanceData }) => {
  return (
    <>
      <Separator />
      <div>
        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <Target className="h-4 w-4" />
          Mæglerens resultater
        </h4>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <DollarSign className="h-4 w-4 text-blue-600" />
                <span className="text-lg font-bold text-blue-600">{performanceData.avgCommission}%</span>
              </div>
              <div className="text-xs text-gray-600">Gennemsnitligt salær</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <Clock className="h-4 w-4 text-green-600" />
                <span className="text-lg font-bold text-green-600">{performanceData.avgTimeOnMarket} dage</span>
              </div>
              <div className="text-xs text-gray-600">Gennemsnitlig liggetid</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingDown className="h-4 w-4 text-orange-600" />
                <span className="text-lg font-bold text-orange-600">{performanceData.avgPriceReduction}%</span>
              </div>
              <div className="text-xs text-gray-600">Typisk prisafslag</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PerformanceSection;
