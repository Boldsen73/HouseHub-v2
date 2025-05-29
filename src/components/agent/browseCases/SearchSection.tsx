
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Søg efter adresse, kommune eller boligtype..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchSection;
