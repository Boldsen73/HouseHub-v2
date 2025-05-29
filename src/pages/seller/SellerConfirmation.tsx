import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import ProgressIndicator from '../../components/ProgressIndicator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { CheckCircle, CalendarClock, FileSignature, Users, CheckSquare } from 'lucide-react'; // Added CheckSquare

const SellerConfirmation = () => {
  // Placeholder data - in a real app, this would come from state or API
  const placeholderFremvisningsDato = "DD.MM.ÅÅÅÅ kl. HH:MM"; 
  const placeholderTilbudsFrist = "DD.MM.ÅÅÅÅ"; 

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <ProgressIndicator currentStep={6} totalSteps={6} /> {/* Updated currentStep and totalSteps */}
          
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" /> {/* Lucide Icon */}
              </div>
              <CardTitle className="text-3xl text-green-600">Tak for din tilmelding!</CardTitle>
              <p className="text-gray-600">Dit salg er nu aktivt på HouseHub</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">Hvad sker der nu?</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Users className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <p>Kvalificerede ejendomsmæglere vil automatisk blive kontaktet af HouseHub med din boligsag og oplysninger om fremvisningsdato.</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FileSignature className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <p>Efter fremvisningen modtager du tilbud via email og på din "Min Sag"-side inden for 3 hverdage.</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckSquare className="w-3.5 h-3.5 text-blue-600" /> {/* Changed icon */}
                      </div>
                      <p>Sammenlign tilbud og vælg den mægler, der passer bedst til dig, senest 7 dage efter modtagelse af tilbud.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Vigtige detaljer</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Din reference:</strong> HH-2024-001234 (Eksempel)</p>
                    <p><strong>Email bekræftelse:</strong> Sendt til din email</p>
                    <div className="flex items-center">
                      <CalendarClock className="w-4 h-4 mr-2 text-gray-500" />
                      <p><strong>Planlagt fremvisning:</strong> {placeholderFremvisningsDato} (Bekræftes separat)</p>
                    </div>
                     <div className="flex items-center">
                      <CalendarClock className="w-4 h-4 mr-2 text-gray-500" />
                      <p><strong>Frist for mæglertilbud:</strong> {placeholderTilbudsFrist} (3 dage efter fremvisning)</p>
                    </div>
                    <p><strong>Support:</strong> support@househub.dk eller +45 12 34 56 78</p>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-6">
                  <Link to="/" className="flex-1">
                    <Button variant="outline" className="w-full">
                      Til forsiden
                    </Button>
                  </Link>
                  <Link to="/saelger/min-sag" className="flex-1"> {/* Added Link to Min Sag */}
                    <Button className="w-full">
                       Se Min Sag
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

export default SellerConfirmation;
