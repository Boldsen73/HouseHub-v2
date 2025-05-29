
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import HeaderNavigation from './HeaderNavigation';
import PageHeader from './PageHeader';
import SearchSection from './SearchSection';

interface EmptyStateProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNavigation />

      <div className="container mx-auto px-6 py-12">
        <PageHeader />
        
        <SearchSection 
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
        />
        
        {/* Empty state */}
        <Card className="text-center py-16">
          <CardContent>
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Ingen aktive sager
            </h3>
            <p className="text-gray-600 mb-4">
              Når sælgere opretter sager, vil de blive vist her.
            </p>
            <p className="text-sm text-gray-500">
              Kom tilbage senere for at se nye muligheder.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmptyState;
