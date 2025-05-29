
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import EnhancedOfferCard from './EnhancedOfferCard';
import SellerInputsCard from './SellerInputsCard';
import QuestionDialog from './QuestionDialog';
import EnhancedOfferFilters from './EnhancedOfferFilters';
import OfferComparison from './OfferComparison';
import type { OfferWithMarketing, SellerQuestion } from '@/types/case';
import { useEnhancedOfferFilters } from '@/hooks/useEnhancedOfferFilters';
import { FileText, TrendingUp, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OffersSectionProps {
  offers: OfferWithMarketing[];
  status: string;
  selectedBrokerName: string | null;
  onSelectBroker: (offer: OfferWithMarketing) => void;
  sellerExpectedPrice: string;
  sellerExpectedTimeframe?: string;
  sellerPriorities?: string[];
}

const OffersSectionEnhanced: React.FC<OffersSectionProps> = ({ 
  offers, 
  status, 
  selectedBrokerName, 
  onSelectBroker,
  sellerExpectedPrice,
  sellerExpectedTimeframe,
  sellerPriorities
}) => {
  const { toast } = useToast();
  const [questionDialogOpen, setQuestionDialogOpen] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);
  const [questions, setQuestions] = useState<Record<number, SellerQuestion[]>>({});
  const [showComparison, setShowComparison] = useState(false);

  const {
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    filters,
    setFilters,
    filteredAndSortedOffers
  } = useEnhancedOfferFilters(offers);

  if (!((status === 'offers_received' || status === 'broker_selected') && offers.length > 0)) {
    return null;
  }

  const isBrokerSelectionFinalized = status === 'broker_selected';

  const handleAskQuestion = (offerId: number) => {
    setSelectedOfferId(offerId);
    setQuestionDialogOpen(true);
  };

  const handleSubmitQuestion = (question: string) => {
    if (selectedOfferId) {
      const newQuestion: SellerQuestion = {
        id: Date.now(),
        question,
        askedAt: new Date().toISOString(),
      };
      
      setQuestions(prev => ({
        ...prev,
        [selectedOfferId]: [...(prev[selectedOfferId] || []), newQuestion]
      }));

      toast({
        title: "Spørgsmål sendt",
        description: "Dit spørgsmål er sendt til mægleren. Du får besked når der kommer et svar.",
      });
    }
  };

  const handleSelectBroker = (offer: OfferWithMarketing) => {
    onSelectBroker(offer);
    toast({
      title: "Mægler valgt",
      description: `Du har valgt ${offer.agentName}. Bekræft dit valg i dialogen.`,
    });
  };

  const handleSendMessage = (message: string, realtorId: number) => {
    // Handle sending message to realtor
    toast({
      title: "Besked sendt",
      description: "Din besked er sendt til mægleren.",
    });
  };

  const selectedOfferAgent = selectedOfferId ? offers.find(o => o.id === selectedOfferId)?.agentName || '' : '';

  // Calculate statistics
  const avgScore = offers.reduce((sum, offer) => sum + offer.score, 0) / offers.length;
  const highestPrice = Math.max(...offers.map(offer => offer.priceValue));
  const lowestCommission = Math.min(...offers.map(offer => offer.commissionValue));

  return (
    <>
      {/* Seller's Original Inputs */}
      <SellerInputsCard 
        expectedPrice={sellerExpectedPrice}
        expectedTimeframe={sellerExpectedTimeframe}
        priorities={sellerPriorities}
      />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Hurtig Oversigt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{avgScore.toFixed(0)}</div>
              <div className="text-sm text-gray-600">Gennemsnitlig score</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK', minimumFractionDigits: 0 }).format(highestPrice)}
              </div>
              <div className="text-sm text-gray-600">Højeste pris</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK', minimumFractionDigits: 0 }).format(lowestCommission)}
              </div>
              <div className="text-sm text-gray-600">Laveste salær</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison and Filters Toggle */}
      {!isBrokerSelectionFinalized && offers.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => setShowComparison(!showComparison)}
          >
            <Users className="mr-2 h-4 w-4" />
            {showComparison ? 'Skjul sammenligning' : 'Sammenlign tilbud'}
          </Button>
        </div>
      )}

      {/* Comparison Component */}
      {showComparison && !isBrokerSelectionFinalized && (
        <OfferComparison
          offers={offers}
          onSelectBroker={handleSelectBroker}
          isSelectionFinalized={isBrokerSelectionFinalized}
        />
      )}

      {/* Enhanced Filters */}
      {!isBrokerSelectionFinalized && (
        <EnhancedOfferFilters
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          filters={filters}
          setFilters={setFilters}
          offers={offers}
          totalCount={offers.length}
          filteredCount={filteredAndSortedOffers.length}
        />
      )}

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6" />
              {status === 'broker_selected' ? "Oversigt over Tilbud" : "Modtagne Tilbud"}
            </div>
            {filteredAndSortedOffers.length !== offers.length && (
              <Badge variant="secondary">
                Viser {filteredAndSortedOffers.length} af {offers.length} tilbud
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            {status === 'broker_selected'
              ? "Herunder kan du se det valgte tilbud samt de øvrige modtagne tilbud."
              : "Herunder kan du se de tilbud, du har modtaget fra ejendomsmæglere. Sammenlign og vælg den mægler, der passer bedst til dig."
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {filteredAndSortedOffers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Ingen tilbud matcher dine filtreringsindstillinger.</p>
              <Button 
                variant="outline" 
                className="mt-2"
                onClick={() => setFilters({})}
              >
                Ryd filtre
              </Button>
            </div>
          ) : (
            filteredAndSortedOffers.map((offer) => (
              <EnhancedOfferCard
                key={offer.id}
                offer={offer}
                isSelected={isBrokerSelectionFinalized && selectedBrokerName === offer.agentName}
                onSelect={handleSelectBroker}
                onSendMessage={handleSendMessage}
                hasNewMessage={false}
              />
            ))
          )}
          
          {status === 'offers_received' && filteredAndSortedOffers.length > 0 && (
            <p className="text-sm text-gray-500 pt-4 border-t">
              Du kan stille spørgsmål til mæglerne før du vælger. Klik "Vælg Mægler" for at starte processen med at godkende en mægler.
            </p>
          )}
        </CardContent>
      </Card>

      <QuestionDialog
        open={questionDialogOpen}
        onOpenChange={setQuestionDialogOpen}
        agentName={selectedOfferAgent}
        existingQuestions={selectedOfferId ? questions[selectedOfferId] : []}
        onSubmitQuestion={handleSubmitQuestion}
      />
    </>
  );
};

export default OffersSectionEnhanced;
