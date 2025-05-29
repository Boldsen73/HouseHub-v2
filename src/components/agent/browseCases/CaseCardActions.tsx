
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Undo, Download } from 'lucide-react';
import { CaseStatus } from '@/types/agent';

interface CaseCardActionsProps {
  caseId: number;
  agentStatus: CaseStatus;
  newMessageCount: number;
  onUnrejectCase?: (caseId: number) => void;
  handleDownloadPDF: () => void;
}

const CaseCardActions: React.FC<CaseCardActionsProps> = ({
  caseId,
  agentStatus,
  newMessageCount,
  onUnrejectCase,
  handleDownloadPDF
}) => {
  const handleContactSeller = () => {
    // Navigate to messages page with this case pre-selected
    window.location.href = `/maegler/beskeder?case=${caseId}`;
  };

  return (
    <div className="flex gap-2 pt-2">
      {agentStatus === 'active' && (
        <>
          <Button 
            size="sm" 
            className="flex-1 bg-green-600 hover:bg-green-700"
            onClick={() => window.location.href = `/maegler/sag/${caseId}`}
          >
            Se sag & afgiv tilbud
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={handleContactSeller}
            title="Kontakt sælger"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
        </>
      )}
      
      {agentStatus === 'offer_submitted' && (
        <div className="flex gap-2 w-full">
          <Button 
            size="sm" 
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            onClick={() => window.location.href = `/maegler/sag/${caseId}`}
          >
            Se afgivet tilbud
            {newMessageCount > 0 && (
              <Badge className="ml-2 bg-orange-500 text-white text-xs px-1 py-0">
                {newMessageCount}
              </Badge>
            )}
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={handleDownloadPDF}
            title="Download tilbud som PDF"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {agentStatus === 'rejected' && onUnrejectCase && (
        <Button 
          size="sm" 
          className="flex-1 bg-gray-600 hover:bg-gray-700"
          onClick={() => onUnrejectCase(caseId)}
        >
          <Undo className="h-4 w-4 mr-2" />
          Fortryd afvisning
        </Button>
      )}
      
      {agentStatus === 'archived' && (
        <div className="flex gap-2 w-full">
          <Button 
            size="sm" 
            variant="outline"
            className="flex-1"
            onClick={() => window.location.href = `/maegler/sag/${caseId}`}
          >
            Se vundet sag
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={handleDownloadPDF}
            title="Download tilbud som PDF"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CaseCardActions;
