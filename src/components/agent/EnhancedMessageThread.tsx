
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, User, Check, Clock } from 'lucide-react';

interface Message {
  id: number;
  sender: 'agent' | 'seller';
  content: string;
  timestamp: string;
  read: boolean;
  readAt?: string;
}

interface EnhancedMessageThreadProps {
  caseId: number;
  sellerName: string;
  hasNewMessages?: boolean;
  newMessageCount?: number;
}

const EnhancedMessageThread: React.FC<EnhancedMessageThreadProps> = ({ 
  caseId, 
  sellerName,
  hasNewMessages = false,
  newMessageCount = 0
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'seller',
      content: 'Hej! Jeg har set jeres tilbud og har et par spørgsmål til markedsføringen. Kan I fortælle mere om jeres strategi for sociale medier?',
      timestamp: '2024-01-15T10:30:00',
      read: !hasNewMessages
    },
    {
      id: 2,
      sender: 'agent',
      content: 'Hej! Tak for din besked. Jeg besvarer gerne dine spørgsmål om markedsføringen. Vi bruger både Facebook og Instagram til målrettet eksponering.',
      timestamp: '2024-01-15T11:15:00',
      read: true,
      readAt: '2024-01-15T11:30:00'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const unreadCount = messages.filter(m => m.sender === 'seller' && !m.read).length;

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: 'agent',
        content: newMessage,
        timestamp: new Date().toISOString(),
        read: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const markAllAsRead = () => {
    setMessages(messages.map(m => ({ 
      ...m, 
      read: true,
      readAt: m.sender === 'seller' && !m.read ? new Date().toISOString() : m.readAt
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

  const formatReadTime = (readAt?: string) => {
    if (!readAt) return null;
    return new Date(readAt).toLocaleString('da-DK', {
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
            {(hasNewMessages || unreadCount > 0) && (
              <Badge variant="destructive" className="text-xs animate-pulse">
                {newMessageCount || unreadCount} ny{(newMessageCount || unreadCount) !== 1 ? 'e' : ''}
              </Badge>
            )}
          </CardTitle>
          {(hasNewMessages || unreadCount > 0) && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <Check className="w-4 h-4 mr-2" />
              Marker som læst
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id}>
              <div className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.sender === 'agent'
                      ? 'bg-blue-600 text-white'
                      : `bg-gray-100 text-gray-900 ${!message.read ? 'border-l-4 border-blue-500 bg-blue-50' : ''}`
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-3 w-3" />
                    <span className="text-xs font-medium">
                      {message.sender === 'agent' ? 'Dig' : sellerName}
                    </span>
                    <span className="text-xs opacity-70">
                      {formatTimestamp(message.timestamp)}
                    </span>
                    {message.sender === 'seller' && !message.read && (
                      <Badge variant="destructive" className="text-xs px-1 py-0">NY</Badge>
                    )}
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
              
              {/* Read indicator for seller messages */}
              {message.sender === 'seller' && message.readAt && (
                <div className="flex justify-start mt-1">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Check className="h-3 w-3" />
                    <span>Læst d. {formatReadTime(message.readAt)}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Send className="w-4 h-4" />
            Svar til sælger
          </h4>
          <div className="flex gap-2">
            <Textarea
              placeholder="Skriv din besked til sælgeren..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows={3}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            <Clock className="w-3 h-3 inline mr-1" />
            Sælgeren får besked med det samme
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedMessageThread;
