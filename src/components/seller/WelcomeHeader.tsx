
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface WelcomeHeaderProps {
  userName: string;
  hasAnyCases: boolean;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ userName, hasAnyCases }) => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Velkommen {userName}
      </h1>
      <p className="text-gray-600 mb-6">
        Din genvej til det bedste mæglermatch
      </p>
      <Link to="/saelger/boligdata">
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          {hasAnyCases ? 'Opret endnu en sag' : 'Opret din første sag'}
        </Button>
      </Link>
    </div>
  );
};

export default WelcomeHeader;
