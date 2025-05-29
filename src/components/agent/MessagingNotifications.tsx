
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, MessageSquare, User, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageNotification {
  id: string;
  senderName: string;
  senderType: 'seller' | 'admin';
  caseId: string;
  caseAddress: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface MessagingNotificationsProps {
  className?: string;
}

const MessagingNotifications: React.FC<MessagingNotificationsProps> = ({ className }) => {
  const [notifications, setNotifications] = useState<MessageNotification[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Load notifications from localStorage
    const stored = localStorage.getItem('agent_message_notifications');
    if (stored) {
      setNotifications(JSON.parse(stored));
    } else {
      // Mock some initial notifications
      const mockNotifications: MessageNotification[] = [
        {
          id: '1',
          senderName: 'Jens Hansen',
          senderType: 'seller',
          caseId: 'HH001',
          caseAddress: 'Østerbrogade 123',
          message: 'Hej, jeg har et spørgsmål om jeres markedsføringsstrategi.',
          timestamp: new Date().toISOString(),
          read: false
        },
        {
          id: '2',
          senderName: 'Marie Jensen',
          senderType: 'seller',
          caseId: 'HH002',
          caseAddress: 'Vesterbrogade 45',
          message: 'Kan vi tale om tidsrammen for salget?',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          read: false
        }
      ];
      setNotifications(mockNotifications);
      localStorage.setItem('agent_message_notifications', JSON.stringify(mockNotifications));
    }

    // Listen for new messages from localStorage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'new_agent_message') {
        const newMessage = JSON.parse(e.newValue || '{}');
        const notification: MessageNotification = {
          id: Date.now().toString(),
          senderName: newMessage.senderName || 'Sælger',
          senderType: 'seller',
          caseId: newMessage.caseId || '',
          caseAddress: newMessage.caseAddress || '',
          message: newMessage.message || '',
          timestamp: new Date().toISOString(),
          read: false
        };
        
        setNotifications(prev => [notification, ...prev]);
        localStorage.removeItem('new_agent_message');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;
  const displayNotifications = showAll ? notifications : notifications.slice(0, 3);

  const markAsRead = (id: string) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    localStorage.setItem('agent_message_notifications', JSON.stringify(updated));
  };

  const dismissNotification = (id: string) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    localStorage.setItem('agent_message_notifications', JSON.stringify(updated));
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Nu';
    if (diffMinutes < 60) return `${diffMinutes} min siden`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} timer siden`;
    return date.toLocaleDateString('da-DK');
  };

  if (notifications.length === 0) return null;

  return (
    <Card className={cn("shadow-lg border-l-4 border-l-blue-500", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-600" />
            Nye beskeder
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 hover:text-blue-700"
          >
            {showAll ? 'Vis færre' : 'Vis alle'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {displayNotifications.map((notification) => (
          <div
            key={notification.id}
            className={cn(
              "p-3 rounded-lg border transition-all duration-200 hover:shadow-md",
              notification.read ? "bg-gray-50 border-gray-200" : "bg-blue-50 border-blue-200"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <User className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <span className="font-medium text-sm text-gray-900 truncate">
                    {notification.senderName}
                  </span>
                  <span className="text-xs text-gray-500">
                    • {notification.caseAddress}
                  </span>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                  {notification.message}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {formatTime(notification.timestamp)}
                  </span>
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="text-xs text-blue-600 hover:text-blue-700 h-auto p-1"
                      >
                        Markér som læst
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dismissNotification(notification.id)}
                      className="text-gray-400 hover:text-gray-600 h-auto p-1"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <MessageSquare className="h-4 w-4 text-blue-500" />
              </div>
            </div>
          </div>
        ))}
        
        {notifications.length > 3 && !showAll && (
          <div className="text-center pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAll(true)}
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              Se {notifications.length - 3} flere beskeder
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MessagingNotifications;
