
import React from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, AlertCircle } from 'lucide-react';
import { useSellerCase } from '@/hooks/useSellerCase';
import { Link } from 'react-router-dom';
import EnhancedMessageThread from '@/components/seller/EnhancedMessageThread';

const SellerMessages = () => {
  const { sellerCase, isLoading } = useSellerCase();

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

  const handleSendMessage = (message: string, agentId: number) => {
    console.log('Sending message to agent:', agentId, message);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-lato">
      <Navigation />
      
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Beskeder - {sellerCase.address}
          </h1>
          <p className="text-gray-600 mb-8">
            Kommuniker med mæglere der har tilmeldt sig din sag
          </p>

          {/* Status Overview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Beskedstatus</span>
                <Badge variant="secondary">
                  {sellerCase.agentRegistrations.length} aktive samtaler
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Du kan sende beskeder til mæglere der har tilmeldt sig din fremvisning eller afgivet tilbud.
              </p>
            </CardContent>
          </Card>

          {/* Messages with registered agents */}
          {sellerCase.agentRegistrations.length > 0 ? (
            <div className="space-y-6">
              {sellerCase.agentRegistrations
                .filter(reg => reg.status === 'registered')
                .map((registration) => (
                <EnhancedMessageThread
                  key={registration.id}
                  agentName={registration.agentName}
                  agentId={registration.id}
                  caseId={parseInt(sellerCase.id)}
                  hasNewMessages={false}
                  onSendMessage={handleSendMessage}
                />
              ))}
            </div>
          ) : (
            <Card className="text-center">
              <CardContent className="p-8">
                <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ingen beskeder endnu</h3>
                <p className="text-gray-600 mb-4">
                  Når mæglere tilmelder sig din sag, kan du kommunikere med dem her.
                </p>
                {sellerCase.status === 'active' && (
                  <Link to="/saelger/min-sag">
                    <Button>Book fremvisning først</Button>
                  </Link>
                )}
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

export default SellerMessages;
