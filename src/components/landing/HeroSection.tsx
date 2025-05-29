
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, ArrowLeft } from 'lucide-react';

const HeroSection = () => {
  // Using a more subtle, Nordic-style architectural image
  const heroImageUrl = "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"; 
  const heroImageAltText = "Moderne skandinavisk hjem med minimalistisk design";

  // Check if seller is logged in
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const isSellerLoggedIn = currentUser && currentUser.id && currentUser.type === 'seller';

  return (
    <section className="relative text-white py-32 md:py-40 overflow-hidden">
      {/* Background image container with overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImageUrl} 
          alt={heroImageAltText} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-800/40 to-slate-700/30"></div>
      </div>
      
      {/* Container for content - centered */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          {isSellerLoggedIn ? (
            <>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight text-white font-lato tracking-wide">
                Velkommen tilbage!
              </h1>
              
              <p className="text-xl md:text-2xl text-green-100 mb-8 leading-relaxed font-medium max-w-2xl mx-auto">
                Fortsæt med at administrere din sag og følg dine tilbud
              </p>
              
              <p className="text-lg md:text-xl text-slate-100 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
                Du kan følge status på dit boligsalg og se tilbud fra ejendomsmæglere
              </p>
              
              <div className="flex justify-center">
                <Link to="/saelger/dashboard">
                  <Button size="lg" className="w-80 h-20 text-xl shadow-xl hover:shadow-2xl transition-all duration-300 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold hover:scale-105 border-2 border-blue-400">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Vend tilbage til Min side
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight text-white font-lato tracking-wide">
                HouseHub – Den smarte vej til din ejendomsmægler
              </h1>
              
              <p className="text-xl md:text-2xl text-green-100 mb-8 leading-relaxed font-medium max-w-2xl mx-auto">
                Få uforpligtende tilbud fra flere ejendomsmæglere – vælg den bedste
              </p>
              
              <p className="text-lg md:text-xl text-slate-100 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
                Vi forbinder boligsælgere med kvalificerede ejendomsmæglere gennem en nem og transparent proces. Find den rette mægler til dit salg.
              </p>
              
              <div className="flex justify-center">
                <div className="relative text-center">
                  <Link to="/saelger/start">
                    <Button size="lg" className="w-80 h-20 text-xl shadow-xl hover:shadow-2xl transition-all duration-300 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold hover:scale-105 border-2 border-blue-400">
                      Kom i gang – Sælg din bolig her
                    </Button>
                  </Link>
                  <div className="mt-4 text-sm font-medium text-green-100 flex items-center justify-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center cursor-help">
                            Fast pris: 500 kr (inkl. moms) - refunderes ved aftale
                            <Info className="h-4 w-4 ml-2 inline" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs bg-slate-800 text-white border-slate-700">
                          <p>Gebyret på 500 kr refunderes fuldt ud, når du indgår en formidlingsaftale med en mægler gennem HouseHub.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
