
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, User, Check, CheckCheck } from 'lucide-react';

interface Message {
  id: number;
  sender: 'seller' | 'agent';
  content: string;
  timestamp: string;
  read: boolean;
  agentName?: string;
}

interface EnhancedMessageThreadProps {
  agentName: string;
  agentId: number;
  caseId: number;
  hasNewMessages?: boolean;
  onSendMessage: (message: string, agentId: number) => void;
}

const EnhancedMessageThread: React.FC<EnhancedMessageThreadProps> = ({
  agentName,
  agentId,
  caseId,
  hasNewMessages = false,
  onSendMessage
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Load messages from localStorage on component mount
  useEffect(() => {
    const loadMessages = () => {
      const storedMessages = localStorage.getItem(`messages_${caseId}_${agentId}`);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        // Initialize with a sample message
        const initialMessages: Message[] = [
          {
            id: 1,
            sender: 'agent',
            content: 'Tak for dit tilbud. Jeg ser frem til at hjælpe dig med salget af din bolig.',
            timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            read: true,
            agentName: agentName
          }
        ];
        setMessages(initialMessages);
        localStorage.setItem(`messages_${caseId}_${agentId}`, JSON.stringify(initialMessages));
      }
    };

    loadMessages();
  }, [caseId, agentId, agentName]);

  // Listen for new messages from agents
  useEffect(() => {
    const handleStorageChange = () => {
      const agentMessages = localStorage.getItem(`agent_messages_${caseId}_${agentId}`);
      if (agentMessages) {
        const newAgentMessage = JSON.parse(agentMessages);
        const updatedMessages = [...messages, newAgentMessage];
        setMessages(updatedMessages);
        localStorage.setItem(`messages_${caseId}_${agentId}`, JSON.stringify(updatedMessages));
        localStorage.removeItem(`agent_messages_${caseId}_${agentId}`);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [messages, caseId, agentId]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now(),
        sender: 'seller',
        content: newMessage,
        timestamp: new Date().toISOString(),
        read: true
      };
      
      const updatedMessages = [...messages, message];
      setMessages(updatedMessages);
      localStorage.setItem(`messages_${caseId}_${agentId}`, JSON.stringify(updatedMessages));
      
      // Store message for agent to see
      const agentInboxMessage = {
        id: message.id,
        caseId,
        from: 'seller',
        content: newMessage,
        timestamp: message.timestamp,
        read: false
      };
      localStorage.setItem(`seller_message_${caseId}_${agentId}`, JSON.stringify(agentInboxMessage));
      
      onSendMessage(newMessage, agentId);
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

  const markAsRead = (messageId: number) => {
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem(`messages_${caseId}_${agentId}`, JSON.stringify(updatedMessages));
  };

  const unreadCount = messages.filter(msg => msg.sender === 'agent' && !msg.read).length;

  return (
    <Card className="mt-4 border-blue-200">
      <CardHeader 
        className="cursor-pointer hover:bg-gray-50" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Besked til {agentName}
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount} ny{unreadCount > 1 ? 'e' : ''}
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
                  onClick={() => message.sender === 'agent' && !message.read && markAsRead(message.id)}
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
                        {message.sender === 'seller' ? 'Dig' : agentName}
                      </span>
                      <span className="text-xs opacity-70">
                        {formatTimestamp(message.timestamp)}
                      </span>
                      {message.sender === 'seller' && (
                        <div className="flex items-center">
                          {message.read ? (
                            <CheckCheck className="h-3 w-3 text-blue-300" />
                          ) : (
                            <Check className="h-3 w-3 text-blue-300" />
                          )}
                        </div>
                      )}
                    </div>
                    <p className="text-sm">{message.content}</p>
                    {message.sender === 'agent' && !message.read && (
                      <div className="text-xs mt-1 text-blue-600">
                        Ny besked
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="border-t pt-4">
            <div className="space-y-2">
              <Textarea
                placeholder="Skriv en besked til mægleren..."
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

export default EnhancedMessageThread;
