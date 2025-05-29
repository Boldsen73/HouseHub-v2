
export type CaseStatus = 'active' | 'offer_submitted' | 'rejected' | 'archived';

export interface AgentCaseFilter {
  status: CaseStatus;
  municipality?: string;
  propertyType?: string;
  priceRange?: {
    min: number;
    max: number;
  };
}

export interface AgentOffer {
  id: number;
  caseId: number;
  valuation: number;
  commission: number;
  marketingBudget: number;
  timeline: string;
  strategy: string;
  message: string;
  marketing: string[];
  submittedAt: string;
  expiresAt?: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface AgentProfile {
  name: string;
  companyName: string;
  logo?: string;
  description: string;
  statistics: {
    avgDiscount: number;
    avgTimeToSell: number;
    winRate: number;
  };
}
