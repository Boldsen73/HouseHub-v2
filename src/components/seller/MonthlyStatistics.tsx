
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

interface MonthlyStatisticsProps {
  timeframe: 'month' | 'quarter' | 'year';
  setTimeframe: (timeframe: 'month' | 'quarter' | 'year') => void;
  monthlyStats: {
    offers: number;
    rejections: number;
    wins: number;
    views: number;
    newInquiries: number;
  };
}

const MonthlyStatistics: React.FC<MonthlyStatisticsProps> = ({ 
  timeframe, 
  setTimeframe, 
  monthlyStats 
}) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Månedlige Statistikker
          </CardTitle>
          <div className="flex gap-2">
            {(['month', 'quarter', 'year'] as const).map((period) => (
              <Button
                key={period}
                variant={timeframe === period ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeframe(period)}
              >
                {period === 'month' ? 'Måned' : period === 'quarter' ? 'Kvartal' : 'År'}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{monthlyStats.offers}</div>
            <p className="text-sm text-gray-600">Nye tilbud</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{monthlyStats.rejections}</div>
            <p className="text-sm text-gray-600">Afvisninger</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{monthlyStats.wins}</div>
            <p className="text-sm text-gray-600">Accepterede</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{monthlyStats.views}</div>
            <p className="text-sm text-gray-600">Visninger</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{monthlyStats.newInquiries}</div>
            <p className="text-sm text-gray-600">Forespørgsler</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyStatistics;
