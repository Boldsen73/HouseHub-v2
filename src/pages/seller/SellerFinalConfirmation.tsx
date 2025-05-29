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

  // 🛠 Gendan brugerdata i localStorage, hvis det er nødvendigt
  const savedUser = localStorage.getItem("currentUser");
  if (!savedUser) {
    const fallbackUser = {
      id: "midlertidig-id",
      name: "Ukendt Bruger",
      email: "ukendt@househub.dk",
    };
    localStorage.setItem("currentUser", JSON.stringify(fallbackUser));
  }

  // Mock data – in real app this would come from the form submission
  const submittedData = location.state || {
    address: "Strandvejen 45, 2900 Hellerup",
    expectedPrice: "4.200.000 DKK",
    propertyType: "Villa",
    size: "180 m²",
    submittedAt: new Date().toLocaleString('da-DK'),
  };

  return (
    <div className="min-h-screen bg-gray-50 font-lato">
      <Navigation />
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-xl border-none">
            <CardHeader className="text-center text-green-600">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-6" />
              <CardTitle className="text-3xl text-green-700 mb-2">Tak for din tilmelding!</CardTitle>
              <p className="text-green-600 text-lg">Din sag er nu sendt til relevante ejendomsmæglere</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-xl mb-4">Oversigt over dine oplysninger</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><strong>Adresse:</strong> {submittedData.address}</div>
                  <div><strong>Ejendomstype:</strong> {submittedData.propertyType}</div>
                  <div><strong>Størrelse:</strong> {submittedData.size}</div>
                  <div><strong>Forventet pris:</strong> {submittedData.expectedPrice}</div>
                  <div><strong>Sendt:</strong> {submittedData.submittedAt}</div>
                </div>
              </div>
              <div className="text-center mt-8">
                <Button onClick={() => navigate('/seller/dashboard')} className="text-white bg-green-600 hover:bg-green-700">
                  Gå til dashboard
                </Button>
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
