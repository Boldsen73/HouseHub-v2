
import React from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { OfferWithMarketing } from '@/types/case';

interface OfferCardProps {
  offer: OfferWithMarketing;
  isSelectedBroker: boolean;
  isBrokerSelectionFinalized: boolean;
  onSelectBroker: (offer: OfferWithMarketing) => void;
}

const getScoreStyling = (score: number): { bg: string; textCss: string } => {
  if (score >= 90) return { bg: 'bg-green-600', textCss: 'text-white' };
  if (score >= 85) return { bg: 'bg-yellow-500', textCss: 'text-white' };
  if (score >= 80) return { bg: 'bg-amber-500', textCss: 'text-white' };
  if (score >= 70) return { bg: 'bg-orange-500', textCss: 'text-white' };
  return { bg: 'bg-red-500', textCss: 'text-white' };
};

const OfferCard: React.FC<OfferCardProps> = ({ offer, isSelectedBroker, isBrokerSelectionFinalized, onSelectBroker }) => {
  let cardClasses = "shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-1";
  if (isSelectedBroker) {
    cardClasses += " border-2 border-green-500";
  } else if (isBrokerSelectionFinalized) {
    cardClasses += " opacity-70";
  }

  const scoreStyle = getScoreStyling(offer.score);
  const commissionPercentage = ((offer.commissionValue / offer.priceValue) * 100).toFixed(2);

  // Anonymize agent names
  const anonymizedAgencyName = `Mægler ${offer.id}`;
  const anonymizedAgentName = `Mægler ${offer.id}`;

  return (
    <Card className={cardClasses}>
      <div className="flex flex-col md:flex-row p-4 md:p-6 items-stretch md:items-center">
        {/* Score Box (Left) */}
        <div className={`flex flex-col items-center justify-center w-full md:w-28 h-28 md:h-auto rounded-lg p-3 mb-4 md:mb-0 md:mr-6 ${scoreStyle.bg} ${scoreStyle.textCss}`}>
          <span className="text-4xl font-bold">{offer.score}</span>
          <span className="text-sm">point</span>
        </div>

        {/* Broker Info and Action Button (Right part of flex) */}
        <div className="flex-grow flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Broker Details */}
          <div className="flex-grow mb-4 md:mb-0">
            <div className="mb-2">
              <CardTitle className="text-xl font-bold group-hover:text-blue-600 transition-colors duration-300">{anonymizedAgencyName}</CardTitle>
              <p className="text-base text-gray-600">v. {anonymizedAgentName}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-700">
              <p><strong>Forventet pris:</strong> {offer.expectedPrice}</p>
              <p><strong>Salær:</strong> {offer.commission} ({commissionPercentage}%)</p>
              <p><strong>Bindingsperiode:</strong> {offer.bindingPeriod}</p>
              <p><strong>Afgivet:</strong> {new Date(offer.submittedAt).toLocaleDateString('da-DK')}</p>
            </div>
            
            {/* Marketing Methods Preview */}
            {offer.marketingMethods && offer.marketingMethods.length > 0 && (
              <div className="mt-2">
                <span className="text-sm font-medium text-gray-600">Markedsføring: </span>
                <span className="text-sm text-gray-600">
                  {offer.marketingMethods.filter(m => m.included).length} metoder inkluderet
                </span>
              </div>
            )}
          </div>

          {/* Action Button/Badge (Far Right) */}
          <div className="ml-0 md:ml-4 flex-shrink-0 self-center md:self-auto">
            {isSelectedBroker ? (
              <div className={`text-sm font-semibold px-4 py-2 rounded-md ${scoreStyle.bg} ${scoreStyle.textCss}`}>
                Valgt
              </div>
            ) : (
              <Button
                size="default" 
                onClick={() => onSelectBroker(offer)}
                disabled={isBrokerSelectionFinalized}
                className="transition-all duration-300 ease-in-out hover:scale-105"
              >
                Vælg Mægler
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OfferCard;
