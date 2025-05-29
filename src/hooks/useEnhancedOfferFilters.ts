
import { useState, useMemo } from 'react';
import type { OfferWithMarketing } from '@/types/case';

export const useEnhancedOfferFilters = (offers: OfferWithMarketing[]) => {
  const [sortBy, setSortBy] = useState<string>('score');
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

    if (filters.commissionRange) {
      switch (filters.commissionRange) {
        case 'under50k':
          filtered = filtered.filter(offer => offer.commissionValue < 50000);
          break;
        case 'under60k':
          filtered = filtered.filter(offer => offer.commissionValue < 60000);
          break;
        case '50k-70k':
          filtered = filtered.filter(offer => offer.commissionValue >= 50000 && offer.commissionValue <= 70000);
          break;
        case 'over70k':
          filtered = filtered.filter(offer => offer.commissionValue > 70000);
          break;
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'score':
          comparison = a.score - b.score;
          break;
        case 'commission':
          comparison = a.commissionValue - b.commissionValue;
          break;
        case 'timeline':
          // Mock timeline data - in real app this would come from offer data
          const aTimeline = 45; // days
          const bTimeline = 50; // days
          comparison = aTimeline - bTimeline;
          break;
        case 'price':
          comparison = a.priceValue - b.priceValue;
          break;
        case 'submittedAt':
          comparison = new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
          break;
        default:
          comparison = 0;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
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
