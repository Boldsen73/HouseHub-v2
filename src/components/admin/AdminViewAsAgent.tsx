
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Eye, ArrowLeft, UserCheck } from 'lucide-react';

interface Agent {
  id: number;
  name: string;
  agency: string;
  email: string;
  casesWon: number;
  averageCommission: number;
  responseRate: number;
}

interface AdminViewAsAgentProps {
  onViewAsAgent: (agent: Agent) => void;
  viewingAsAgent: Agent | null;
  onExitView: () => void;
}

const AdminViewAsAgent: React.FC<AdminViewAsAgentProps> = ({
  onViewAsAgent,
  viewingAsAgent,
  onExitView
}) => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>('');

  // Mock agents data
  const agents: Agent[] = [
    {
      id: 1,
      name: 'Maria Hansen',
      agency: 'EDC Aarhus Syd',
      email: 'maria@edc.dk',
      casesWon: 12,
      averageCommission: 62000,
      responseRate: 95
    },
    {
      id: 2,
      name: 'Peter Nielsen',
      agency: 'Danbolig København',
      email: 'peter@danbolig.dk',
      casesWon: 8,
      averageCommission: 58000,
      responseRate: 87
    },
    {
      id: 3,
      name: 'Lars Petersen',
      agency: 'Boligmægleren',
      email: 'lars@boligmaegleren.dk',
      casesWon: 15,
      averageCommission: 65000,
      responseRate: 92
    }
  ];

  const handleViewAsAgent = () => {
    const agent = agents.find(a => a.id === parseInt(selectedAgentId));
    if (agent) {
      onViewAsAgent(agent);
    }
  };

  if (viewingAsAgent) {
    return (
      <Card className="mb-6 border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <Badge className="bg-orange-600 text-white mb-1">
                  Admin-visning
                </Badge>
                <p className="font-medium text-orange-800">
                  Du ser denne side som: {viewingAsAgent.name} ({viewingAsAgent.agency})
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={onExitView}
              className="border-orange-300 text-orange-700 hover:bg-orange-100"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Tilbage til admin
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Vis som mægler
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Vælg mægler
            </label>
            <Select value={selectedAgentId} onValueChange={setSelectedAgentId}>
              <SelectTrigger>
                <SelectValue placeholder="Vælg en mægler at se som..." />
              </SelectTrigger>
              <SelectContent>
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id.toString()}>
                    {agent.name} - {agent.agency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={handleViewAsAgent}
            disabled={!selectedAgentId}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Eye className="w-4 h-4 mr-2" />
            Vis som mægler
          </Button>
        </div>
        
        {selectedAgentId && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            {(() => {
              const agent = agents.find(a => a.id === parseInt(selectedAgentId));
              return agent ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div>
                    <span className="font-medium text-blue-700">Vundne sager:</span>
                    <div className="text-blue-600">{agent.casesWon}</div>
                  </div>
                  <div>
                    <span className="font-medium text-blue-700">Gns. salær:</span>
                    <div className="text-blue-600">{agent.averageCommission.toLocaleString('da-DK')} kr</div>
                  </div>
                  <div>
                    <span className="font-medium text-blue-700">Svarrate:</span>
                    <div className="text-blue-600">{agent.responseRate}%</div>
                  </div>
                  <div>
                    <span className="font-medium text-blue-700">Email:</span>
                    <div className="text-blue-600">{agent.email}</div>
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminViewAsAgent;
