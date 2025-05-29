
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';

const HowItWorksAgents = () => {
  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        For ejendomsmæglere
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <Card className="text-center border-0 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="h-8 w-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-4">1. Opret profil</h3>
            <p className="text-gray-600 text-sm">
              Opret din mæglerprofil med autorisationsnummer og specialområder.
            </p>
          </CardContent>
        </Card>
        
        <Card className="text-center border-0 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold mb-4">2. Gennemse sager</h3>
            <p className="text-gray-600 text-sm">
              Se aktive boligsalg i dine arbejdsområder og filtrer efter dine præferencer.
            </p>
          </CardContent>
        </Card>
        
        <Card className="text-center border-0 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="h-8 w-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-4">3. Afgiv tilbud</h3>
            <p className="text-gray-600 text-sm">
              Vurder boligen og afgiv tilbud med dit salær, markedsføringsplan og strategi.
            </p>
          </CardContent>
        </Card>
        
        <Card className="text-center border-0 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-4">4. Vind opgaven</h3>
            <p className="text-gray-600 text-sm">
              Hvis sælgeren vælger dig, får du opgaven og kan starte salgsprocessen.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HowItWorksAgents;
