
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, DollarSign, Calendar, Clock, Award, Star } from 'lucide-react';
import HouseHubScore from './HouseHubScore';
import type { OfferWithMarketing } from '@/types/case';

interface BrokerSelectionConfirmationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  offer: OfferWithMarketing | null;
  onConfirm: () => void;
}

const BrokerSelectionConfirmation: React.FC<BrokerSelectionConfirmationProps> = ({
  open,
  onOpenChange,
  offer,
  onConfirm
}) => {
  if (!offer) return null;

  const agencyName = offer.agencyName || "EDC Aarhus Syd";
  const agentName = offer.agentName;
  const commissionPercentage = ((offer.commissionValue / offer.priceValue) * 100).toFixed(2);

  const scoreBreakdown = {
    commission: Math.round(offer.score * 0.25),
    timeline: Math.round(offer.score * 0.23),
    performance: Math.round(offer.score * 0.27),
    experience: Math.round(offer.score * 0.25)
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <CheckCircle className="h-6 w-6 text-green-600" />
            Bekræft dit valg af mægler
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Broker Info */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <HouseHubScore 
                  score={offer.score} 
                  breakdown={scoreBreakdown}
                  size="lg"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {agencyName}
                  </h3>
                  <p className="text-lg text-gray-700">
                    v. {agentName}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-white rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600 mx-auto mb-1" />
                  <div className="text-sm text-gray-600">Forventet pris</div>
                  <div className="font-bold text-green-700">{offer.expectedPrice}</div>
                </div>
                
                <div className="text-center p-3 bg-white rounded-lg">
                  <DollarSign className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                  <div className="text-sm text-gray-600">Salær</div>
                  <div className="font-bold">{offer.commission}</div>
                  <div className="text-xs text-gray-500">({commissionPercentage}%)</div>
                </div>
                
                <div className="text-center p-3 bg-white rounded-lg">
                  <Calendar className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                  <div className="text-sm text-gray-600">Bindingsperiode</div>
                  <div className="font-bold">{offer.bindingPeriod}</div>
                </div>
                
                <div className="text-center p-3 bg-white rounded-lg">
                  <Clock className="h-5 w-5 text-orange-600 mx-auto mb-1" />
                  <div className="text-sm text-gray-600">Forventet liggetid</div>
                  <div className="font-bold">45 dage</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Marketing Methods */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Award className="h-5 w-5" />
              Valgte markedsføringskanaler
            </h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex flex-wrap gap-2">
                {offer.marketingMethods
                  .filter(m => m.included)
                  .map((method, index) => (
                    <Badge 
                      key={index} 
                      className="bg-blue-100 text-blue-800 border-blue-200"
                    >
                      {method.name}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>

          {/* Performance Summary */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Star className="h-5 w-5" />
                Hvorfor dette valg scorer højt
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Konkurrencedygtigt salær:</span>
                  <span className="text-gray-600 ml-2">Under markedsgennemsnit</span>
                </div>
                <div>
                  <span className="font-medium">Hurtig salgsproces:</span>
                  <span className="text-gray-600 ml-2">45 dage vs. 60 dage gns.</span>
                </div>
                <div>
                  <span className="font-medium">Stærk track record:</span>
                  <span className="text-gray-600 ml-2">94% succesrate</span>
                </div>
                <div>
                  <span className="font-medium">Områdeekspert:</span>
                  <span className="text-gray-600 ml-2">15+ års erfaring lokalt</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={onConfirm}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              size="lg"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Godkend og start samarbejde
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
              size="lg"
            >
              Gå tilbage
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
            <p>
              Ved at godkende starter du et bindende samarbejde med den valgte mægler. 
              Du vil blive kontaktet inden for 24 timer for at aftale det videre forløb.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BrokerSelectionConfirmation;
