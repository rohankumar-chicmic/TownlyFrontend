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
  Active = 3,
  Rejected = 4,
  ModificationRequired = 5,
}

export interface PropertyDocument {
  id: number;
  propertyId: string;
  title: string;
  fileName: string;
  documentUrl: string;
}

interface MyPropertyDetailsType {
  id: string;
  name: string;
  description: string | null;
  location: string;
  imageUrl: string | null;
  propertyType: 'Commercial' | 'Residential' | 'Land' | 'Industrial';

  status: PropertyStatus | number | null;
  rejectionReason: string | null;
  canDelete: boolean | null;
  canEditFullProperty: boolean | null;
  canRequestUpdate: boolean | null;
  canResubmit: boolean | null;
  hasPendingUpdateRequest: boolean | null;

  annualYieldPercent: number;
  totalValue: number;
  pricePerUnit: number;
  pricePerUnitEth: number | null;
  rentalIncomeHistory: number | null;

  totalUnits: number;
  availableUnits: number;
  riskScore: number | null;
  demandScore: number | null;

  userInvestedAmountEth?: number | null;
  userInvestmentAmount?: number | null;

  documents: PropertyDocument[] | any;
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
  riskScore: number | null;
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
  fromWalletAddress: string;
  tokens?: number;
}
interface PropertyOfflineDetail {
  propertyName: string;
  description: string;
  location: string;
  propertyType: string;

  documents: {
    documentName: string;
    file: any;
  }[];

  totalPropertyValue: number;
  numberOfShares: number;
  rentalIncome: number;
  expectedAnnualYield: number;

  propertyImage: any;

  id?: string;
  updatedAt: number;
}

enum OfflineTaskType {
  CREATE_PROPERTY = 'CREATE_PROPERTY',
  EDIT_PROPERTY = 'EDIT_PROPERTY',
  RESUBMIT_PROPERTY = 'RESUBMIT_PROPERTY',
  REQUEST_TOKEN = 'REQUEST_TOKEN',
  DELETE_PROPERTY = 'DELETE_PROPERTY',
}

interface OfflineTask {
  id: string;
  type: string;
  status: string;
  payload: string;
  retries: number;
  createdAt: number;
}

export {
  InvestmentCardType,
  MyPropertyDetailsType,
  PropertyDetailsType,
  PropertyPortfolioData,
  PropertyCardProps,
  NotificationItem,
  PropertyOfflineDetail,
  Transaction,
  OfflineTaskType,
  OfflineTask,
};
