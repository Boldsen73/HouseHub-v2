
import React from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { useSellerCase } from '@/hooks/useSellerCase';
import { Link } from 'react-router-dom';
import OffersListSection from '@/components/seller/OffersListSection';

const SellerOffers = () => {
  const { sellerCase, isLoading, scheduleShowing, markShowingCompleted } = useSellerCase();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Indlæser...</div>
      </div>
    );
  }

  if (!sellerCase) {
    return (
      <div className="min-h-screen bg-gray-50 font-lato">
        <Navigation />
        <div className="container mx-auto px-6 py-20">
          <Card className="text-center">
            <CardContent className="p-8">
              <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Ingen aktiv sag</h2>
              <p className="text-gray-600 mb-4">Du har ikke nogen aktiv sag endnu.</p>
              <Link to="/saelger/dashboard">
                <Button>Tilbage til dashboard</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-lato">
      <Navigation />
      
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tilbud - {sellerCase.address}
          </h1>
          <p className="text-gray-600 mb-8">
            Følg processen og se tilbud fra mæglere
          </p>

          {/* Status Overview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Status</span>
                <Badge variant={sellerCase.status === 'offers_received' ? 'default' : 'secondary'}>
                  {sellerCase.status === 'active' && 'Aktiv - afventer fremvisning'}
                  {sellerCase.status === 'showing_scheduled' && 'Fremvisning planlagt'}
                  {sellerCase.status === 'showing_completed' && 'Fremvisning afholdt'}
                  {sellerCase.status === 'offers_received' && 'Tilbud modtaget'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {sellerCase.status === 'active' && (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Book fremvisning</h3>
                  <p className="text-gray-600 mb-4">
                    Du skal først booke en fremvisning, så mæglere kan komme og se din bolig.
                  </p>
                  <Link to="/saelger/min-sag">
                    <Button>Book fremvisning</Button>
                  </Link>
                </div>
              )}

              {sellerCase.status === 'showing_scheduled' && (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Fremvisning planlagt</h3>
                  <p className="text-gray-600 mb-2">
                    <strong>Dato:</strong> {sellerCase.showingDate}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <strong>Tidspunkt:</strong> {sellerCase.showingTime}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    {sellerCase.agentRegistrations.length} mæglere har tilmeldt sig
                  </p>
                  <Link to="/saelger/min-sag">
                    <Button>Se tilmeldinger</Button>
                  </Link>
                </div>
              )}

              {sellerCase.status === 'showing_completed' && (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Fremvisning afholdt</h3>
                  <p className="text-gray-600 mb-4">
                    Afventer tilbud fra mæglere som deltog i fremvisningen.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Agent Registrations */}
          {sellerCase.agentRegistrations.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Mæglere tilmeldt fremvisning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sellerCase.agentRegistrations.map((registration) => (
                    <div key={registration.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{registration.agencyName}</p>
                        <p className="text-sm text-gray-600">v. {registration.agentName}</p>
                      </div>
                      <Badge variant={registration.status === 'registered' ? 'default' : 'secondary'}>
                        {registration.status === 'registered' ? 'Tilmeldt' : 'Afvist'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Offers Section */}
          <OffersListSection
            hasWithdrawnCase={false}
            caseWithdrawn={false}
            offers={sellerCase.offers}
            onSelectOffer={(offer) => console.log('Selected offer:', offer)}
          />

          {sellerCase.offers.length === 0 && sellerCase.status !== 'active' && (
            <Card className="text-center">
              <CardContent className="p-8">
                <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ingen tilbud endnu</h3>
                <p className="text-gray-600">
                  {sellerCase.status === 'showing_scheduled' 
                    ? 'Tilbud vil komme efter fremvisningen er afholdt.'
                    : 'Mæglere vil afgive tilbud efter fremvisningen.'}
                </p>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-center mt-8">
            <Link to="/saelger/dashboard">
              <Button variant="outline">Tilbage til dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SellerOffers;
