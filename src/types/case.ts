
export interface PropertyType {
  id: string;
  name: string;
  basePrice: number;
}

export interface MarketingMethod {
  id: string;
  name: string;
  cost: number;
  included: boolean;
  description?: string;
}

export interface OfferWithMarketing {
  id: number;
  agentName: string;
  agencyName?: string;
  expectedPrice: string;
  priceValue: number;
  commission: string;
  commissionValue: number;
  bindingPeriod: string;
  marketingPackage: string;
  marketingMethods: MarketingMethod[];
  submittedAt: string;
  score: number;
  salesStrategy?: string;
  averageDiscount?: string;
  typicalListingTime?: string;
  localCommissionComparison?: string;
}

export interface SellerQuestion {
  id: number;
  question: string;
  askedAt: string;
  answer?: string;
  answeredAt?: string;
}

export type CaseStatus = 'draft' | 'active' | 'offers_received' | 'broker_selected' | 'completed' | 'withdrawn';

export interface CaseData {
  id: string;
  address: string;
  status: CaseStatus;
  submittedAt?: string;
  selectedBrokerName?: string;
  offers?: OfferWithMarketing[];
  sellerExpectedPrice?: string;
  sellerExpectedTimeframe?: string;
  sellerPriorities?: string[];
}

export interface Case {
  id: number;
  address: string;
  municipality: string;
  type: string;
  size: string;
  price: string;
  priceValue: number;
  rooms: string;
  constructionYear: number;
  description: string;
  status: 'missing_info' | 'waiting_for_offers' | 'offers_received' | 'broker_selected' | 'completed';
  energyLabel: string;
  sellerComments?: string;
  publicValuation?: number | null;
}
