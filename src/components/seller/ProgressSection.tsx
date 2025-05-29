
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Users } from 'lucide-react';

interface ProgressSectionProps {
  hasWithdrawnCase: boolean;
  caseWithdrawn: boolean;
  allAgentsResponded: boolean;
}

const ProgressSection: React.FC<ProgressSectionProps> = ({
  hasWithdrawnCase,
  caseWithdrawn,
  allAgentsResponded
}) => {
  if (hasWithdrawnCase || caseWithdrawn) {
    return null;
  }

  return (
    <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-green-700">Fremvisning planlagt</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                allAgentsResponded ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
              }`}>
                {allAgentsResponded ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
              </div>
              <span className={`text-sm font-medium ${
                allAgentsResponded ? 'text-green-700' : 'text-blue-700'
              }`}>
                {allAgentsResponded ? 'Tilbud modtaget' : 'Afventer tilbud'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-gray-600">Vælg mægler</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressSection;
