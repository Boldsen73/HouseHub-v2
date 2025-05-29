import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import ProgressIndicator from '../../components/ProgressIndicator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ListChecks, ArrowDown, UserCheck, ShoppingBag, CalendarDays, Users, FileText, CheckSquare } from 'lucide-react';

const SellerInfo = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <ProgressIndicator currentStep={4} totalSteps={6} />
          
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Sådan hjælper HouseHub dig</CardTitle>
              <p className="text-gray-600">Få indsigt i vores proces og hvordan vi finder de bedste mæglere til din bolig</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center mb-4">
                    <ListChecks className="h-7 w-7 mr-3 text-blue-600" />
                    <h3 className="font-semibold text-xl text-blue-700">Vores proces</h3>
                  </div>
                  <div className="ml-10 space-y-6">
                    <div className="relative pl-8 pb-6 border-l-2 border-blue-200">
                      <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">1</div>
                       <div className="flex items-center mb-1">
                        <CalendarDays className="h-5 w-5 mr-2 text-blue-500" />
                        <h4 className="font-medium text-lg">Du indtaster oplysninger og fremvisningsdato</h4>
                      </div>
                      <p className="text-gray-600">
                        Du starter med at udfylde information om din bolig og angiver en dato for, hvornår mæglerne kan komme på fremvisning.
                        (Bemærk: Indtastning af fremvisningsdato implementeres i et senere trin).
                      </p>
                    </div>
                    
                    <div className="relative pl-8 pb-6 border-l-2 border-blue-200">
                      <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">2</div>
                       <div className="flex items-center mb-1">
                        <Users className="h-5 w-5 mr-2 text-blue-500" />
                        <h4 className="font-medium text-lg">Mæglerne inspicerer boligen sammen med dig</h4>
                      </div>
                      <p className="text-gray-600">
                        På den aftalte dato kommer de interesserede mæglere og ser din bolig sammen med dig. Dette giver dem et grundigt indtryk.
                      </p>
                    </div>
                    
                    <div className="relative pl-8 pb-6 border-l-2 border-blue-200">
                      <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">3</div>
                       <div className="flex items-center mb-1">
                        <FileText className="h-5 w-5 mr-2 text-blue-500" />
                        <h4 className="font-medium text-lg">Du modtager tilbud</h4>
                      </div>
                      <p className="text-gray-600">
                        Indenfor 3 dage efter fremvisningen modtager du salgstilbud fra mæglerne direkte gennem HouseHub-platformen.
                      </p>
                    </div>

                    <div className="relative pl-8">
                      <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">4</div>
                       <div className="flex items-center mb-1">
                        <CheckSquare className="h-5 w-5 mr-2 text-blue-500" />
                        <h4 className="font-medium text-lg">Du vælger mægler</h4>
                      </div>
                      <p className="text-gray-600">
                        Senest 7 dage efter du har modtaget tilbuddene, vælger du den mægler, du ønsker at samarbejde med. Valget er dit.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex items-center mb-4">
                    <UserCheck className="h-7 w-7 mr-3 text-blue-600" />
                    <h3 className="font-semibold text-xl text-blue-700">Dine fordele</h3>
                  </div>
                  <ul className="ml-10 space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2">✓</span> 
                      <span>Spar tid ved at lade mæglere konkurrere om din sag</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2">✓</span> 
                      <span>Få adgang til mæglere med specialiseret erfaring i netop din type bolig</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2">✓</span> 
                      <span>Sammenlign tilbud side om side og træf et informeret valg</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2">✓</span> 
                      <span>Opnå en bedre pris og vilkår gennem konkurrence</span>
                    </li>
                     <li className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2">✓</span> 
                      <span>Du får kontakt til mange flere mæglere end gennem en normal salgsproces</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <div className="flex items-center mb-4">
                    <ShoppingBag className="h-7 w-7 mr-3 text-blue-600" />
                    <h3 className="font-semibold text-xl text-blue-700">Din investering</h3>
                  </div>
                  <div className="ml-10 p-5 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-medium text-gray-700">Opstartsgebyr:</span>
                      <span className="text-xl font-bold text-blue-700">500 DKK</span>
                    </div>
                    <p className="text-green-700 font-medium mb-2">
                      ✓ Refunderes fuldt ud ved aftaleindgåelse med en mægler
                    </p>
                    <p className="text-sm text-gray-500">
                      Dit gebyr dækker hele processen, fra kontakt til mæglere til endelig udvælgelse. 
                      Beløbet refunderes, når du indgår en formidlingsaftale med en af de mæglere, du har fået 
                      kontakt til gennem HouseHub.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 pt-6">
                <Link to="/saelger/betingelser" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Tilbage
                  </Button>
                </Link>
                <Link to="/saelger/betaling" className="flex-1">
                  <Button className="w-full flex items-center">
                    Fortsæt til betaling
                    <ArrowDown className="ml-2 h-4 w-4 rotate-[-90deg]" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SellerInfo;
