interface PropertyDetailsType {
  id: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  propertyType: string;
  totalValue: number;
  annualYieldPercent: number;
  pricePerUnitEth: number;

  totalUnits: number;
  availableUnits: number;

  demandScore: number | null;
  riskScore: number | null;

  // User Specific (Nullable until invested)
  tokensOwned: number | null;
  userInvestedAmountEth: number | null;
  userInvestmentAmount: number | null;
}

interface InvestmentCardType {
  propertyId: string;
  propertyName: string;
  location: string;
  propertyImageUrl: string;
  sharesPurchased: number;
  pricePerShareEth: number;
  pricePerShareUsd: number;
  totalAmountUsd: number;
  investedAt: string;
}

interface PropertyPortfolioData {
  propertyId: string;
  propertyName: string;
  propertyType: 'Commercial' | 'Residential' | 'Land' | 'Industrial';
  location: string;
  propertyImageUrl: string;

  // Financial Data (ETH)
  totalInvestedEth: number;
  currentValueEth: number;
  monthlyIncomeEth: number;
  totalReturnEth: number;

  // Financial Data (USD/General)
  totalAmountUsd: number;
  sharesPurchased: number;
  annualYieldPercent: number;
  riskScore: number;

  // Metadata
  investedAt: string;
  onClick?: () => void;
}

export enum PropertyStatus {
  Draft = 0,
  Pending = 1,
  Approved = 2,
  Active = 3, // Matches your 'status: 3'
  Rejected = 4,
}

interface MyPropertyDetailsType {
  id: string;
  name: string;
  description: string;
  location: string;
  imageUrl: string;
  propertyType: 'Commercial' | 'Residential' | 'Land';

  // Market Metrics
  annualYieldPercent: number;
  riskScore: number;
  demandScore: number;
  status: PropertyStatus | number;
  rejectionReason: string | null;

  // Inventory & Pricing
  totalUnits: number;
  availableUnits: number;
  totalValue: number;
  pricePerUnit: number;
  pricePerUnitEth: number;

  // User Specific (Nullable until invested)
  userInvestedAmountEth: number | null;
  userInvestmentAmount: number | null;

  //documents
  documents: any;
}

interface PropertyCardProps {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  propertyType: string;
  annualYieldPercent: number;
  approvedValuation: number;
  availableUnits: number;
  totalUnits: number;
  riskScore: number;
  pricePerUnitEth: number;
  userOwned: boolean | null;
  status: number | null;
  onClick?: () => void;
}

interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  type: number;
  createdAt: string;
  referenceId: string;
}
interface Transaction {
  transactionId: string;
  propertyId: string;
  type: number;
  propertyName: string;
  amountUsd: number;
  currency: string;
  amountEth: number;
  ethAmountAtExecution: number;
  ethUsdRateAtExecution: number;
  status: 'Pending' | 'Completed' | 'Failed';
  createdAt: string;
}

export {
  InvestmentCardType,
  MyPropertyDetailsType,
  PropertyDetailsType,
  PropertyPortfolioData,
  PropertyCardProps,
  NotificationItem,
  Transaction,
};

export enum OfflineTaskType {
  CREATE_PROPERTY = 'CREATE_PROPERTY',
  EDIT_PROPERTY = 'EDIT_PROPERTY',
  RESUBMIT_PROPERTY = 'RESUBMIT_PROPERTY',
}


export interface OfflineTask {
  id: string;
  type: OfflineTaskType;
  payload: any;
  createdAt: number;
}