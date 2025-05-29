
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, CheckCircle, X } from 'lucide-react';

interface EmailNotificationProps {
  show: boolean;
  onClose: () => void;
  emailData: {
    to: string;
    subject: string;
    type: string;
  };
}

const EmailNotification: React.FC<EmailNotificationProps> = ({
  show,
  onClose,
  emailData
}) => {
  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Mail className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-800">Email sendt (simuleret)</span>
              </div>
              <p className="text-sm text-green-700 mb-2">
                <strong>Til:</strong> {emailData.to}
              </p>
              <p className="text-sm text-green-700 mb-2">
                <strong>Emne:</strong> {emailData.subject}
              </p>
              <Badge className="bg-green-100 text-green-800 text-xs">
                {emailData.type}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailNotification;
