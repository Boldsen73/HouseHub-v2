
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  DollarSign, 
  Calendar, 
  MessageSquare,
  Award,
  TrendingUp
} from 'lucide-react';
import HouseHubScore from './HouseHubScore';
import PerformanceSection from './PerformanceSection';
import MarketingMethodsSection from './MarketingMethodsSection';
import MessageThread from './MessageThread';
import type { OfferWithMarketing } from '@/types/case';

interface EnhancedSellerOfferCardProps {
  offer: OfferWithMarketing;
  isSelected: boolean;
  onSelect: (offer: OfferWithMarketing) => void;
  onAskQuestion?: (offerId: number) => void;
  hideRealtorName?: boolean;
  showTimestamp?: boolean;
}

const EnhancedSellerOfferCard: React.FC<EnhancedSellerOfferCardProps> = ({
  offer,
  isSelected,
  onSelect,
  onAskQuestion,
  hideRealtorName = true,
  showTimestamp = true
}) => {
  const [showFullStrategy, setShowFullStrategy] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(Math.random() > 0.7); // Mock new message
  
  const commissionPercentage = ((offer.commissionValue / offer.priceValue) * 100).toFixed(1);
  
  // Anonymize agent names
  const anonymizedAgencyName = `Mægler ${offer.id}`;
  const anonymizedAgentName = `Mægler ${offer.id}`;

  // Mock performance data - different for each offer
  const performanceData = {
    avgCommission: offer.id === 1 ? 1.4 : offer.id === 2 ? 1.6 : 1.2,
    avgTimeOnMarket: offer.id === 1 ? 38 : offer.id === 2 ? 42 : 35,
    avgPriceReduction: offer.id === 1 ? -4.1 : offer.id === 2 ? -5.2 : -3.8
  };

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

  let cardClasses = "transition-all duration-300 ease-in-out border-2 hover:shadow-2xl hover:scale-105 hover:-translate-y-1 mb-4";
  if (isSelected) {
    cardClasses += " ring-2 ring-blue-500 shadow-lg border-blue-300 bg-blue-50";
  } else {
    cardClasses += " border-gray-200 hover:border-gray-300";
  }

  const formatSubmittedDate = (dateString: string) => {
    const date = new Date(dateString);
    return `Modtaget d. ${date.getDate()}. ${date.toLocaleDateString('da-DK', { month: 'long' })} ${date.getFullYear()}`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('da-DK').format(price);
  };

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
                {showTimestamp && (
                  <p className="text-sm text-gray-500 mt-1">
                    {formatSubmittedDate(offer.submittedAt)}
                  </p>
                )}
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
                onClick={() => setShowMessages(!showMessages)}
                className="whitespace-nowrap relative transition-all duration-300 ease-in-out hover:scale-105"
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                Skriv besked til mægler
                {hasNewMessage && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 min-w-[1.25rem] h-5">
                    1
                  </Badge>
                )}
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
            <div className="font-bold text-green-700 text-sm">{formatPrice(offer.priceValue)} kr</div>
          </div>
          
          <div className="text-center p-3 bg-white rounded-lg border">
            <DollarSign className="h-5 w-5 text-blue-600 mx-auto mb-1" />
            <div className="text-xs text-gray-600">Salær</div>
            <div className="font-bold text-sm">{commissionPercentage}% / {formatPrice(offer.commissionValue)} kr</div>
          </div>
          
          <div className="text-center p-3 bg-white rounded-lg border">
            <Calendar className="h-5 w-5 text-purple-600 mx-auto mb-1" />
            <div className="text-xs text-gray-600">Bindingsperiode</div>
            <div className="font-bold text-sm">{offer.bindingPeriod}</div>
          </div>
          
          <div className="text-center p-3 bg-white rounded-lg border">
            <Award className="h-5 w-5 text-orange-600 mx-auto mb-1" />
            <div className="text-xs text-gray-600">Markedsføring</div>
            <div className="font-bold text-sm">{offer.marketingPackage}</div>
          </div>
        </div>

        <PerformanceSection performanceData={performanceData} />

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

        <MarketingMethodsSection marketingMethods={offer.marketingMethods} />

        <MessageThread
          agentName={anonymizedAgentName}
          hasNewMessage={hasNewMessage}
          showMessages={showMessages}
          onToggle={() => setShowMessages(!showMessages)}
        />
      </CardContent>
    </Card>
  );
};

export default EnhancedSellerOfferCard;
