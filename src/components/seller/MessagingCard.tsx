
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  from: 'seller' | 'realtor';
  message: string;
  timestamp: string;
  senderName: string;
  caseId: string;
  realtorId: number;
}

interface MessagingCardProps {
  realtorId: number;
  realtorName: string;
  caseId: string;
}

const MessagingCard: React.FC<MessagingCardProps> = ({ realtorId, realtorName, caseId }) => {
  const { toast } = useToast();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Load messages for this specific case and realtor
    const stored = localStorage.getItem(`messages_${caseId}_${realtorId}`);
    if (stored) {
      setMessages(JSON.parse(stored));
    }
  }, [caseId, realtorId]);

  const saveMessages = (updatedMessages: Message[]) => {
    localStorage.setItem(`messages_${caseId}_${realtorId}`, JSON.stringify(updatedMessages));
    setMessages(updatedMessages);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now(),
        from: 'seller',
        message: newMessage,
        timestamp: new Date().toISOString(),
        senderName: 'Du',
        caseId,
        realtorId
      };
      
      const updatedMessages = [...messages, message];
      saveMessages(updatedMessages);
      setNewMessage('');
      
      // Simulate realtor notification
      setTimeout(() => {
        toast({
          title: "Besked sendt",
          description: `Din besked er sendt til ${realtorName}`,
        });
      }, 500);

      // Simulate auto-reply from realtor after 3 seconds
      setTimeout(() => {
        const realtorReply: Message = {
          id: Date.now() + 1,
          from: 'realtor',
          message: 'Tak for din besked! Jeg vender tilbage med et svar snarest.',
          timestamp: new Date().toISOString(),
          senderName: realtorName,
          caseId,
          realtorId
        };
        const withReply = [...updatedMessages, realtorReply];
        saveMessages(withReply);
      }, 3000);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('da-DK', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <MessageSquare className="h-5 w-5" />
          Besked til {realtorName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-h-60 overflow-y-auto space-y-3 border rounded-lg p-3 bg-gray-50">
          {messages.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              <p>Ingen beskeder endnu</p>
              <p className="text-sm">Start en samtale med mægleren</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.from === 'seller' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.from === 'seller'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <User className="h-3 w-3" />
                    <span className="text-xs font-medium">{msg.senderName}</span>
                    <span className="text-xs opacity-70">{formatTime(msg.timestamp)}</span>
                  </div>
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Skriv din besked til mægleren..."
            className="min-h-[80px]"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="w-full"
          >
            <Send className="h-4 w-4 mr-2" />
            Send besked
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessagingCard;
