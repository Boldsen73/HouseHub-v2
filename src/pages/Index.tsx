
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import HeroSection from '../components/landing/HeroSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import BenefitsSection from '../components/landing/BenefitsSection';
import StatisticsSection from '../components/landing/StatisticsSection';
import TrustIndicatorsSection from '../components/landing/TrustIndicatorsSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Building } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <HeroSection />
      <HowItWorksSection />
      <BenefitsSection />
      <StatisticsSection />
      <TrustIndicatorsSection />
      <TestimonialsSection />

      {/* Broker signup section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Er du ejendomsmægler?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Tilmeld dig HouseHub og få adgang til nye kunder og salgsmuligheder
            </p>
            <Link to="/maegler/start">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
                <Building className="mr-2 h-5 w-5" />
                Opret mæglerprofil her
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
