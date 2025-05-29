import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import ProgressIndicator from '../../components/ProgressIndicator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const SellerTerms = () => {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <ProgressIndicator currentStep={3} totalSteps={6} />
          
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Betingelser</CardTitle>
              <p className="text-gray-600">Læs og acceptér vores betingelser</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg max-h-64 overflow-y-auto">
                  <h3 className="font-semibold mb-4">Handelsbetingelser for HouseHub</h3>
                  <div className="space-y-4 text-sm text-gray-600">
                    <p>Ved at benytte HouseHub accepterer du følgende betingelser:</p>
                    <p>1. HouseHub fungerer som platform mellem boligsælgere og ejendomsmæglere.</p>
                    <p>2. Vi garanterer ikke salg af din bolig, men faciliterer kontakt til kvalificerede mæglere.</p>
                    <p>3. Alle oplysninger skal være korrekte og sandfærdige.</p>
                    <p>4. Du kan til enhver tid trække dit salg tilbage.</p>
                    <p>5. Betaling til HouseHub sker først ved succesfuldt salg.</p>
                    <p>6. Vi forbeholder os ret til at afvise upassende annoncer.</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg max-h-64 overflow-y-auto">
                  <h3 className="font-semibold mb-4">Privatlivspolitik</h3>
                  <div className="space-y-4 text-sm text-gray-600">
                    <p>Dine personlige oplysninger behandles i overensstemmelse med GDPR:</p>
                    <p>1. Vi indsamler kun nødvendige oplysninger til at levere vores service.</p>
                    <p>2. Dine data deles kun med relevante ejendomsmæglere.</p>
                    <p>3. Du kan til enhver tid anmode om sletning af dine data.</p>
                    <p>4. Vi bruger cookies til at forbedre brugeroplevelsen.</p>
                    <p>5. Dine data opbevares sikkert og krypteret.</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      id="terms" 
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      Jeg accepterer handelsbetingelserne
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      id="privacy" 
                      checked={acceptPrivacy}
                      onCheckedChange={(checked) => setAcceptPrivacy(checked === true)}
                    />
                    <Label htmlFor="privacy" className="text-sm">
                      Jeg accepterer privatlivspolitikken
                    </Label>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-6">
                  <Link to="/saelger/prisinfo" className="flex-1">
                    <Button type="button" variant="outline" className="w-full">
                      Tilbage
                    </Button>
                  </Link>
                  <Link to="/saelger/info" className="flex-1">
                    <Button 
                      className="w-full"
                      disabled={!acceptTerms || !acceptPrivacy}
                    >
                      Næste
                    </Button>
                  </Link>
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

export default SellerTerms;
