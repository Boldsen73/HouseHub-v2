
import React from 'react';
import EnhancedOfferFilters from './EnhancedOfferFilters';
import type { OfferWithMarketing } from '@/types/case';

interface OfferFiltersProps {
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

const OfferFilters: React.FC<OfferFiltersProps> = (props) => {
  return <EnhancedOfferFilters {...props} />;
};

export default OfferFilters;
