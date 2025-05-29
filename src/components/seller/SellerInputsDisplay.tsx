
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, TrendingUp, Calendar, MapPin } from 'lucide-react';

interface SellerInputsDisplayProps {
  propertyData: {
    address: string;
    propertyType: string;
    size: number;
    rooms: number;
    expectedPrice: number;
    desiredSaleDate?: string;
    specialRequests?: string;
  };
}

const SellerInputsDisplay: React.FC<SellerInputsDisplayProps> = ({ propertyData }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="h-5 w-5" />
          Dine originale oplysninger
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Adresse</p>
              <p className="font-medium">{propertyData.address}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-600">Boligtype</p>
            <Badge variant="secondary">{propertyData.propertyType}</Badge>
          </div>
          
          <div>
            <p className="text-sm text-gray-600">Størrelse</p>
            <p className="font-medium">{propertyData.size} m²</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-600">Antal værelser</p>
            <p className="font-medium">{propertyData.rooms}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Forventet pris</p>
              <p className="font-medium text-green-600">
                {propertyData.expectedPrice.toLocaleString('da-DK')} kr.
              </p>
            </div>
          </div>
          
          {propertyData.desiredSaleDate && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Ønsket salgsdato</p>
                <p className="font-medium">{propertyData.desiredSaleDate}</p>
              </div>
            </div>
          )}
          
          {propertyData.specialRequests && (
            <div className="md:col-span-2 lg:col-span-3">
              <p className="text-sm text-gray-600">Særlige ønsker</p>
              <p className="font-medium">{propertyData.specialRequests}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SellerInputsDisplay;
