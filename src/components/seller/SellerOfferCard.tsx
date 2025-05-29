
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  DollarSign, 
  Clock, 
  Calendar, 
  MessageSquare,
  Award,
  TrendingUp,
  MapPin,
  Briefcase,
  Star
} from 'lucide-react';
import HouseHubScore from './HouseHubScore';
import type { OfferWithMarketing } from '@/types/case';

interface SellerOfferCardProps {
  offer: OfferWithMarketing;
  isSelected: boolean;
  onSelect: (offer: OfferWithMarketing) => void;
  onAskQuestion?: (offerId: number) => void;
}

const SellerOfferCard: React.FC<SellerOfferCardProps> = ({
  offer,
  isSelected,
  onSelect,
  onAskQuestion
}) => {
  const [showFullStrategy, setShowFullStrategy] = useState(false);
  
  const commissionPercentage = ((offer.commissionValue / offer.priceValue) * 100).toFixed(2);
  
  // Anonymize agent names
  const anonymizedAgencyName = `Mægler ${offer.id}`;
  const anonymizedAgentName = `Mægler ${offer.id}`;

  // Mock data for HouseHub Score breakdown
  const scoreBreakdown = {
    commission: Math.round(offer.score * 0.25),
    timeline: Math.round(offer.score * 0.23),
    performance: Math.round(offer.score * 0.27),
    experience: Math.round(offer.score * 0.25)
  };

  const strategyText = offer.salesStrategy || "Mægleren tilbyder professionel rådgivning og markedsføring af din bolig gennem flere kanaler for at sikre det bedste salgsresultat.";
  const shouldTruncateStrategy = strategyText.length > 120;
  const displayStrategy = showFullStrategy || !shouldTruncateStrategy 
    ? strategyText 
    : strategyText.substring(0, 120) + "...";

  let cardClasses = "transition-all duration-300 ease-in-out border-2 hover:shadow-2xl hover:scale-105 hover:-translate-y-1";
  if (isSelected) {
    cardClasses += " ring-2 ring-blue-500 shadow-lg border-blue-300 bg-blue-50";
  } else {
    cardClasses += " border-gray-200 hover:border-gray-300";
  }

  return (
    <Card className={cardClasses}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-grow">
            <div className="flex items-center gap-4 mb-3">
              <HouseHubScore 
                score={offer.score} 
                breakdown={scoreBreakdown}
                size="lg"
                showBreakdown
              />
              
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                  {anonymizedAgencyName}
                </h3>
                <p className="text-base text-gray-600 font-medium">
                  v. {anonymizedAgentName}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Aarhus område</span>
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                <span>15 års erfaring</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                <span>4.8/5 rating</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 ml-4">
            <Button
              onClick={() => onSelect(offer)}
              className={`whitespace-nowrap transition-all duration-300 ease-in-out hover:scale-105 ${isSelected ? 'bg-green-600 hover:bg-green-700' : ''}`}
            >
              {isSelected ? 'Valgt' : 'Vælg denne mægler'}
            </Button>
            {onAskQuestion && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onAskQuestion(offer.id)}
                className="whitespace-nowrap transition-all duration-300 ease-in-out hover:scale-105"
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                Stil spørgsmål
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-center p-3 bg-white rounded-lg border">
            <DollarSign className="h-5 w-5 text-green-600 mx-auto mb-1" />
            <div className="text-xs text-gray-600">Forventet pris</div>
            <div className="font-bold text-green-700 text-sm">{offer.expectedPrice}</div>
          </div>
          
          <div className="text-center p-3 bg-white rounded-lg border">
            <DollarSign className="h-5 w-5 text-blue-600 mx-auto mb-1" />
            <div className="text-xs text-gray-600">Salær</div>
            <div className="font-bold text-sm">{offer.commission}</div>
            <div className="text-xs text-gray-500">({commissionPercentage}%)</div>
          </div>
          
          <div className="text-center p-3 bg-white rounded-lg border">
            <Calendar className="h-5 w-5 text-purple-600 mx-auto mb-1" />
            <div className="text-xs text-gray-600">Bindingsperiode</div>
            <div className="font-bold text-sm">{offer.bindingPeriod}</div>
          </div>
          
          <div className="text-center p-3 bg-white rounded-lg border">
            <Clock className="h-5 w-5 text-orange-600 mx-auto mb-1" />
            <div className="text-xs text-gray-600">Forventet liggetid</div>
            <div className="font-bold text-sm">45 dage</div>
          </div>
        </div>

        <Separator />

        {/* Sales Strategy */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Salgsstrategi
          </h4>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-700 leading-relaxed">{displayStrategy}</p>
            {shouldTruncateStrategy && (
              <Button 
                variant="link" 
                size="sm" 
                onClick={() => setShowFullStrategy(!showFullStrategy)}
                className="mt-2 p-0 h-auto text-blue-600"
              >
                {showFullStrategy ? 'Vis mindre' : 'Læs mere'}
              </Button>
            )}
          </div>
        </div>

        {/* Marketing Methods */}
        {offer.marketingMethods && offer.marketingMethods.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Award className="h-4 w-4" />
              Markedsføring ({offer.marketingMethods.filter(m => m.included).length} metoder)
            </h4>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex flex-wrap gap-2">
                {offer.marketingMethods.map((method, index) => (
                  <Badge 
                    key={index} 
                    variant={method.included ? "default" : "outline"}
                    className={`text-xs ${
                      method.included 
                        ? "bg-blue-100 text-blue-800 border-blue-200" 
                        : "text-gray-500 border-gray-300"
                    }`}
                  >
                    {method.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Performance Indicators */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Star className="h-4 w-4" />
            Performance Rekord
          </h4>
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="text-lg font-bold text-green-600">94%</div>
              <div className="text-gray-600">Succesrate</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">42</div>
              <div className="text-gray-600">Gns. dage</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">99%</div>
              <div className="text-gray-600">Af udbudspris</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SellerOfferCard;
