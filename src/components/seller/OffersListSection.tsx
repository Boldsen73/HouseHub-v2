
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import EnhancedSellerOfferCard from './EnhancedSellerOfferCard';

interface OffersListSectionProps {
  hasWithdrawnCase: boolean;
  caseWithdrawn: boolean;
  offers: any[];
  onSelectOffer: (offer: any) => void;
}

const OffersListSection: React.FC<OffersListSectionProps> = ({
  hasWithdrawnCase,
  caseWithdrawn,
  offers,
  onSelectOffer
}) => {
  if (hasWithdrawnCase || caseWithdrawn || offers.length === 0) {
    return null;
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Tilbud modtaget
          </div>
          <Badge className="bg-green-100 text-green-800">
            {offers.length} tilbud
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Main CTA */}
        <div className="text-center mb-8">
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
            Gennemgå dine tilbud
          </Button>
        </div>

        {/* Offers List */}
        <div className="space-y-6">
          {offers.map((offer) => (
            <EnhancedSellerOfferCard
              key={offer.id}
              offer={offer}
              isSelected={false}
              onSelect={onSelectOffer}
              onAskQuestion={(offerId) => console.log('Ask question to:', offerId)}
              hideRealtorName={true}
              showTimestamp={true}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OffersListSection;
