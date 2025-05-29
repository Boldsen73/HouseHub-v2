
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CheckCircle, X, Clock } from 'lucide-react';

interface AgentActivitySummaryProps {
  agentsContacted: number;
  agentsResponded: number;
  agentsRejected: number;
  agentsPending: number;
}

const AgentActivitySummary: React.FC<AgentActivitySummaryProps> = ({
  agentsContacted,
  agentsResponded,
  agentsRejected,
  agentsPending
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Mægleraktivitet
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{agentsContacted}</div>
            <div className="text-sm text-gray-600">Mæglere kontaktet</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{agentsResponded}</div>
            <div className="text-sm text-gray-600">Har afgivet tilbud</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{agentsRejected}</div>
            <div className="text-sm text-gray-600">Har afvist</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{agentsPending}</div>
            <div className="text-sm text-gray-600">Afventer svar</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentActivitySummary;
