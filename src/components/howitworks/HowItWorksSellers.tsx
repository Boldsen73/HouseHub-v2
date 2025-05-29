
import { Card, CardContent } from '@/components/ui/card';
import { Home, Search, Send } from 'lucide-react';

const HowItWorksSellers = () => {
  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        For boligsælgere
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <Card className="text-center border-0 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Home className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-4">1. Beskriv din bolig</h3>
            <p className="text-gray-600 text-sm">
              Indtast oplysninger om din bolig, ønsket pris og andre relevante detaljer.
            </p>
          </CardContent>
        </Card>
        
        <Card className="text-center border-0 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-4">2. Modtag tilbud</h3>
            <p className="text-gray-600 text-sm">
              Kvalificerede ejendomsmæglere vurderer din bolig og afgiver konkrete tilbud.
            </p>
          </CardContent>
        </Card>
        
        <Card className="text-center border-0 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-4">3. Sammenlign og vælg</h3>
            <p className="text-gray-600 text-sm">
              Sammenlign tilbud på pris, salær, markedsføring og vælg den bedste mægler.
            </p>
          </CardContent>
        </Card>
        
        <Card className="text-center border-0 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-4">4. Sælg din bolig</h3>
            <p className="text-gray-600 text-sm">
              Din valgte mægler sælger din bolig med den aftalte service og pris.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HowItWorksSellers;
