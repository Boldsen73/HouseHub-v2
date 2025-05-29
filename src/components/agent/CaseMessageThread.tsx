
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, User, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  sender: 'seller' | 'agent';
  content: string;
  timestamp: string;
  read: boolean;
}

interface CaseMessageThreadProps {
  caseId: number;
  sellerName: string;
  hasUnreadMessages?: boolean;
}

const CaseMessageThread: React.FC<CaseMessageThreadProps> = ({ 
  caseId, 
  sellerName,
  hasUnreadMessages = false 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'seller',
      content: 'Hej! Jeg har et par spørgsmål til jeres tilbud. Kan I fortælle mere om jeres markedsføringsstrategi?',
      timestamp: '2024-01-15T10:30:00',
      read: false
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const unreadCount = messages.filter(m => m.sender === 'seller' && !m.read).length;

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      toast({
        title: "Fejl",
        description: "Beskeden må ikke være tom.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const message: Message = {
        id: messages.length + 1,
        sender: 'agent',
        content: newMessage.trim(),
        timestamp: new Date().toISOString(),
        read: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
      
      toast({
        title: "Besked sendt",
        description: "Dit svar er sendt til sælgeren."
      });
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Der opstod en fejl ved sending af beskeden.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const markAllAsRead = () => {
    setMessages(messages.map(m => ({ 
      ...m, 
      read: true
    })));
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('da-DK', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Beskeder med {sellerName}
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount} ny{unreadCount !== 1 ? 'e' : ''}
              </Badge>
            )}
          </CardTitle>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Marker som læst
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id}>
              <div
                className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.sender === 'agent'
                      ? 'bg-blue-600 text-white'
                      : `bg-gray-100 text-gray-900 ${!message.read ? 'border-l-4 border-blue-500' : ''}`
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-3 w-3" />
                    <span className="text-xs font-medium">
                      {message.sender === 'agent' ? 'Dig' : sellerName}
                    </span>
                    <Clock className="h-3 w-3" />
                    <span className="text-xs opacity-70">
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-3">Svar til sælger</h4>
          <div className="space-y-3">
            <Textarea
              placeholder="Skriv svar her…"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows={3}
              className="resize-none"
            />
            <div className="flex justify-end">
              <Button 
                onClick={handleSendMessage} 
                disabled={isSubmitting || !newMessage.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                Send svar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseMessageThread;
