
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

interface TimeRemainingBadgeProps {
  daysRemaining: number;
}

const TimeRemainingBadge: React.FC<TimeRemainingBadgeProps> = ({ daysRemaining }) => {
  const isExpired = daysRemaining <= 0;
  
  return (
    <div className="text-center mb-4">
      <Badge 
        variant={isExpired ? "destructive" : "secondary"}
        className={`text-base px-4 py-2 ${isExpired ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}
      >
        <Clock className="w-4 h-4 mr-2" />
        {isExpired 
          ? 'Tilbudsfristen er udløbet' 
          : `${daysRemaining} dage tilbage af tilbudsperioden`
        }
      </Badge>
    </div>
  );
};

export default TimeRemainingBadge;
