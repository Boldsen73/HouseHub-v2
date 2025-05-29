
import { useState } from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import AgentOnboardingModal from '../../components/agent/AgentOnboardingModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const AgentStart = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const navigate = useNavigate();

  const handleOnboardingAccept = () => {
    // Store acceptance in localStorage
    localStorage.setItem('househub_agent_terms_accepted', 'true');
    navigate('/maegler/opret-bruger');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Ejendomsmægler Portal
            </h1>
            <p className="text-xl text-gray-600">
              Find nye kunder og voks din forretning med HouseHub.
            </p>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Kom i gang</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <Button 
                  size="lg" 
                  className="w-full h-16 text-lg"
                  onClick={() => setShowOnboarding(true)}
                >
                  Opret mægler profil
                </Button>
                <p className="text-sm text-gray-500 text-center">
                  Ny hos HouseHub? Opret din profil og få adgang til nye sager
                </p>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <Link to="/maegler/login" className="block">
                  <Button size="lg" variant="outline" className="w-full h-16 text-lg">
                    Log ind
                  </Button>
                </Link>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Har du allerede en profil? Log ind her
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <AgentOnboardingModal 
        open={showOnboarding}
        onOpenChange={setShowOnboarding}
        onAccept={handleOnboardingAccept}
      />
      
      <Footer />
    </div>
  );
};

export default AgentStart;
