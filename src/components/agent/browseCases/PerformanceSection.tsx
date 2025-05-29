
import React from 'react';
import PerformanceDashboard from '@/components/agent/PerformanceDashboard';

interface PerformanceData {
  casesReceived: number;
  bidsSubmitted: number;
  casesWon: number;
  averageCommission: string;
  averageListingTime: string;
  winRate: number;
}

interface PerformanceSectionProps {
  performanceData: PerformanceData;
}

const PerformanceSection: React.FC<PerformanceSectionProps> = ({
  performanceData,
}) => {
  // Only show performance dashboard if there's activity
  if (performanceData.bidsSubmitted === 0 && performanceData.casesReceived === 0) {
    return null;
  }

  return <PerformanceDashboard data={performanceData} />;
};

export default PerformanceSection;
