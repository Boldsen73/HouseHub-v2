
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Filter, ArrowUpDown, X } from 'lucide-react';
import type { OfferWithMarketing } from '@/types/case';

interface EnhancedOfferFiltersProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  sortDirection: 'asc' | 'desc';
  setSortDirection: (value: 'asc' | 'desc') => void;
  filters: Record<string, any>;
  setFilters: (filters: Record<string, any>) => void;
  offers: OfferWithMarketing[];
  totalCount: number;
  filteredCount: number;
}

const EnhancedOfferFilters: React.FC<EnhancedOfferFiltersProps> = ({
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
  filters,
  setFilters,
  offers,
  totalCount,
  filteredCount
}) => {
  const handleMaxCommissionChange = (value: string) => {
    const numValue = value ? parseInt(value) : undefined;
    setFilters({ ...filters, maxCommission: numValue });
  };

  const clearFilters = () => {
    setFilters({});
  };

  const hasActiveFilters = Object.keys(filters).some(key => filters[key] !== undefined && filters[key] !== '');

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Sortér og filtrer tilbud
          </CardTitle>
          <div className="flex items-center gap-2">
            {filteredCount !== totalCount && (
              <Badge variant="secondary">
                {filteredCount} af {totalCount} tilbud
              </Badge>
            )}
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X className="w-4 h-4 mr-1" />
                Ryd filtre
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Sort By */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Sortér efter
            </label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="score">HouseHub Score</SelectItem>
                <SelectItem value="commission">Laveste salær</SelectItem>
                <SelectItem value="timeline">Kortest liggetid</SelectItem>
                <SelectItem value="price">Højeste pris</SelectItem>
                <SelectItem value="submittedAt">Dato</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Direction */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Rækkefølge
            </label>
            <Button
              variant="outline"
              onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
              className="w-full justify-start"
            >
              <ArrowUpDown className="w-4 h-4 mr-2" />
              {sortDirection === 'asc' ? 'Stigende' : 'Faldende'}
            </Button>
          </div>

          {/* Max Commission Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Max salær (kr)
            </label>
            <Input
              type="number"
              placeholder="fx 60.000"
              value={filters.maxCommission || ''}
              onChange={(e) => handleMaxCommissionChange(e.target.value)}
            />
          </div>

          {/* Min Score Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Min HouseHub Score
            </label>
            <Select 
              value={filters.minScore?.toString() || ''} 
              onValueChange={(value) => setFilters({ ...filters, minScore: value ? parseInt(value) : undefined })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Alle scores" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Alle scores</SelectItem>
                <SelectItem value="90">90+ point</SelectItem>
                <SelectItem value="85">85+ point</SelectItem>
                <SelectItem value="80">80+ point</SelectItem>
                <SelectItem value="70">70+ point</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Commission Interval Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Salær interval
            </label>
            <Select 
              value={filters.commissionRange || ''} 
              onValueChange={(value) => setFilters({ ...filters, commissionRange: value || undefined })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Alle salærer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Alle salærer</SelectItem>
                <SelectItem value="under50k">Under 50.000 kr</SelectItem>
                <SelectItem value="under60k">Under 60.000 kr</SelectItem>
                <SelectItem value="50k-70k">50.000 - 70.000 kr</SelectItem>
                <SelectItem value="over70k">Over 70.000 kr</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700">Aktive filtre:</span>
              {filters.maxCommission && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  Max salær: {filters.maxCommission.toLocaleString('da-DK')} kr
                </Badge>
              )}
              {filters.minScore && (
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Min score: {filters.minScore}+
                </Badge>
              )}
              {filters.commissionRange && (
                <Badge variant="outline" className="bg-purple-50 text-purple-700">
                  Salær: {filters.commissionRange.replace('k', '.000')}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedOfferFilters;
