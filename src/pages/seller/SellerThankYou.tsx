
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Home, Phone } from 'lucide-react';

const SellerThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-lato">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader className="text-center bg-green-50">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-700">Tak!</CardTitle>
            <CardDescription className="text-green-600 text-lg">
              Din sag er nu sendt til relevante ejendomsmæglere. Du modtager snart de første tilbud.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-3">Hvad sker der nu?</h3>
              <div className="space-y-3 text-sm text-blue-700">
                <p>• Kvalificerede ejendomsmæglere i dit område bliver kontaktet automatisk</p>
                <p>• Du modtager de første tilbud inden for 24-48 timer</p>
                <p>• Du kan sammenligne tilbud og vælge den bedste mægler til dig</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-semibold text-gray-700 mb-2">Kontakt os</h4>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <Phone className="h-4 w-4 mr-2" />
                <span>+45 12 34 56 78</span>
              </div>
              <p className="text-sm text-gray-600">support@househub.dk</p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="flex-1"
              >
                <Home className="h-4 w-4 mr-2" />
                Til forsiden
              </Button>
              <Button 
                onClick={() => navigate('/saelger/min-sag')}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Se min sag
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default SellerThankYou;
