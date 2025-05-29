
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Home, DollarSign, Calendar } from 'lucide-react';
import AdminReturnBanner from '@/components/admin/AdminReturnBanner';

const AgentCaseDetail = () => {
  const { id } = useParams();
  const isAdminSession = localStorage.getItem('admin_session_backup');

  // Mock case data - in real app would fetch based on ID
  const caseData = {
    id: id,
    sagsnummer: `SAG-2024-${id?.padStart(3, '0')}`,
    address: "Åbyhøj Allé 123, 8230 Åbyhøj",
    type: "Villa",
    size: "180 m²",
    rooms: 6,
    price: "4.500.000 DKK",
    status: "Aktiv",
    description: "Dejlig villa i roligt område med stor have og moderne indretning.",
    seller: {
      name: "Mette Hansen",
      email: "mette.hansen@email.dk",
      phone: "+45 12 34 56 78"
    },
    createdAt: "2024-01-10T09:00:00"
  };

  const handleSubmitOffer = () => {
    // Navigate to submit offer page
    window.location.href = `/maegler/afgiv-tilbud/${id}`;
  };

  const handleContactSeller = () => {
    // Navigate to messages page with this case pre-selected
    window.location.href = `/maegler/beskeder?case=${id}`;
  };

  const handleBookViewing = () => {
    // Navigate to viewing booking page
    window.location.href = `/maegler/book-fremvisning/${id}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isAdminSession && <AdminReturnBanner />}
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/maegler/sager">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Tilbage til sager
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sag detaljer</h1>
            <p className="text-gray-600">{caseData.sagsnummer}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Case Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Sag oversigt</span>
                  <Badge className="bg-green-100 text-green-800">
                    {caseData.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">{caseData.address}</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Type</p>
                      <p className="font-medium">{caseData.type}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Størrelse</p>
                    <p className="font-medium">{caseData.size}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Værelser</p>
                    <p className="font-medium">{caseData.rooms}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Pris</p>
                      <p className="font-medium text-green-600">{caseData.price}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Beskrivelse</p>
                  <p className="text-gray-800">{caseData.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Handlinger</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={handleSubmitOffer}
                  >
                    Afgiv tilbud
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleContactSeller}
                  >
                    Kontakt sælger
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleBookViewing}
                  >
                    Book fremvisning
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seller Information */}
            <Card>
              <CardHeader>
                <CardTitle>Sælger information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Navn</p>
                  <p className="font-medium">{caseData.seller.name}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{caseData.seller.email}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Telefon</p>
                  <p className="font-medium">{caseData.seller.phone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Case Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Sag tidslinje</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Sag oprettet</p>
                      <p className="text-xs text-gray-600">
                        {new Date(caseData.createdAt).toLocaleDateString('da-DK')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Publiceret til mæglere</p>
                      <p className="text-xs text-gray-600">
                        {new Date(caseData.createdAt).toLocaleDateString('da-DK')}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCaseDetail;
