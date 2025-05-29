
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Thanks = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <CardTitle className="text-3xl text-green-600">Tak for din besked!</CardTitle>
              <p className="text-gray-600">Vi har modtaget din henvendelse</p>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <div className="space-y-6">
                <p className="text-gray-600">
                  Vi vil besvare din henvendelse inden for 1-2 hverdage. 
                  Hvis det er akut, er du velkommen til at ringe til os på +45 12 34 56 78.
                </p>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">I mellemtiden kan du:</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Læse vores guide til <Link to="/hvordan-det-virker" className="text-blue-600 hover:underline">hvordan HouseHub virker</Link></p>
                    <p>• Besøge vores <Link to="/om-househub" className="text-blue-600 hover:underline">Om os side</Link> for mere information</p>
                    <p>• Starte din <Link to="/saelger/start" className="text-blue-600 hover:underline">boligsalg proces</Link></p>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-6">
                  <Link to="/" className="flex-1">
                    <Button variant="outline" className="w-full">
                      Til forsiden
                    </Button>
                  </Link>
                  <Link to="/kontakt" className="flex-1">
                    <Button className="w-full">
                      Send ny besked
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

export default Thanks;
