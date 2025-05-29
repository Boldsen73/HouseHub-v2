
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PartyPopper, CheckCircle } from 'lucide-react';

const SellerThankYouPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-6 py-12 md:py-20 flex items-center justify-center">
        <Card className="shadow-xl border-0 max-w-lg text-center">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-4">
              <PartyPopper className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-3xl md:text-4xl text-green-600">Tak for dit valg!</CardTitle>
            <CardDescription className="text-lg text-gray-600 pt-2">
              Din valgte ejendomsmægler er nu blevet underrettet.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-6">
              Mægleren vil kontakte dig snarest muligt for at igangsætte salgsprocessen.
              HouseHub værdsætter, at du har benyttet vores platform, og vi ønsker dig held og lykke med salget af din bolig!
            </p>
            <p className="text-gray-700 mb-8">
              Du kan se status for din sag, inklusiv den valgte mægler, på din sagsside.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/saelger/min-sag">
                <Button variant="outline" className="w-full sm:w-auto">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Tilbage til Min Sag
                </Button>
              </Link>
              <Link to="/">
                <Button className="w-full sm:w-auto">
                  Til Forsiden
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default SellerThankYouPage;
