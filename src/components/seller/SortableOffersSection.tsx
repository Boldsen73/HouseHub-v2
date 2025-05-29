
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FileText, ArrowUpDown } from 'lucide-react';
import CompactOfferCard from './CompactOfferCard';
import type { OfferWithMarketing } from '@/types/case';

interface SortableOffersSectionProps {
  offers: OfferWithMarketing[];
  onSelectOffer: (offer: OfferWithMarketing) => void;
}

const SortableOffersSection: React.FC<SortableOffersSectionProps> = ({
  offers,
  onSelectOffer
}) => {
  const [sortBy, setSortBy] = useState<'score' | 'price' | 'commission'>('score');
  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);

  const sortedOffers = [...offers].sort((a, b) => {
    switch (sortBy) {
      case 'score':
        return b.score - a.score;
      case 'price':
        return b.priceValue - a.priceValue;
      case 'commission':
        return a.commissionValue - b.commissionValue;
      default:
        return 0;
    }
  });

  const handleSelectOffer = (offer: OfferWithMarketing) => {
    setSelectedOfferId(offer.id);
    onSelectOffer(offer);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Tilbud modtaget
            <Badge className="bg-green-100 text-green-800">
              {offers.length} tilbud
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-gray-500" />
            <Select value={sortBy} onValueChange={(value: 'score' | 'price' | 'commission') => setSortBy(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="score">HouseHub Score</SelectItem>
                <SelectItem value="price">Højeste pris</SelectItem>
                <SelectItem value="commission">Laveste salær</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedOffers.map((offer) => (
            <CompactOfferCard
              key={offer.id}
              offer={offer}
              isSelected={selectedOfferId === offer.id}
              onSelect={handleSelectOffer}
              onMessage={(offerId, message) => {
                // Handle message internally - CompactOfferCard manages its own messaging
                console.log('Message sent to offer', offerId, ':', message);
              }}
            />
          ))}
        </div>
        <div className="text-center mt-6">
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8">
            Gennemgå alle tilbud detaljeret
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SortableOffersSection;
