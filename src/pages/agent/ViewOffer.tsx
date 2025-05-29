
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Home, CheckCircle, Clock, Edit, Eye } from 'lucide-react';

const ViewOffer = () => {
  const { id } = useParams<{ id: string }>();

  // Mock offer data - in real app this would come from localStorage/API
  const offerData = {
    id: parseInt(id || '1'),
    address: "Strandvejen 45, 2900 Hellerup",
    expectedPrice: 4500000,
    commission: 67000,
    bindingPeriod: "6 måneder",
    marketingMethods: ["Boliga.dk", "Lokale aviser", "Åbent hus arrangementer", "Drone video"],
    strategy: "Kom med på en sag",
    submittedAt: "2024-01-15T14:30:00Z",
    status: "pending" as const,
    expiresAt: "2024-07-15T14:30:00Z"
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('da-DK', { 
      style: 'currency', 
      currency: 'DKK', 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('da-DK', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const commissionPercentage = ((offerData.commission / offerData.expectedPrice) * 100).toFixed(2);
  const canEdit = new Date() < new Date(offerData.expiresAt);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/maegler/gennemse-sager" className="flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="mr-2 h-5 w-5" />
              <span className="text-lg font-medium">Tilbage til sager</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-600 border-green-600">
                Lars P. - Aktiv
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dit tilbud
            </h1>
            <p className="text-gray-600">
              {offerData.address}
            </p>
          </div>

          <Card className="shadow-lg border-0 mb-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>Tilbuds detaljer</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge className={
                    offerData.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    offerData.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }>
                    <Clock className="w-3 h-3 mr-1" />
                    {offerData.status === 'pending' ? 'Afventer svar' :
                     offerData.status === 'accepted' ? 'Accepteret' : 'Afvist'}
                  </Badge>
                  {canEdit && (
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Rediger
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Forventet salgspris</h3>
                    <p className="text-2xl font-bold text-blue-600">{formatCurrency(offerData.expectedPrice)}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Dit salær</h3>
                    <p className="text-xl font-semibold">{formatCurrency(offerData.commission)}</p>
                    <p className="text-sm text-gray-500">({commissionPercentage}% af salgspris)</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Bindingsperiode</h3>
                    <p className="text-lg">{offerData.bindingPeriod}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Afgivet</h3>
                    <p className="text-lg">{formatDate(offerData.submittedAt)}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Udløber</h3>
                    <p className="text-lg">{formatDate(offerData.expiresAt)}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Status</h3>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Tilbud modtaget af sælger</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Markedsføringskanaler</h3>
                <div className="flex flex-wrap gap-2">
                  {offerData.marketingMethods.map((method, index) => (
                    <Badge key={index} variant="secondary">{method}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Salgsstrategi</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">{offerData.strategy}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Næste skridt</h3>
            <p className="text-blue-800 mb-4">
              Dit tilbud er nu hos sælgeren. Du vil modtage besked, så snart sælgeren har taget en beslutning.
            </p>
            <div className="flex gap-4">
              <Link to="/maegler/gennemse-sager">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100">
                  <Eye className="w-4 h-4 mr-2" />
                  Se andre sager
                </Button>
              </Link>
              <Link to="/maegler/dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Gå til dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOffer;
