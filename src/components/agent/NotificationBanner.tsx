
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, X, AlertTriangle, Calendar, XCircle } from 'lucide-react';

interface Notification {
  id: string;
  type: 'win' | 'loss' | 'case_withdrawn' | 'showing_changed';
  caseNumber: string;
  message: string;
  timestamp: string;
  read: boolean;
  caseId?: string;
  sellerContact?: {
    name: string;
    email: string;
    phone: string;
  };
}

const NotificationBanner: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Load notifications from localStorage
    const stored = localStorage.getItem('agent_notifications');
    if (stored) {
      setNotifications(JSON.parse(stored));
    }

    // Listen for new notifications
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'agent_notifications' && e.newValue) {
        setNotifications(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const markAsRead = (notificationId: string) => {
    const updated = notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    );
    setNotifications(updated);
    localStorage.setItem('agent_notifications', JSON.stringify(updated));
  };

  const removeNotification = (notificationId: string) => {
    const filtered = notifications.filter(n => n.id !== notificationId);
    setNotifications(filtered);
    localStorage.setItem('agent_notifications', JSON.stringify(filtered));
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const visibleNotifications = showAll ? notifications : notifications.slice(0, 3);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'win': return <Bell className="h-4 w-4 text-green-600" />;
      case 'loss': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'case_withdrawn': return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'showing_changed': return <Calendar className="h-4 w-4 text-blue-600" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'win': return 'border-green-200 bg-green-50';
      case 'loss': return 'border-red-200 bg-red-50';
      case 'case_withdrawn': return 'border-orange-200 bg-orange-50';
      case 'showing_changed': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Notifikationer</h3>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {unreadCount} ny{unreadCount !== 1 ? 'e' : ''}
            </Badge>
          )}
        </div>
        {notifications.length > 3 && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Vis færre' : `Vis alle (${notifications.length})`}
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {visibleNotifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`${getNotificationColor(notification.type)} ${!notification.read ? 'border-l-4' : ''}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{notification.caseNumber}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(notification.timestamp).toLocaleString('da-DK')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                    
                    {notification.type === 'win' && notification.sellerContact && (
                      <div className="mt-3 p-3 bg-white rounded border">
                        <h4 className="font-medium text-sm mb-2">Sælger kontaktoplysninger:</h4>
                        <div className="text-sm space-y-1">
                          <p><strong>Navn:</strong> {notification.sellerContact.name}</p>
                          <p><strong>Email:</strong> {notification.sellerContact.email}</p>
                          <p><strong>Telefon:</strong> {notification.sellerContact.phone}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                      className="text-xs"
                    >
                      Marker som læst
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeNotification(notification.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NotificationBanner;
