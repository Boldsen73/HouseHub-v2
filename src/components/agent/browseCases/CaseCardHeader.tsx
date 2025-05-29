
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, Clock, MessageCircle } from 'lucide-react';
import { CaseStatus } from '@/types/agent';

interface CaseCardHeaderProps {
  address: string;
  agentStatus: CaseStatus;
  timeRemaining?: { text: string; bgColor: string; color: string } | null;
  newMessageCount: number;
}

const CaseCardHeader: React.FC<CaseCardHeaderProps> = ({
  address,
  agentStatus,
  timeRemaining,
  newMessageCount
}) => {
  const getStatusText = () => {
    switch (agentStatus) {
      case 'offer_submitted':
        return "Afventer svar fra sælger";
      case 'rejected':
        return "Sagen afvist";
      case 'archived':
        return "Vundet sag";
      default:
        return "Aktiv sag";
    }
  };

  const getStatusColor = () => {
    switch (agentStatus) {
      case 'offer_submitted':
        return "bg-blue-100 text-blue-800";
      case 'rejected':
        return "bg-red-100 text-red-800";
      case 'archived':
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getBidStatusText = () => {
    switch (agentStatus) {
      case 'offer_submitted':
        return "Tilbud afgivet";
      case 'rejected':
        return "Sagen afvist";
      case 'archived':
        return "Vundet sag";
      default:
        return "Ingen handling";
    }
  };

  const getBidStatusColor = () => {
    switch (agentStatus) {
      case 'offer_submitted':
        return "bg-blue-500 text-white";
      case 'rejected':
        return "bg-red-500 text-white";
      case 'archived':
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <CardHeader className="pb-3">
      <div className="flex justify-between items-start">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Home className="h-5 w-5 text-blue-600" />
          {address}
        </CardTitle>
        <div className="flex flex-col gap-2 items-end">
          <Badge className={getStatusColor()}>
            {getStatusText()}
          </Badge>
          <Badge className={getBidStatusColor()}>
            {getBidStatusText()}
          </Badge>
          {timeRemaining && agentStatus === 'active' && (
            <Badge className={`${timeRemaining.bgColor} ${timeRemaining.color}`}>
              <Clock className="h-3 w-3 mr-1" />
              Tilbudsfrist: {timeRemaining.text}
            </Badge>
          )}
          {newMessageCount > 0 && (
            <Badge className="bg-orange-500 text-white">
              <MessageCircle className="h-3 w-3 mr-1" />
              {newMessageCount} ny besked
            </Badge>
          )}
        </div>
      </div>
    </CardHeader>
  );
};

export default CaseCardHeader;
