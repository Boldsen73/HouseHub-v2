
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Users, UserCheck, UserX, Clock } from 'lucide-react';

interface InvitationStatsProps {
  totalInvited: number;
  totalResponded: number;
  totalRejected: number;
  pendingResponses: number;
}

const InvitationStats: React.FC<InvitationStatsProps> = ({
  totalInvited,
  totalResponded,
  totalRejected,
  pendingResponses
}) => {
  const responseRate = totalInvited > 0 ? (totalResponded / totalInvited) * 100 : 0;
  const rejectionRate = totalInvited > 0 ? (totalRejected / totalInvited) * 100 : 0;
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Mægler Invitationer & Response
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Invited */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalInvited}</p>
            <p className="text-sm text-gray-600">Inviterede mæglere</p>
          </div>
          
          {/* Responded */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{totalResponded}</p>
            <p className="text-sm text-gray-600">Har svaret</p>
            <Badge variant="secondary" className="mt-1">
              {responseRate.toFixed(1)}% response rate
            </Badge>
          </div>
          
          {/* Rejected */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <UserX className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-red-600">{totalRejected}</p>
            <p className="text-sm text-gray-600">Afvist sagen</p>
            <Badge variant="destructive" className="mt-1">
              {rejectionRate.toFixed(1)}% afvisning
            </Badge>
          </div>
          
          {/* Pending */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-600">{pendingResponses}</p>
            <p className="text-sm text-gray-600">Venter på svar</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Response Progress</span>
            <span>{totalResponded + totalRejected}/{totalInvited}</span>
          </div>
          <Progress 
            value={((totalResponded + totalRejected) / totalInvited) * 100} 
            className="h-2"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default InvitationStats;
