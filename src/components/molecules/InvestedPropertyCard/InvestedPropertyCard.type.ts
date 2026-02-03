export default interface InvestedPropertyCardProps {
  id: string;

  imageUrl: string;
  name: string;
  location: string;
  propertyType: string, 

  tokensOwned: number;
  totalInvestedEth: number;
  currentValueEth: number;
  totalReturnEth: number;
  monthlyIncomeEth: number;
  annualYield: number;

  riskScore: number;
  riskLabel: string;
}
