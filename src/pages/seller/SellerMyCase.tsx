
import React, { useState } from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, Users, AlertCircle, CheckCircle, Home } from 'lucide-react';
import { useSellerCase } from '@/hooks/useSellerCase';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const SellerMyCase = () => {
  const { sellerCase, isLoading, scheduleShowing, markShowingCompleted } = useSellerCase();
  const { toast } = useToast();
  const [showingDate, setShowingDate] = useState('');
  const [showingTime, setShowingTime] = useState('');

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

  const handleScheduleShowing = () => {
    if (showingDate && showingTime) {
      scheduleShowing(showingDate, showingTime);
      toast({
        title: "Fremvisning booket",
        description: "Mæglere kan nu tilmelde sig din fremvisning."
      });
    }
  };

  const handleMarkCompleted = () => {
    markShowingCompleted();
    toast({
      title: "Fremvisning markeret som afholdt",
      description: "Mæglere kan nu afgive tilbud."
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-lato">
      <Navigation />
      
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Min Sag - {sellerCase.address}
          </h1>
          <p className="text-gray-600 mb-8">
            Administrer din sag og følg processen
          </p>

          {/* Case Overview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Sag Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Badge variant={
                    sellerCase.status === 'offers_received' ? 'default' : 'secondary'
                  }>
                    {sellerCase.status === 'active' && 'Aktiv'}
                    {sellerCase.status === 'showing_scheduled' && 'Fremvisning planlagt'}
                    {sellerCase.status === 'showing_completed' && 'Fremvisning afholdt'}
                    {sellerCase.status === 'offers_received' && 'Tilbud modtaget'}
                  </Badge>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-xl font-bold text-green-600">
                    {sellerCase.agentRegistrations.length}
                  </div>
                  <div className="text-sm text-gray-600">Tilmeldte mæglere</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-xl font-bold text-purple-600">
                    {sellerCase.offers.length}
                  </div>
                  <div className="text-sm text-gray-600">Modtagne tilbud</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 1: Schedule Showing */}
          {sellerCase.status === 'active' && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  1. Book Fremvisning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Book en fremvisning så mæglere kan komme og se din bolig.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Dato</label>
                    <Input
                      type="date"
                      value={showingDate}
                      onChange={(e) => setShowingDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tidspunkt</label>
                    <Input
                      type="time"
                      value={showingTime}
                      onChange={(e) => setShowingTime(e.target.value)}
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleScheduleShowing}
                  disabled={!showingDate || !showingTime}
                >
                  Book fremvisning
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Showing Scheduled */}
          {sellerCase.status === 'showing_scheduled' && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  2. Fremvisning Planlagt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p><strong>Dato:</strong> {sellerCase.showingDate}</p>
                  <p><strong>Tidspunkt:</strong> {sellerCase.showingTime}</p>
                </div>
                <p className="text-gray-600 mb-4">
                  {sellerCase.agentRegistrations.length} mæglere har tilmeldt sig.
                </p>
                <Button onClick={handleMarkCompleted}>
                  Marker fremvisning som afholdt
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Agent Registrations */}
          {sellerCase.agentRegistrations.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Tilmeldte Mæglere
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sellerCase.agentRegistrations.map((registration) => (
                    <div key={registration.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{registration.agencyName}</p>
                        <p className="text-sm text-gray-600">v. {registration.agentName}</p>
                        <p className="text-xs text-gray-500">
                          Tilmeldt: {new Date(registration.registeredAt).toLocaleDateString('da-DK')}
                        </p>
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

          {/* Step 3: Offers */}
          {sellerCase.status === 'offers_received' && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  3. Modtagne Tilbud
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Du har modtaget {sellerCase.offers.length} tilbud. Gennemgå dem og vælg den bedste mægler.
                </p>
                <Link to="/saelger/tilbud">
                  <Button>Se tilbud</Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Navigation Links */}
          <div className="flex gap-4 justify-center">
            <Link to="/saelger/tilbud">
              <Button variant="outline">Se tilbud</Button>
            </Link>
            <Link to="/saelger/beskeder">
              <Button variant="outline">Beskeder</Button>
            </Link>
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

export default SellerMyCase;
