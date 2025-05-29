
import React from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, Users, Phone, Mail, ArrowRight } from 'lucide-react';

const WaitingForOffers = () => {
  // Mock data - in real app this would come from API
  const caseData = {
    caseNumber: "HH-2024-1234",
    submittedAt: "2024-01-15T10:30:00Z",
    agentsInvited: 12,
    agentsViewed: 8,
    offersReceived: 3,
    expectedOffers: "3-5",
    timeframeHours: 48
  };

  const timelineSteps = [
    {
      id: 1,
      title: "Sag udsendt",
      description: "Din sag er sendt til kvalificerede mæglere",
      status: "completed",
      icon: <CheckCircle className="h-6 w-6" />
    },
    {
      id: 2,
      title: "Under vurdering",
      description: "Mæglere gennemgår din bolig og forbereder tilbud",
      status: "active",
      icon: <Clock className="h-6 w-6" />
    },
    {
      id: 3,
      title: "Tilbud på vej",
      description: "Du modtager tilbud fra interesserede mæglere",
      status: "pending",
      icon: <Users className="h-6 w-6" />
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'active': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-gray-400 bg-gray-100';
      default: return 'text-gray-400 bg-gray-100';
    }
  };

  const getStepLineColor = (status: string) => {
    return status === 'completed' ? 'bg-green-600' : 'bg-gray-300';
  };

  return (
    <div className="min-h-screen bg-gray-50 font-lato">
      <Navigation />
      
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Din sag er under behandling
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Vi arbejder på at finde de bedste mæglere til din bolig
            </p>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Sagsnummer: {caseData.caseNumber}
            </Badge>
          </div>

          {/* Timeline */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-6 w-6 text-blue-600" />
                Status for din sag
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {timelineSteps.map((step, index) => (
                  <div key={step.id} className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`p-3 rounded-full ${getStatusColor(step.status)}`}>
                      {step.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">
                        {step.description}
                      </p>
                    </div>

                    {/* Connecting line */}
                    {index < timelineSteps.length - 1 && (
                      <div className="absolute left-8 mt-16 w-0.5 h-8 bg-gray-300"></div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {caseData.agentsInvited}
                </div>
                <div className="text-sm text-gray-600 mb-1">Mæglere inviteret</div>
                <div className="text-xs text-gray-500">
                  {caseData.agentsViewed} har set din sag
                </div>
              </CardContent>
            </Card>

            <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {caseData.offersReceived}
                </div>
                <div className="text-sm text-gray-600 mb-1">Tilbud modtaget</div>
                <div className="text-xs text-gray-500">
                  af forventet {caseData.expectedOffers}
                </div>
              </CardContent>
            </Card>

            <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {caseData.timeframeHours}t
                </div>
                <div className="text-sm text-gray-600 mb-1">Typisk responstid</div>
                <div className="text-xs text-gray-500">
                  for komplette tilbud
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Information Box */}
          <Card className="mb-8 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Hvad sker der nu?
                  </h3>
                  <p className="text-blue-800 mb-4">
                    Du modtager typisk <strong>3-5 tilbud inden for 48 timer</strong>. 
                    Mæglerne bruger tiden på at vurdere din bolig grundigt, så du får de bedst mulige tilbud.
                  </p>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Du får besked så snart der kommer nye tilbud</li>
                    <li>• Du kan sammenligne alle tilbud på én side</li>
                    <li>• Du kan stille spørgsmål til mæglerne før du vælger</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support Section */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Har du spørgsmål eller brug for hjælp?
                  </h3>
                  <p className="text-gray-600">
                    Vores team står klar til at hjælpe dig gennem processen.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    info@househub.dk
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    +45 XX XX XX XX
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Link to="/saelger/dashboard">
              <Button variant="outline">
                Tilbage til dashboard
              </Button>
            </Link>
            <Link to="/saelger/min-sag">
              <Button className="flex items-center gap-2">
                Se min sag
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default WaitingForOffers;
