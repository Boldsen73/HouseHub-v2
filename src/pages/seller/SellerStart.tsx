
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Home, LogIn, UserPlus } from 'lucide-react';

const SellerStart = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-md mx-auto"> {/* Reduced max-width for a more focused look */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Home className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Sælg din bolig
            </h1>
            <p className="text-xl text-gray-600">
              Kom i gang med at finde den perfekte ejendomsmægler.
            </p>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-4"> {/* Reduced padding bottom */}
              <CardTitle className="text-2xl">Velkommen</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8"> {/* Increased spacing */}
              <div>
                <Link to="/saelger/opret-bruger" className="block">
                  <Button size="lg" className="w-full h-16 text-lg">
                    <UserPlus className="mr-2 h-5 w-5" /> Opret ny bruger
                  </Button>
                </Link>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Start her hvis du er ny på HouseHub.
                </p>
              </div>
              
              <div>
                {/* Updated link to point to the new seller login page */}
                <Link to="/saelger/login" className="block"> 
                  <Button size="lg" variant="outline" className="w-full h-16 text-lg">
                    <LogIn className="mr-2 h-5 w-5" /> Log ind
                  </Button>
                </Link>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Har du allerede en bruger? Log ind her.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SellerStart;
