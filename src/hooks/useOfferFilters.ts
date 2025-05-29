
import { useMemo, useState } from 'react';
import type { OfferWithMarketing } from '@/types/case';

export const useOfferFilters = (offers: OfferWithMarketing[]) => {
  const [sortBy, setSortBy] = useState('score');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filters, setFilters] = useState<Record<string, any>>({});

  const filteredAndSortedOffers = useMemo(() => {
    let filtered = [...offers];

    // Apply filters
    if (filters.maxCommission) {
      filtered = filtered.filter(offer => offer.commissionValue <= filters.maxCommission);
    }

    if (filters.minScore) {
      filtered = filtered.filter(offer => offer.score >= filters.minScore);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let valueA: any;
      let valueB: any;

      switch (sortBy) {
        case 'score':
          valueA = a.score;
          valueB = b.score;
          break;
        case 'commission':
          valueA = a.commissionValue;
          valueB = b.commissionValue;
          break;
        case 'price':
          valueA = a.priceValue;
          valueB = b.priceValue;
          break;
        case 'submittedAt':
          valueA = new Date(a.submittedAt);
          valueB = new Date(b.submittedAt);
          break;
        default:
          valueA = a.score;
          valueB = b.score;
      }

      if (sortDirection === 'asc') {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      } else {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      }
    });

    return filtered;
  }, [offers, filters, sortBy, sortDirection]);

  return {
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    filters,
    setFilters,
    filteredAndSortedOffers
  };
};
