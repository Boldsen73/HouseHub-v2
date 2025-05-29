
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, MapPin, Star, MessageCircle } from 'lucide-react';
import RealtorMessaging from './RealtorMessaging';
import type { OfferWithMarketing } from '@/types/case';

interface EnhancedOfferCardProps {
  offer: OfferWithMarketing;
  isSelected: boolean;
  onSelect: (offer: OfferWithMarketing) => void;
  onSendMessage: (message: string, realtorId: number) => void;
  hasNewMessage?: boolean;
}

const EnhancedOfferCard: React.FC<EnhancedOfferCardProps> = ({
  offer,
  isSelected,
  onSelect,
  onSendMessage,
  hasNewMessage = false
}) => {
  // Mock performance data
  const performanceData = {
    averageDiscount: '2,3%',
    typicalListingTime: '45 dage',
    localCommissionRange: '45.000 - 70.000 kr'
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('da-DK', { 
      style: 'currency', 
      currency: 'DKK', 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    }).format(value);
  };

  // Anonymize agent names
  const anonymizedAgencyName = `Mægler ${offer.id}`;
  const anonymizedAgentName = `Mægler ${offer.id}`;

  return (
    <Card className={`transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 hover:-translate-y-1 ${
      isSelected ? 'ring-2 ring-blue-500 border-blue-200' : 'hover:border-gray-300'
    }`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold group-hover:text-blue-600 transition-colors duration-300">
            {anonymizedAgencyName}
            <p className="text-sm font-normal text-gray-600 mt-1">
              v. {anonymizedAgentName}
            </p>
          </CardTitle>
          <div className="flex flex-col items-end gap-2">
            <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1">
              Score: {offer.score}/100
            </Badge>
            {hasNewMessage && (
              <Badge variant="destructive" className="text-xs animate-pulse">
                <MessageCircle className="w-3 h-3 mr-1" />
                Ny besked
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main offer details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{offer.expectedPrice}</p>
            <p className="text-sm text-gray-600">Forventet pris</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{offer.commission}</p>
            <p className="text-sm text-gray-600">Salær</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">{offer.bindingPeriod}</p>
            <p className="text-sm text-gray-600">Bindingsperiode</p>
          </div>
        </div>

        {/* Performance metrics */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Performance i lokalområdet
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gray-500" />
              <span>Gns. afslag: {performanceData.averageDiscount}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>Typisk liggetid: {performanceData.typicalListingTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>Lokalt salær: {performanceData.localCommissionRange}</span>
            </div>
          </div>
        </div>

        {/* Marketing strategy */}
        <div>
          <h4 className="font-semibold mb-2">Salgsstrategi</h4>
          <p className="text-gray-700 text-sm leading-relaxed">{offer.salesStrategy}</p>
        </div>

        {/* Marketing methods */}
        <div>
          <h4 className="font-semibold mb-2">Markedsføring</h4>
          <div className="flex flex-wrap gap-2">
            {offer.marketingMethods.map((method) => (
              <Badge
                key={method.id}
                variant={method.included ? "default" : "outline"}
                className={method.included ? "bg-green-100 text-green-800" : ""}
              >
                {method.name}
                {method.included && <Star className="w-3 h-3 ml-1" />}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action button */}
        <div className="pt-4 border-t">
          <Button
            onClick={() => onSelect(offer)}
            className={`w-full transition-all duration-300 ease-in-out hover:scale-105 ${
              isSelected 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
            size="lg"
          >
            {isSelected ? 'Valgt mægler ✓' : 'Vælg denne mægler'}
          </Button>
        </div>

        {/* Messaging component */}
        <RealtorMessaging
          realtorName={anonymizedAgentName}
          realtorId={offer.id}
          hasNewMessages={hasNewMessage}
          onSendMessage={onSendMessage}
        />
      </CardContent>
    </Card>
  );
};

export default EnhancedOfferCard;
