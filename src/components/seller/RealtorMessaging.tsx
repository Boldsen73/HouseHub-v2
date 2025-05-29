
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, User } from 'lucide-react';

interface Message {
  id: number;
  sender: 'seller' | 'realtor';
  content: string;
  timestamp: string;
  read: boolean;
}

interface RealtorMessagingProps {
  realtorName: string;
  realtorId: number;
  hasNewMessages?: boolean;
  onSendMessage: (message: string, realtorId: number) => void;
}

const RealtorMessaging: React.FC<RealtorMessagingProps> = ({
  realtorName,
  realtorId,
  hasNewMessages = false,
  onSendMessage
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'realtor',
      content: 'Tak for dit tilbud. Jeg har stor erfaring med salg i området og ser frem til at hjælpe dig.',
      timestamp: '2024-01-15T10:30:00',
      read: true
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: 'seller',
        content: newMessage,
        timestamp: new Date().toISOString(),
        read: true
      };
      setMessages([...messages, message]);
      onSendMessage(newMessage, realtorId);
      setNewMessage('');
    }
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
    <Card className="mt-4 border-blue-200">
      <CardHeader 
        className="cursor-pointer hover:bg-gray-50" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Besked til {realtorName}
            {hasNewMessages && (
              <Badge variant="destructive" className="text-xs">
                Ny besked
              </Badge>
            )}
          </div>
          <span className="text-xs text-gray-500">
            {isExpanded ? 'Skjul' : 'Vis'}
          </span>
        </CardTitle>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-4">
          {messages.length > 0 && (
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'seller' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      message.sender === 'seller'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex items-center gap-1 mb-1">
                      <User className="h-3 w-3" />
                      <span className="text-xs font-medium">
                        {message.sender === 'seller' ? 'Dig' : realtorName}
                      </span>
                      <span className="text-xs opacity-70">
                        {formatTimestamp(message.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="border-t pt-4">
            <div className="space-y-2">
              <Textarea
                placeholder="Skriv en kommentar til mægleren..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows={3}
                className="resize-none"
              />
              <div className="flex justify-end">
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!newMessage.trim()}
                  size="sm"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default RealtorMessaging;
