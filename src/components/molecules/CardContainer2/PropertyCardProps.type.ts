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
  description?: string;
  userOwned?: boolean;
  status?: number;
}

export default PropertyCardProps;
