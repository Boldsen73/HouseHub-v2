
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Clock, Target } from 'lucide-react';

interface SellerInputsCardProps {
  expectedPrice: string;
  expectedTimeframe?: string;
  priorities?: string[];
}

const SellerInputsCard: React.FC<SellerInputsCardProps> = ({ 
  expectedPrice, 
  expectedTimeframe, 
  priorities 
}) => {
  return (
    <Card className="mb-6 bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center text-blue-800">
          <User className="mr-2 h-5 w-5" />
          Dine originale ønsker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center mb-2">
              <Target className="mr-2 h-4 w-4 text-blue-600" />
              <span className="font-medium text-gray-700">Forventet pris:</span>
            </div>
            <p className="text-xl font-bold text-blue-700">{expectedPrice}</p>
          </div>
          
          {expectedTimeframe && (
            <div>
              <div className="flex items-center mb-2">
                <Clock className="mr-2 h-4 w-4 text-blue-600" />
                <span className="font-medium text-gray-700">Ønsket salgstid:</span>
              </div>
              <p className="text-gray-800">{expectedTimeframe}</p>
            </div>
          )}
        </div>
        
        {priorities && priorities.length > 0 && (
          <div>
            <span className="font-medium text-gray-700 block mb-2">Dine prioriteter:</span>
            <div className="flex flex-wrap gap-2">
              {priorities.map((priority, index) => (
                <Badge key={index} variant="outline" className="bg-white text-blue-700 border-blue-300">
                  {priority}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SellerInputsCard;
