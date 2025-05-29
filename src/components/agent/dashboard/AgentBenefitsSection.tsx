
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Target, TrendingUp, Users, Zap } from 'lucide-react';

interface AgentBenefitsSectionProps {
  showBenefits: boolean;
  onToggleBenefits: (show: boolean) => void;
}

const AgentBenefitsSection: React.FC<AgentBenefitsSectionProps> = ({
  showBenefits,
  onToggleBenefits
}) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <Button 
            variant="outline" 
            onClick={() => onToggleBenefits(!showBenefits)}
            className="flex items-center gap-2"
          >
            Sådan fungerer HouseHub
            {showBenefits ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        
        {showBenefits && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="shadow-lg border-0">
              <CardContent className="p-6 text-center">
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Præcis matching</h3>
                <p className="text-gray-600">Få kun relevante sager, der matcher dine specialer og geografiske område.</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg border-0">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Højere succesgradm</h3>
                <p className="text-gray-600">Vind flere sager med vores intelligente budanalyse og markedsdata.</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg border-0">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Direkte kommunikation</h3>
                <p className="text-gray-600">Kommuniker sikkert og effektivt med sælgere gennem vores platform.</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg border-0">
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Hurtig proces</h3>
                <p className="text-gray-600">Spar tid med automatiserede værktøjer og streamlinede arbejdsgange.</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default AgentBenefitsSection;
