export default interface InvestedPropertyCardProps {
  propertyId: string;
  propertyName: string;
  propertyType: 'Commercial' | 'Residential' | string; // Narrowed to Commercial based on data
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
  riskScore: number; // Based on the 1-10 scale usually seen in Fintech

  // Metadata
  investedAt: string; // ISO 8601 Date String
}
