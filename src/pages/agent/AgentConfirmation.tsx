
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const AgentConfirmation = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">HouseHub</span>
              <span className="text-lg text-gray-500">| Mægler Portal</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-600 border-green-600">
                Lars P. - Aktiv
              </Badge>
              <Button variant="ghost" size="sm">
                Log ud
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <CardTitle className="text-3xl text-green-600">Tilbud afgivet!</CardTitle>
              <p className="text-gray-600">Dit tilbud er nu sendt til boligsælgeren</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">Tilbuds detaljer</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Bolig:</span>
                      <span className="font-medium">Strandvejen 45, 2900 Hellerup</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Din vurdering:</span>
                      <span className="font-medium">4.150.000 DKK</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dit salær:</span>
                      <span className="font-medium">2,5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Markedsføringsbudget:</span>
                      <span className="font-medium">75.000 DKK</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Forventet salgstid:</span>
                      <span className="font-medium">2-4 måneder</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">Hvad sker der nu?</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-blue-600">1</span>
                      </div>
                      <p>Sælgeren modtager dit tilbud via email og SMS</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-blue-600">2</span>
                      </div>
                      <p>De sammenligner alle tilbud (du konkurrerer med 2-4 andre mæglere)</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-blue-600">3</span>
                      </div>
                      <p>Du får besked inden for 5 hverdage om sælgerens beslutning</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Vigtige detaljer</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Tilbuds ID:</strong> MH-2024-005678</p>
                    <p><strong>Gyldig til:</strong> 7. januar 2025</p>
                    <p><strong>Status:</strong> Under behandling</p>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-6">
                  <Link to="/maegler/gennemse-sager" className="flex-1">
                    <Button variant="outline" className="w-full">
                      Se flere sager
                    </Button>
                  </Link>
                  <Link to="/maegler/gennemse-sager" className="flex-1">
                    <Button className="w-full">
                      Mine tilbud
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgentConfirmation;
