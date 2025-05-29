
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface MessageThreadProps {
  agentName: string;
  hasNewMessage: boolean;
  showMessages: boolean;
  onToggle: () => void;
}

const MessageThread: React.FC<MessageThreadProps> = ({ 
  agentName, 
  hasNewMessage, 
  showMessages, 
  onToggle 
}) => {
  if (!showMessages) {
    return null;
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h5 className="font-medium text-blue-900">Beskedtråd med {agentName}</h5>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
        >
          {showMessages ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
      
      {hasNewMessage && (
        <div className="bg-white p-3 rounded border-l-4 border-blue-500 mb-3">
          <div className="flex justify-between items-start mb-1">
            <span className="font-medium text-sm">Mægler:</span>
            <span className="text-xs text-gray-500">I dag kl. 14:32</span>
          </div>
          <p className="text-sm text-gray-700">
            Tak for dit spørgsmål om markedsføringen. Jeg kan bekræfte at vi også bruger LinkedIn og lokale Facebook-grupper for målrettet eksponering.
          </p>
        </div>
      )}
      
      <div className="flex gap-2">
        <input 
          type="text" 
          placeholder="Skriv din besked..." 
          className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
        />
        <Button size="sm">Send</Button>
      </div>
    </div>
  );
};

export default MessageThread;
