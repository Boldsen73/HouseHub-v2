
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PartyPopper, CheckCircle, DollarSign, Calendar, Award } from 'lucide-react';
import type { OfferWithMarketing } from '@/types/case';

interface BrokerSelectionSuccessProps {
  selectedOffer: OfferWithMarketing;
  onBackToDashboard: () => void;
}

const BrokerSelectionSuccess: React.FC<BrokerSelectionSuccessProps> = ({
  selectedOffer,
  onBackToDashboard
}) => {
  const commissionPercentage = ((selectedOffer.commissionValue / selectedOffer.priceValue) * 100).toFixed(1);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Success Header */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <PartyPopper className="h-16 w-16 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-800">
            Tillykke! Du har valgt en mægler
          </CardTitle>
          <p className="text-green-700 mt-2">
            Tak fordi du brugte HouseHub. Vi ønsker dig held og lykke med salget!
          </p>
        </CardHeader>
      </Card>

      {/* Selected Broker Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Din valgte mægler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedOffer.agencyName}</h3>
                <p className="text-gray-600">v. {selectedOffer.agentName}</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Valgt</Badge>
            </div>

            {/* Key Offer Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="font-bold text-lg text-green-700">
                  {new Intl.NumberFormat('da-DK').format(selectedOffer.priceValue)} kr
                </div>
                <div className="text-sm text-gray-600">Forventet pris</div>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Award className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="font-bold text-lg text-blue-700">
                  {commissionPercentage}%
                </div>
                <div className="text-sm text-gray-600">Salær</div>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <div className="font-bold text-lg text-purple-700">
                  {selectedOffer.bindingPeriod}
                </div>
                <div className="text-sm text-gray-600">Bindingsperiode</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>Næste skridt:</strong> Mægleren vil kontakte dig inden for 24 timer for at 
                igangsætte salgsprocessen. Du kan følge fremgangen på dit dashboard.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="text-center">
        <Button onClick={onBackToDashboard} size="lg" className="px-8">
          Tilbage til overblik
        </Button>
      </div>
    </div>
  );
};

export default BrokerSelectionSuccess;
