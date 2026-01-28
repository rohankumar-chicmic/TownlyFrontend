export interface PropertyDetailsType {
  id: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  propertyType: "Residental" | "Commercial"; // Added union type for better safety
  
  // Financial Data
  totalValue: number;
  pricePerUnit: number;
  annualYieldPercent: number;
  
  // Unit Management
  totalUnits: number;
  availableUnits: number;
  
  // Metrics (Handling the nulls from your JSON)
  demandScore: number | null;
  riskScore: number | null;
}