
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { 
  FileText, 
  Send, 
  Clock, 
  Eye, 
  UserCheck, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Step {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  status: 'completed' | 'current' | 'upcoming' | 'skipped';
}

interface CaseProgressIndicatorProps {
  currentStatus: 'draft' | 'active' | 'offers_received' | 'broker_selected' | 'completed' | 'withdrawn';
  className?: string;
  compact?: boolean;
}

const CaseProgressIndicator: React.FC<CaseProgressIndicatorProps> = ({ 
  currentStatus, 
  className,
  compact = false 
}) => {
  const getSteps = (status: string): Step[] => {
    const baseSteps: Step[] = [
      { id: 'draft', label: 'Opret sag', icon: FileText, status: 'upcoming' },
      { id: 'sent', label: 'Send til mæglere', icon: Send, status: 'upcoming' },
      { id: 'active', label: 'Afvent tilbud', icon: Clock, status: 'upcoming' },
      { id: 'offers', label: 'Gennemse tilbud', icon: Eye, status: 'upcoming' },
      { id: 'select', label: 'Vælg mægler', icon: UserCheck, status: 'upcoming' },
      { id: 'complete', label: 'Afslut', icon: CheckCircle, status: 'upcoming' }
    ];

    // Handle withdrawn status
    if (status === 'withdrawn') {
      return baseSteps.map((step, index) => ({
        ...step,
        status: index <= 1 ? 'completed' : 'skipped',
        ...(step.id === 'complete' && { 
          label: 'Trukket tilbage', 
          icon: AlertCircle 
        })
      }));
    }

    // Set status based on current position
    const statusMap: { [key: string]: number } = {
      'draft': 0,
      'active': 2,
      'offers_received': 3,
      'broker_selected': 4,
      'completed': 5
    };

    const currentIndex = statusMap[status] || 0;

    return baseSteps.map((step, index) => ({
      ...step,
      status: index < currentIndex ? 'completed' : 
              index === currentIndex ? 'current' : 'upcoming'
    }));
  };

  const steps = getSteps(currentStatus);

  if (compact) {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="flex items-center">
              <div className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-300",
                step.status === 'completed' && "bg-green-500 text-white",
                step.status === 'current' && "bg-blue-500 text-white ring-4 ring-blue-100",
                step.status === 'upcoming' && "bg-gray-200 text-gray-500",
                step.status === 'skipped' && "bg-red-100 text-red-500"
              )}>
                <Icon className="w-4 h-4" />
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  "w-8 h-0.5 mx-2 transition-all duration-300",
                  step.status === 'completed' ? "bg-green-500" : "bg-gray-200"
                )} />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <Card className={cn("", className)}>
      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Sagsforløb</h3>
          <div className="space-y-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex items-center space-x-4">
                  <div className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                    step.status === 'completed' && "bg-green-500 text-white",
                    step.status === 'current' && "bg-blue-500 text-white ring-4 ring-blue-100",
                    step.status === 'upcoming' && "bg-gray-200 text-gray-500",
                    step.status === 'skipped' && "bg-red-100 text-red-500"
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className={cn(
                      "font-medium transition-colors duration-300",
                      step.status === 'completed' && "text-green-700",
                      step.status === 'current' && "text-blue-700",
                      step.status === 'upcoming' && "text-gray-500",
                      step.status === 'skipped' && "text-red-500"
                    )}>
                      {step.label}
                    </p>
                  </div>
                  {step.status === 'completed' && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseProgressIndicator;
