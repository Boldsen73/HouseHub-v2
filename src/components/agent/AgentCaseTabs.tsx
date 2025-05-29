
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, XCircle, Trophy } from 'lucide-react';

type CaseStatus = 'active' | 'offer_submitted' | 'rejected' | 'archived';

interface AgentCaseTabsProps {
  activeTab: CaseStatus;
  onTabChange: (tab: CaseStatus) => void;
  caseCounts: Record<CaseStatus, number>;
  children: React.ReactNode;
}

const AgentCaseTabs: React.FC<AgentCaseTabsProps> = ({
  activeTab,
  onTabChange,
  caseCounts,
  children
}) => {
  const tabs = [
    {
      id: 'active' as CaseStatus,
      label: 'Aktive sager',
      icon: Clock,
      count: caseCounts.active,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'offer_submitted' as CaseStatus,
      label: 'Afgivne bud',
      icon: CheckCircle,
      count: caseCounts.offer_submitted,
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 'rejected' as CaseStatus,
      label: 'Afviste sager',
      icon: XCircle,
      count: caseCounts.rejected,
      color: 'bg-red-100 text-red-800'
    },
    {
      id: 'archived' as CaseStatus,
      label: 'Vundne sager',
      icon: Trophy,
      count: caseCounts.archived,
      color: 'bg-green-100 text-green-800'
    }
  ];

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as CaseStatus)}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id} 
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${tab.color}`}
                >
                  {tab.count}
                </Badge>
              </TabsTrigger>
            );
          })}
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          {children}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentCaseTabs;
