
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4 font-lato">
            Hvad siger vores brugere?
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg bg-white rounded-2xl hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <p className="text-slate-600 mb-6 italic leading-relaxed font-light text-lg">
                "HouseHub gjorde det så let at finde den rigtige mægler. Jeg fik flere tilbud og kunne vælge den bedste."
              </p>
              <div className="text-sm font-medium text-slate-900 font-lato">
                - Maria K., København
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white rounded-2xl hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <p className="text-slate-600 mb-6 italic leading-relaxed font-light text-lg">
                "Som mægler har HouseHub hjulpet mig med at finde nye kunder og vokse min forretning."
              </p>
              <div className="text-sm font-medium text-slate-900 font-lato">
                - Lars P., Aarhus
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white rounded-2xl hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <p className="text-slate-600 mb-6 italic leading-relaxed font-light text-lg">
                "Transparent proces og professionel service. Jeg kan varmt anbefale HouseHub."
              </p>
              <div className="text-sm font-medium text-slate-900 font-lato">
                - Anne S., Odense
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
