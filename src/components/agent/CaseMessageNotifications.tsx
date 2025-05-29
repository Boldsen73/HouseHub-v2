
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send, Clock, Archive } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getCaseMessages, sendMessage, TestMessage, getTestCases } from '@/utils/testData';

interface CaseInfo {
  id: string;
  address: string;
  status: 'active' | 'showing_booked' | 'showing_completed' | 'offers_received' | 'realtor_selected' | 'archived' | 'withdrawn';
  sagsnummer: string;
}

const CaseMessageNotifications: React.FC = () => {
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [expandedCase, setExpandedCase] = useState<string | null>(null);
  const [cases, setCases] = useState<CaseInfo[]>([]);
  const [messagesByCaseId, setMessagesByCaseId] = useState<Record<string, TestMessage[]>>({});
  const { toast } = useToast();

  useEffect(() => {
    loadData();
    
    // Poll for new messages every 5 seconds
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadData = () => {
    const allCases = getTestCases();
    const caseInfo: CaseInfo[] = allCases.map(c => ({
      id: c.id,
      address: c.address,
      status: c.status as any,
      sagsnummer: c.sagsnummer
    }));
    setCases(caseInfo);

    // Load messages for each case
    const messagesByCase: Record<string, TestMessage[]> = {};
    allCases.forEach(case_ => {
      const caseMessages = getCaseMessages(case_.id, case_.status === 'archived');
      if (caseMessages.length > 0) {
        messagesByCase[case_.id] = caseMessages;
      }
    });
    setMessagesByCaseId(messagesByCase);
  };

  const getCaseInfo = (caseId: string): CaseInfo | undefined => {
    return cases.find(c => c.id === caseId);
  };

  const isCaseArchived = (caseId: string): boolean => {
    const caseInfo = getCaseInfo(caseId);
    return caseInfo?.status === 'archived' || caseInfo?.status === 'withdrawn';
  };

  const handleSendReply = (caseId: string) => {
    const caseInfo = getCaseInfo(caseId);
    
    if (isCaseArchived(caseId)) {
      toast({
        title: "Sag arkiveret",
        description: "Du kan ikke sende beskeder til en lukket sag.",
        variant: "destructive"
      });
      return;
    }

    const reply = replyText[caseId]?.trim();
    if (!reply) {
      toast({
        title: "Fejl",
        description: "Svaret må ikke være tomt.",
        variant: "destructive"
      });
      return;
    }

    // Send message using the utility function
    sendMessage({
      caseId,
      fromUserId: 'agent-current', // This would be the current agent's ID
      toUserId: 'seller', // This would be the seller's ID for this case
      fromName: 'Mægler',
      toName: 'Sælger',
      message: reply,
      read: true,
      archived: false
    });

    setReplyText(prev => ({ ...prev, [caseId]: '' }));
    loadData(); // Reload to show new message
    
    toast({
      title: "Svar sendt",
      description: "Dit svar er sendt til sælgeren."
    });
  };

  const markAsRead = (caseId: string) => {
    // Mark all unread messages from seller as read
    const messages = getCaseMessages(caseId);
    // This would normally update the read status in the database
    loadData();
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('da-DK', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get all cases that have messages
  const casesWithMessages = Object.keys(messagesByCaseId).map(caseId => ({
    caseId,
    messages: messagesByCaseId[caseId],
    caseInfo: getCaseInfo(caseId)
  })).filter(item => item.caseInfo);

  // Count unread messages from sellers
  const unreadMessages = Object.values(messagesByCaseId)
    .flat()
    .filter(m => !m.read && m.fromName === 'Sælger' && !m.archived);

  if (casesWithMessages.length === 0) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Beskeder fra sælgere
          {unreadMessages.length > 0 && (
            <Badge variant="destructive">
              {unreadMessages.length} nye
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {casesWithMessages.map(({ caseId, messages, caseInfo }) => {
          if (!caseInfo) return null;
          
          const caseUnread = messages.filter(m => !m.read && m.fromName === 'Sælger' && !m.archived).length;
          const isExpanded = expandedCase === caseId;
          const isArchived = isCaseArchived(caseId);
          
          return (
            <Card key={caseId} className={`${caseUnread > 0 ? 'border-blue-300 bg-blue-50' : ''} ${isArchived ? 'border-gray-300 bg-gray-50' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium flex items-center gap-2">
                      {caseInfo.sagsnummer} - {caseInfo.address}
                      {isArchived && (
                        <Badge variant="outline" className="text-xs">
                          <Archive className="h-3 w-3 mr-1" />
                          Arkiveret
                        </Badge>
                      )}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {messages.filter(m => !m.archived).length} besked{messages.filter(m => !m.archived).length !== 1 ? 'er' : ''}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {caseUnread > 0 && (
                      <Badge variant="destructive">
                        {caseUnread} nye
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setExpandedCase(isExpanded ? null : caseId);
                        if (!isExpanded) markAsRead(caseId);
                      }}
                    >
                      {isExpanded ? 'Skjul' : 'Vis beskeder'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              {isExpanded && (
                <CardContent className="pt-0">
                  <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                    {messages
                      .filter(m => !m.archived)
                      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
                      .map((message, index) => (
                        <div 
                          key={message.id || index}
                          className={`p-3 rounded-lg ${
                            message.fromName === 'Sælger' 
                              ? 'bg-gray-100 ml-0 mr-8' 
                              : 'bg-blue-100 ml-8 mr-0'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium">
                              {message.fromName}
                            </span>
                            <Clock className="h-3 w-3 text-gray-500" />
                            <span className="text-xs text-gray-500">
                              {formatTimestamp(message.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm">{message.message}</p>
                        </div>
                      ))}
                  </div>
                  
                  {!isArchived && (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Skriv svar her…"
                        value={replyText[caseId] || ''}
                        onChange={(e) => setReplyText(prev => ({ 
                          ...prev, 
                          [caseId]: e.target.value 
                        }))}
                        rows={3}
                      />
                      <Button
                        onClick={() => handleSendReply(caseId)}
                        disabled={!replyText[caseId]?.trim()}
                        className="w-full"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send svar
                      </Button>
                    </div>
                  )}
                  
                  {isArchived && (
                    <div className="text-center py-4 text-gray-500">
                      <p className="text-sm">Beskeder er arkiveret - du kan ikke sende flere beskeder til denne sag.</p>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default CaseMessageNotifications;
