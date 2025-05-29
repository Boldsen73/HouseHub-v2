
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface AgentStatusBadgeProps {
  status: 'pending' | 'submitted' | 'won' | 'lost' | 'rejected';
  daysRemaining?: number;
}

const AgentStatusBadge: React.FC<AgentStatusBadgeProps> = ({ status, daysRemaining }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          text: daysRemaining ? `Tilbudsfrist: ${daysRemaining} dage tilbage` : 'Afventer tilbud',
          variant: 'outline' as const,
          className: 'text-blue-600 border-blue-200 bg-blue-50',
          icon: Clock
        };
      case 'submitted':
        return {
          text: 'Tilbud afgivet – afventer svar fra sælger',
          variant: 'outline' as const,
          className: 'text-yellow-600 border-yellow-200 bg-yellow-50',
          icon: AlertCircle
        };
      case 'won':
        return {
          text: 'Sag vundet!',
          variant: 'outline' as const,
          className: 'text-green-600 border-green-200 bg-green-50',
          icon: CheckCircle
        };
      case 'lost':
        return {
          text: 'Sag tabt',
          variant: 'outline' as const,
          className: 'text-gray-600 border-gray-200 bg-gray-50',
          icon: XCircle
        };
      case 'rejected':
        return {
          text: 'Afvist',
          variant: 'outline' as const,
          className: 'text-red-600 border-red-200 bg-red-50',
          icon: XCircle
        };
      default:
        return {
          text: 'Ukendt status',
          variant: 'outline' as const,
          className: 'text-gray-600 border-gray-200 bg-gray-50',
          icon: AlertCircle
        };
    }
  };

  const config = getStatusConfig();
  const StatusIcon = config.icon;

  return (
    <Badge variant={config.variant} className={`${config.className} flex items-center gap-1 text-sm px-3 py-1`}>
      <StatusIcon className="w-4 h-4" />
      {config.text}
    </Badge>
  );
};

export default AgentStatusBadge;
