
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CaseStatus } from '@/types/agent';

interface CaseStatusTabsProps {
  activeTab: CaseStatus;
  onTabChange: (tab: CaseStatus) => void;
  caseCounts: Record<CaseStatus, number>;
  children: React.ReactNode;
}

const CaseStatusTabs: React.FC<CaseStatusTabsProps> = ({
  activeTab,
  onTabChange,
  caseCounts,
  children
}) => {
  return (
    <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as CaseStatus)}>
      <TabsList className="grid w-full grid-cols-4 mb-6">
        <TabsTrigger value="active" className="flex items-center gap-2">
          Aktive sager
          <Badge variant="secondary" className="text-xs">
            {caseCounts.active}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="offer_submitted" className="flex items-center gap-2">
          Afgivne bud
          <Badge variant="secondary" className="text-xs">
            {caseCounts.offer_submitted}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="rejected" className="flex items-center gap-2">
          Afviste sager
          <Badge variant="secondary" className="text-xs">
            {caseCounts.rejected}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="archived" className="flex items-center gap-2">
          Vundne sager
          <Badge variant="secondary" className="text-xs">
            {caseCounts.archived}
          </Badge>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value={activeTab} className="mt-6">
        {children}
      </TabsContent>
    </Tabs>
  );
};

export default CaseStatusTabs;
