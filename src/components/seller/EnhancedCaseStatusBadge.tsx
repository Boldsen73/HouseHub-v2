
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Clock, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Eye,
  UserCheck,
  Home
} from 'lucide-react';

interface CaseStatusBadgeProps {
  status: 'draft' | 'active' | 'offers_received' | 'broker_selected' | 'completed' | 'withdrawn';
  className?: string;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig = {
  draft: {
    label: 'Kladde',
    color: 'bg-gray-100 text-gray-700 border-gray-200',
    icon: FileText,
    description: 'Sagen er ikke sendt endnu'
  },
  active: {
    label: 'Venter på tilbud',
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    icon: Clock,
    description: 'Mæglere arbejder på tilbud'
  },
  offers_received: {
    label: 'Tilbud modtaget',
    color: 'bg-green-100 text-green-700 border-green-200',
    icon: Eye,
    description: 'Du har modtaget tilbud fra mæglere'
  },
  broker_selected: {
    label: 'Mægler valgt',
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    icon: UserCheck,
    description: 'Du har valgt en mægler'
  },
  completed: {
    label: 'Afsluttet',
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    icon: CheckCircle,
    description: 'Sagen er færdigbehandlet'
  },
  withdrawn: {
    label: 'Trukket tilbage',
    color: 'bg-red-100 text-red-700 border-red-200',
    icon: AlertCircle,
    description: 'Sagen er trukket tilbage'
  }
};

const EnhancedCaseStatusBadge: React.FC<CaseStatusBadgeProps> = ({ 
  status, 
  className, 
  showIcon = true, 
  size = 'md' 
}) => {
  const config = statusConfig[status];
  const Icon = config.icon;
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };
  
  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  return (
    <Badge 
      className={cn(
        'font-medium border transition-all duration-200 hover:shadow-sm',
        config.color,
        sizeClasses[size],
        className
      )}
      title={config.description}
    >
      {showIcon && <Icon className={cn(iconSizes[size], 'mr-1.5')} />}
      {config.label}
    </Badge>
  );
};

export default EnhancedCaseStatusBadge;
