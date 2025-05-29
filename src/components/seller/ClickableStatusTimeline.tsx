
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  FileText, 
  Calendar, 
  Users, 
  Eye, 
  UserCheck,
  Clock
} from 'lucide-react';

type TimelineStatus = 'case_created' | 'viewing_scheduled' | 'offers_received' | 'comparing_offers' | 'broker_selected';

interface ClickableStatusTimelineProps {
  currentStatus: TimelineStatus;
}

interface TimelineStep {
  id: TimelineStatus;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  completed: boolean;
  active?: boolean;
}

const ClickableStatusTimeline: React.FC<ClickableStatusTimelineProps> = ({ currentStatus }) => {
  const steps: TimelineStep[] = [
    {
      id: 'case_created',
      title: 'Opret sag',
      icon: FileText,
      description: 'Din boligsag er oprettet og sendt til relevante mæglere',
      completed: true
    },
    {
      id: 'viewing_scheduled',
      title: 'Fremvisning',
      icon: Calendar,
      description: 'Fremvisning af din bolig er planlagt med mæglerne',
      completed: currentStatus === 'viewing_scheduled' || currentStatus === 'offers_received' || currentStatus === 'comparing_offers' || currentStatus === 'broker_selected',
      active: currentStatus === 'viewing_scheduled'
    },
    {
      id: 'offers_received',
      title: 'Tilbud modtages',
      icon: Users,
      description: 'Mæglere har afgivet tilbud på din bolig',
      completed: currentStatus === 'offers_received' || currentStatus === 'comparing_offers' || currentStatus === 'broker_selected',
      active: currentStatus === 'offers_received'
    },
    {
      id: 'comparing_offers',
      title: 'Sammenlign tilbud',
      icon: Eye,
      description: 'Gennemgå og sammenlign de modtagne tilbud fra mæglerne',
      completed: currentStatus === 'comparing_offers' || currentStatus === 'broker_selected',
      active: currentStatus === 'comparing_offers'
    },
    {
      id: 'broker_selected',
      title: 'Vælg mægler',
      icon: UserCheck,
      description: 'Vælg den mægler du ønsker at arbejde med',
      completed: currentStatus === 'broker_selected',
      active: currentStatus === 'broker_selected'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Status tidslinje
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="relative py-4">
            {/* Connection lines - positioned to connect between circles */}
            <div className="absolute top-9 left-0 right-0 flex justify-between px-5">
              {steps.slice(0, -1).map((step, index) => (
                <div 
                  key={`line-${index}`}
                  className={`h-0.5 ${
                    step.completed ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                  style={{ 
                    width: `calc(100% / ${steps.length - 1})`,
                    marginLeft: index === 0 ? '20px' : '0',
                    marginRight: index === steps.length - 2 ? '20px' : '0'
                  }}
                />
              ))}
            </div>
            
            {/* Status circles */}
            <div className="relative z-10 flex justify-between items-center">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className={`
                            flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all bg-white
                            ${step.completed 
                              ? 'border-green-500 text-green-600 shadow-md' 
                              : step.active 
                              ? 'border-blue-500 text-blue-600 animate-pulse shadow-md'
                              : 'border-gray-300 text-gray-400'
                            }
                            hover:scale-110 cursor-pointer
                          `}
                        >
                          <Icon className="h-5 w-5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="max-w-xs">
                          <p className="font-medium">{step.title}</p>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                    <span className="text-xs mt-2 text-center max-w-16">{step.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default ClickableStatusTimeline;
