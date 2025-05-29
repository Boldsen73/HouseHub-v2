
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Download, DollarSign, Clock, TrendingUp, Users, CheckCircle } from 'lucide-react';

interface OfferSubmittedSummaryProps {
  caseId: number;
  expectedPrice: string;
  commission: string;
  listingTime: string;
  marketingStrategy: string;
  submittedAt: string;
  onEditOffer?: () => void;
  onDownloadPDF?: () => void;
}

const OfferSubmittedSummary: React.FC<OfferSubmittedSummaryProps> = ({
  caseId,
  expectedPrice,
  commission,
  listingTime,
  marketingStrategy,
  submittedAt,
  onEditOffer,
  onDownloadPDF
}) => {
  return (
    <Card className="border-green-200 bg-green-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Tilbud afgivet - Sammenfatning
          </CardTitle>
          <Badge className="bg-green-600 text-white">
            Afsendt
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Message */}
        <div className="p-4 bg-green-100 rounded-lg border border-green-200">
          <p className="text-sm text-green-800 font-medium">
            ✅ Dit tilbud er afgivet - afventer svar fra sælger
          </p>
          <p className="text-xs text-green-700 mt-1">
            Afsendt d. {new Date(submittedAt).toLocaleDateString('da-DK', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>

        {/* Offer Details */}
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

        {/* Action Buttons */}
        <div className="pt-4 border-t border-green-200">
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

        {/* Next Steps */}
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Næste skridt:</strong> Du vil få besked så snart sælgeren har taget stilling til alle tilbud. 
            Hold øje med meddelelser i dit dashboard.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OfferSubmittedSummary;
