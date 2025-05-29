
import React from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle, MessageSquare } from 'lucide-react';
import QuickActionsGrid from './QuickActionsGrid';

const HelpAndActions: React.FC = () => {
  return (
    <>
      {/* Quick Actions */}
      <QuickActionsGrid />

      {/* Help and Feedback Section */}
      <div className="flex justify-center gap-4 mb-6">
        <Button variant="outline" className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4" />
          Hvordan fungerer det?
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Har du forslag? Klik her
        </Button>
      </div>
    </>
  );
};

export default HelpAndActions;
