
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const DiscreetInfoFooter: React.FC = () => {
  return (
    <div className="mt-8 pt-4 border-t border-gray-200">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <AlertTriangle className="h-4 w-4" />
        <span>Du kan ikke trække sagen tilbage efter deadline</span>
      </div>
    </div>
  );
};

export default DiscreetInfoFooter;
