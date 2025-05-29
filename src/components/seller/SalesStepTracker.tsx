
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Calendar, Users, Award } from 'lucide-react';

interface SalesStepTrackerProps {
  currentStep: 'showing_booked' | 'showing_completed' | 'offers_received' | 'realtor_selected';
  showingDate?: Date;
  offersCount?: number;
  selectedRealtorName?: string;
}

const SalesStepTracker: React.FC<SalesStepTrackerProps> = ({
  currentStep,
  showingDate,
  offersCount,
  selectedRealtorName
}) => {
  const steps = [
    {
      id: 'showing_booked',
      label: 'Fremvisning booket',
      icon: Calendar,
      description: showingDate ? `Planlagt ${showingDate.toLocaleDateString('da-DK')}` : 'Venter på booking'
    },
    {
      id: 'showing_completed',
      label: 'Fremvist',
      icon: CheckCircle,
      description: 'Mæglere har set boligen'
    },
    {
      id: 'offers_received',
      label: 'Tilbud modtaget',
      icon: Users,
      description: offersCount ? `${offersCount} tilbud modtaget` : 'Venter på tilbud'
    },
    {
      id: 'realtor_selected',
      label: 'Mægler valgt',
      icon: Award,
      description: selectedRealtorName ? `${selectedRealtorName} valgt` : 'Vælg din mægler'
    }
  ];

  const getStepStatus = (stepId: string) => {
    const stepOrder = ['showing_booked', 'showing_completed', 'offers_received', 'realtor_selected'];
    const currentIndex = stepOrder.indexOf(currentStep);
    const stepIndex = stepOrder.indexOf(stepId);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <h3 className="font-semibold text-lg mb-4">Salgsproces</h3>
        <div className="space-y-4">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            const IconComponent = step.icon;
            
            return (
              <div key={step.id} className="flex items-center gap-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  status === 'completed' ? 'bg-green-100 text-green-600' :
                  status === 'current' ? 'bg-blue-100 text-blue-600' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <h4 className={`font-medium ${
                      status === 'completed' ? 'text-green-600' :
                      status === 'current' ? 'text-blue-600' :
                      'text-gray-400'
                    }`}>
                      {step.label}
                    </h4>
                    {status === 'completed' && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Gennemført
                      </Badge>
                    )}
                    {status === 'current' && (
                      <Badge className="bg-blue-100 text-blue-700">
                        Aktuel
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`w-px h-8 ml-5 ${
                    status === 'completed' ? 'bg-green-200' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesStepTracker;
