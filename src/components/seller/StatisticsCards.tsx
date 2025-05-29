
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Home, TrendingUp, BarChart3, Target, Users } from 'lucide-react';

interface StatisticsCardsProps {
  dashboardData: {
    activeCases: number;
    totalOffers: number;
    averageOfferPrice: number;
    expectedPrice: number;
    agentsResponded: number;
    agentsInvited: number;
  };
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({ dashboardData }) => {
  const offerPricePercentage = (dashboardData.averageOfferPrice / dashboardData.expectedPrice) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <Home className="h-4 w-4" />
            Aktive Sager
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{dashboardData.activeCases}</div>
          <Badge variant="secondary" className="mt-2">
            <TrendingUp className="h-3 w-3 mr-1" />
            Aktiv
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Modtagne Tilbud
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{dashboardData.totalOffers}</div>
          <p className="text-sm text-gray-600 mt-1">
            Fra {dashboardData.agentsResponded} mæglere
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <Target className="h-4 w-4" />
            Gennemsnits Tilbudspris
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {dashboardData.averageOfferPrice.toLocaleString('da-DK')} kr.
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">vs. forventet pris</span>
              <span className={`font-medium ${offerPricePercentage >= 95 ? 'text-green-600' : offerPricePercentage >= 90 ? 'text-yellow-600' : 'text-red-600'}`}>
                {offerPricePercentage.toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={offerPricePercentage} 
              className="mt-1" 
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Mægler Response
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {dashboardData.agentsResponded}/{dashboardData.agentsInvited}
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Response rate</span>
              <span className="font-medium text-green-600">
                {Math.round((dashboardData.agentsResponded / dashboardData.agentsInvited) * 100)}%
              </span>
            </div>
            <Progress 
              value={(dashboardData.agentsResponded / dashboardData.agentsInvited) * 100} 
              className="mt-1" 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsCards;
