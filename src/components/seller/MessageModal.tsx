
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send } from 'lucide-react';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentName: string;
  onSendMessage: (message: string) => void;
}

const MessageModal: React.FC<MessageModalProps> = ({
  isOpen,
  onClose,
  agentName,
  onSendMessage
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send besked til {agentName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="message">Din besked</Label>
            <Textarea
              id="message"
              placeholder="Skriv din besked her..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>
              Annuller
            </Button>
            <Button onClick={handleSend} disabled={!message.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Send besked
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageModal;
