
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Calendar, Users, Clock, Eye } from 'lucide-react';

const SellerFinalConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Mock data - in real app this would come from the form submission
  const submittedData = location.state || {
    address: "Strandvejen 45, 2900 Hellerup",
    expectedPrice: "4.200.000 DKK",
    propertyType: "Villa",
    size: "180 m²",
    submittedAt: new Date().toLocaleString('da-DK')
  };

  return (
    <div className="min-h-screen bg-gray-50 font-lato">
      <Navigation />
      
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center bg-green-50">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <CardTitle className="text-3xl text-green-700 mb-2">Tak for din tilmelding!</CardTitle>
              <p className="text-green-600 text-lg">
                Din sag er nu sendt til relevante ejendomsmæglere
              </p>
            </CardHeader>
            
            <CardContent className="p-8">
              <div className="space-y-8">
                {/* Summary of submitted data */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">Oversigt over dine oplysninger</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Adresse:</span>
                      <p className="font-medium">{submittedData.address}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Forventet pris:</span>
                      <p className="font-medium">{submittedData.expectedPrice}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Boligtype:</span>
                      <p className="font-medium">{submittedData.propertyType}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Størrelse:</span>
                      <p className="font-medium">{submittedData.size}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <span className="text-gray-600 text-xs">Indsendt:</span>
                    <p className="text-xs text-gray-500">{submittedData.submittedAt}</p>
                  </div>
                </div>

                {/* What happens next */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Hvad sker der nu?
                  </h3>
                  <div className="space-y-4 text-sm text-blue-700">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Users className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <p>Kvalificerede ejendomsmæglere i dit område bliver automatisk kontaktet</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <p>Du modtager de første tilbud inden for 48 timer</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Eye className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <p>Du kan til enhver tid se status og redigere dine oplysninger</p>
                    </div>
                  </div>
                </div>

                {/* Helper text */}
                <div className="text-center text-gray-600 text-sm bg-gray-50 p-4 rounded-lg">
                  Vi har nu sendt din sag til relevante mæglere. Du vil modtage de første tilbud inden for 48 timer. 
                  Du kan til enhver tid se status og redigere dine oplysninger.
                </div>

                {/* Action buttons */}
                <div className="flex gap-4 pt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/')}
                    className="flex-1"
                  >
                    Til forsiden
                  </Button>
                  <Button 
                    onClick={() => navigate('/saelger/min-sag')}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    Gå til min sag
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SellerFinalConfirmation;
