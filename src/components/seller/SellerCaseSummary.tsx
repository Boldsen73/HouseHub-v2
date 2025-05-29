
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, MapPin, Calendar, DollarSign, Clock } from 'lucide-react';

interface SellerCaseSummaryProps {
  address: string;
  propertyType: string;
  area: string;
  buildYear: string;
  expectedPrice: string;
  showingTime: string;
  postalCode: string;
  groundArea?: string;
}

const SellerCaseSummary: React.FC<SellerCaseSummaryProps> = ({
  address,
  propertyType,
  area,
  buildYear,
  expectedPrice,
  showingTime,
  postalCode,
  groundArea
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="w-5 h-5" />
          Din sag - Sammenfatning
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">{address}</p>
                <p className="text-sm text-gray-600">{postalCode}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Home className="w-4 h-4 text-gray-500" />
              <Badge variant="outline">{propertyType}</Badge>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 text-gray-500 text-xs flex items-center justify-center">m²</div>
              <span className="text-sm">
                {area} m² boligareal
                {groundArea && `, ${groundArea} m² grund`}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm">Bygget i {buildYear}</span>
            </div>

            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="font-medium text-green-600">{expectedPrice}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm">Fremvisning: {showingTime}</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Indsendt til HouseHub og sendt til udvalgte mæglere i dit område
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SellerCaseSummary;
