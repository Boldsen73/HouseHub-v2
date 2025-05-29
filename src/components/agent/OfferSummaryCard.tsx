
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Download, DollarSign, Clock, TrendingUp, Users } from 'lucide-react';

interface OfferSummaryCardProps {
  expectedPrice: string;
  commission: string;
  listingTime: string;
  marketingStrategy: string;
  status: 'submitted' | 'won' | 'lost';
  onEditOffer?: () => void;
  onDownloadPDF?: () => void;
}

const OfferSummaryCard: React.FC<OfferSummaryCardProps> = ({
  expectedPrice,
  commission,
  listingTime,
  marketingStrategy,
  status,
  onEditOffer,
  onDownloadPDF
}) => {
  return (
    <Card className="border-blue-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Dit tilbud - Sammenfatning
          </CardTitle>
          {status === 'submitted' && (
            <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">
              Afsendt
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Forventet pris</p>
                <p className="font-medium text-green-600">{expectedPrice}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 text-blue-600 text-xs flex items-center justify-center">%</div>
              <div>
                <p className="text-sm text-gray-600">Salær</p>
                <p className="font-medium text-blue-600">{commission}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Forventet liggetid</p>
                <p className="font-medium text-purple-600">{listingTime}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Markedsføring</p>
                <p className="font-medium text-orange-600">{marketingStrategy}</p>
              </div>
            </div>
          </div>
        </div>

        {status === 'submitted' && (
          <div className="pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {onEditOffer && (
                <Button variant="outline" size="sm" onClick={onEditOffer}>
                  <Edit className="w-4 h-4 mr-2" />
                  Rediger bud
                </Button>
              )}
              {onDownloadPDF && (
                <Button variant="outline" size="sm" onClick={onDownloadPDF}>
                  <Download className="w-4 h-4 mr-2" />
                  Download som PDF
                </Button>
              )}
            </div>
          </div>
        )}

        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-800">
            Dit tilbud er sendt til sælgeren. Du vil få besked så snart sælgeren har taget stilling til tilbuddene.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OfferSummaryCard;
