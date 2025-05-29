import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Om HouseHub
            </h1>
            <p className="text-xl text-gray-600">
              Vi revolutionerer måden danskere sælger boliger på
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Vores mission</h2>
              <p className="text-gray-600 mb-4">
                HouseHub blev grundlagt med en simpel mission: at gøre boligsalg mere transparent, 
                effektivt og fordelagtigt for både sælgere og ejendomsmæglere.
              </p>
              <p className="text-gray-600 mb-4">
                Vi tror på, at teknologi kan forbedre den traditionelle ejendomsmarked ved at 
                skabe bedre forbindelser mellem de rigtige parter på det rigtige tidspunkt.
              </p>
              <p className="text-gray-600">
                Gennem vores platform sikrer vi, at boligsælgere får adgang til de bedste 
                mæglere, mens mæglere får mulighed for at vokse deres forretning med kvalificerede leads.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Vores værdier</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Transparens</h3>
                  <p className="text-gray-600 text-sm">
                    Alle priser, betingelser og processer er synlige og forståelige.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Kvalitet</h3>
                  <p className="text-gray-600 text-sm">
                    Vi arbejder kun med verificerede og autoriserede ejendomsmæglere.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Innovation</h3>
                  <p className="text-gray-600 text-sm">
                    Vi bruger teknologi til at forbedre den traditionelle ejendomsmarked.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Service</h3>
                  <p className="text-gray-600 text-sm">
                    Personlig support og rådgivning gennem hele processen.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Hvorfor HouseHub?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg transform transition-transform duration-200 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-4">5000+</div>
                  <h3 className="font-semibold mb-2">Succesfulde salg</h3>
                  <p className="text-gray-600 text-sm">
                    Vi har hjulpet tusindvis af danskere med at sælge deres boliger.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg transform transition-transform duration-200 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-4">200+</div>
                  <h3 className="font-semibold mb-2">Partnermæglere</h3>
                  <p className="text-gray-600 text-sm">
                    Autoriserede ejendomsmæglere over hele Danmark.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg transform transition-transform duration-200 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-4">98%</div>
                  <h3 className="font-semibold mb-2">Kundetilfredshed</h3>
                  <p className="text-gray-600 text-sm">
                    Vores kunder anbefaler os til venner og familie.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="bg-gray-50 -mx-6 px-6 py-16">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Uafhængig og neutral
              </h2>
              <div className="max-w-3xl mx-auto">
                <p className="text-gray-600 mb-4">
                  HouseHub er ikke ejet af eller tilknyttet nogen ejendomsmæglere eller mæglerkæder. 
                  Dette sikrer, at vi altid handler i vores brugeres bedste interesse.
                </p>
                <p className="text-gray-600 mb-4">
                  Vores forretningsmodel er baseret på succesgebyrer, hvilket betyder, at vi kun 
                  tjener penge, når vores brugere får et succesfuldt salg.
                </p>
                <p className="text-gray-600">
                  Denne tilgang sikrer, at vores interesser er fuldstændig i overensstemmelse 
                  med vores kunders behov for det bedst mulige resultat.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Kontakt teamet
            </h2>
            <p className="text-gray-600 mb-8">
              Har du spørgsmål eller vil du vide mere om HouseHub? 
              Vi er altid klar til at hjælpe.
            </p>
            <div className="space-y-2">
              <p className="text-gray-600">Email: hello@househub.dk</p>
              <p className="text-gray-600">Telefon: +45 12 34 56 78</p>
              <p className="text-gray-600">Adresse: København, Danmark</p>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
