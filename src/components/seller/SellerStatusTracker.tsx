
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface SellerStatusTrackerProps {
  totalInvited: number;
  totalResponded: number;
  totalRejected: number;
  totalOffers: number;
  status: string;
}

const SellerStatusTracker: React.FC<SellerStatusTrackerProps> = ({
  totalInvited,
  totalResponded,
  totalRejected,
  totalOffers,
  status
}) => {
  const pendingResponses = totalInvited - totalResponded;
  const allResponded = totalResponded === totalInvited;

  const getStatusInfo = () => {
    if (allResponded && totalOffers > 0) {
      return {
        icon: CheckCircle,
        text: "Tilbud modtaget",
        color: "text-green-600",
        bgColor: "bg-green-100",
        borderColor: "border-green-200"
      };
    } else if (totalOffers > 0) {
      return {
        icon: Clock,
        text: "Afventer flere tilbud",
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
        borderColor: "border-yellow-200"
      };
    } else {
      return {
        icon: AlertCircle,
        text: "Afventer svar",
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        borderColor: "border-blue-200"
      };
    }
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  return (
    <Card className={`${statusInfo.borderColor} border-2`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <StatusIcon className={`w-5 h-5 ${statusInfo.color}`} />
          Status for din sag
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`p-4 rounded-lg ${statusInfo.bgColor}`}>
          <div className="flex items-center justify-between">
            <span className={`font-medium ${statusInfo.color}`}>{statusInfo.text}</span>
            <Badge 
              variant="outline" 
              className={`${statusInfo.color} ${statusInfo.borderColor}`}
            >
              {allResponded ? 'Komplet' : 'Igangværende'}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="w-4 h-4 text-gray-600" />
              <span className="text-2xl font-bold text-gray-900">{totalInvited}</span>
            </div>
            <p className="text-sm text-gray-600">Mæglere kontaktet</p>
          </div>
          
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">{totalOffers}</span>
            </div>
            <p className="text-sm text-gray-600">Tilbud modtaget</p>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-200">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {totalOffers} har afgivet bud, {totalRejected} har afvist
            </span>
            {pendingResponses > 0 && (
              <span className="text-blue-600 font-medium">
                {pendingResponses} afventer svar
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SellerStatusTracker;
