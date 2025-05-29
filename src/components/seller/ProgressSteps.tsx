
import React from 'react';
import { Check, Clock, Users, CheckCircle } from 'lucide-react';

interface ProgressStepsProps {
  currentStep: 'data_entered' | 'sent_to_agents' | 'offers_received' | 'agent_selected';
  agentsContacted: number;
  agentsResponded: number;
  agentsRejected: number;
  agentsPending: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ 
  currentStep, 
  agentsContacted,
  agentsResponded,
  agentsRejected,
  agentsPending 
}) => {
  const steps = [
    { id: 'data_entered', label: 'Oplysninger sendt', icon: CheckCircle },
    { id: 'sent_to_agents', label: 'Tilbud indhentes', icon: Users },
    { id: 'offers_received', label: 'Tilbud modtaget', icon: Clock },
    { id: 'agent_selected', label: 'Mægler valgt', icon: Check }
  ];

  const getStepIndex = (stepId: string) => steps.findIndex(step => step.id === stepId);
  const currentStepIndex = getStepIndex(currentStep);

  const getStepStatus = (index: number) => {
    if (index < currentStepIndex) return 'completed';
    if (index === currentStepIndex) {
      // Special logic for "offers_received" step
      if (currentStep === 'offers_received' && agentsPending > 0) {
        return 'current'; // Don't mark as completed while agents are still pending
      }
      return 'current';
    }
    return 'pending';
  };

  const getStepStyling = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          bg: 'bg-green-600',
          text: 'text-white',
          label: 'text-green-600'
        };
      case 'current':
        return {
          bg: 'bg-blue-600',
          text: 'text-white',
          label: 'text-blue-600'
        };
      default:
        return {
          bg: 'bg-gray-200',
          text: 'text-gray-500',
          label: 'text-gray-500'
        };
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        Din rejse med HouseHub
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const styling = getStepStyling(status);
          const StepIcon = step.icon;
          
          return (
            <div key={step.id} className="text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${styling.bg}`}>
                {status === 'completed' ? (
                  <Check className="w-6 h-6 text-white" />
                ) : (
                  <StepIcon className={`w-6 h-6 ${styling.text}`} />
                )}
              </div>
              <h3 className={`font-medium mb-1 ${styling.label}`}>
                {step.label}
              </h3>
              <div className={`w-2 h-2 rounded-full mx-auto ${styling.bg}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressSteps;
