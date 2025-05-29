
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { GitCompare, X, CheckCircle } from 'lucide-react';
import type { OfferWithMarketing } from '@/types/case';

interface OfferComparisonProps {
  offers: OfferWithMarketing[];
  onSelectBroker: (offer: OfferWithMarketing) => void;
  isSelectionFinalized: boolean;
}

const getScoreStyling = (score: number): { bg: string; textCss: string } => {
  if (score >= 90) return { bg: 'bg-green-600', textCss: 'text-white' };
  if (score >= 85) return { bg: 'bg-yellow-500', textCss: 'text-white' };
  if (score >= 80) return { bg: 'bg-amber-500', textCss: 'text-white' };
  if (score >= 70) return { bg: 'bg-orange-500', textCss: 'text-white' };
  return { bg: 'bg-red-500', textCss: 'text-white' };
};

const OfferComparison: React.FC<OfferComparisonProps> = ({
  offers,
  onSelectBroker,
  isSelectionFinalized
}) => {
  const [selectedOffers, setSelectedOffers] = useState<number[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  const toggleOfferSelection = (offerId: number) => {
    setSelectedOffers(prev => {
      if (prev.includes(offerId)) {
        return prev.filter(id => id !== offerId);
      } else if (prev.length < 3) {
        return [...prev, offerId];
      }
      return prev;
    });
  };

  const selectedOfferData = offers.filter(offer => selectedOffers.includes(offer.id));

  const ComparisonRow: React.FC<{ label: string; getValue: (offer: OfferWithMarketing) => React.ReactNode }> = ({ label, getValue }) => (
    <tr className="border-b">
      <td className="py-3 px-2 font-medium text-gray-700 bg-gray-50">{label}</td>
      {selectedOfferData.map(offer => (
        <td key={offer.id} className="py-3 px-2 text-center">
          {getValue(offer)}
        </td>
      ))}
    </tr>
  );

  return (
    <>
      <Card className="mb-6 transition-all duration-300 ease-in-out hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCompare className="h-5 w-5" />
            Sammenlign Tilbud
            {selectedOffers.length > 0 && (
              <Badge variant="secondary">
                {selectedOffers.length} valgt
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Vælg op til 3 tilbud at sammenligne side om side. Klik på tilbuddene nedenfor for at vælge dem.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {offers.map(offer => {
                const isSelected = selectedOffers.includes(offer.id);
                const scoreStyle = getScoreStyling(offer.score);
                const anonymizedAgentName = `Mægler ${offer.id}`;
                
                return (
                  <Card 
                    key={offer.id}
                    className={`cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg ${
                      isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
                    }`}
                    onClick={() => toggleOfferSelection(offer.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{anonymizedAgentName}</h4>
                        <div className={`px-2 py-1 rounded text-sm ${scoreStyle.bg} ${scoreStyle.textCss}`}>
                          {offer.score}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><strong>Pris:</strong> {offer.expectedPrice}</p>
                        <p><strong>Salær:</strong> {offer.commission}</p>
                        <p><strong>Periode:</strong> {offer.bindingPeriod}</p>
                      </div>
                      {isSelected && (
                        <div className="mt-2 flex justify-center">
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {selectedOffers.length >= 2 && (
              <div className="flex justify-center">
                <Dialog open={isComparisonOpen} onOpenChange={setIsComparisonOpen}>
                  <DialogTrigger asChild>
                    <Button className="transition-all duration-300 ease-in-out hover:scale-105">
                      <GitCompare className="mr-2 h-4 w-4" />
                      Sammenlign {selectedOffers.length} tilbud
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center justify-between">
                        Sammenligning af Tilbud
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedOffers([])}
                          className="transition-all duration-300 ease-in-out hover:scale-105"
                        >
                          <X className="h-4 w-4" />
                          Ryd valg
                        </Button>
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2">
                            <th className="py-3 px-2 text-left">Kriterium</th>
                            {selectedOfferData.map(offer => (
                              <th key={offer.id} className="py-3 px-2 text-center">
                                Mægler {offer.id}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <ComparisonRow 
                            label="Score" 
                            getValue={(offer) => {
                              const style = getScoreStyling(offer.score);
                              return (
                                <span className={`px-2 py-1 rounded ${style.bg} ${style.textCss}`}>
                                  {offer.score}
                                </span>
                              );
                            }}
                          />
                          <ComparisonRow 
                            label="Forventet pris" 
                            getValue={(offer) => offer.expectedPrice}
                          />
                          <ComparisonRow 
                            label="Salær" 
                            getValue={(offer) => offer.commission}
                          />
                          <ComparisonRow 
                            label="Salær %" 
                            getValue={(offer) => `${((offer.commissionValue / offer.priceValue) * 100).toFixed(2)}%`}
                          />
                          <ComparisonRow 
                            label="Bindingsperiode" 
                            getValue={(offer) => offer.bindingPeriod}
                          />
                          <ComparisonRow 
                            label="Afgivet" 
                            getValue={(offer) => new Date(offer.submittedAt).toLocaleDateString('da-DK')}
                          />
                          <ComparisonRow 
                            label="Markedsføring" 
                            getValue={(offer) => (
                              <div className="space-y-1">
                                {offer.marketingMethods.filter(m => m.included).map(method => (
                                  <Badge key={method.id} variant="secondary" className="text-xs">
                                    {method.name}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          />
                          {!isSelectionFinalized && (
                            <ComparisonRow 
                              label="Handling" 
                              getValue={(offer) => (
                                <Button 
                                  size="sm" 
                                  onClick={() => {
                                    onSelectBroker(offer);
                                    setIsComparisonOpen(false);
                                  }}
                                  className="transition-all duration-300 ease-in-out hover:scale-105"
                                >
                                  Vælg
                                </Button>
                              )}
                            />
                          )}
                        </tbody>
                      </table>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default OfferComparison;
