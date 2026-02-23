interface PropertyDetailsType {
  id: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  propertyType: 'Residental' | 'Commercial'; // Added union type for better safety
  // Financial Data
  totalValue: number;
  annualYieldPercent: number;
  pricePerUnitEth: number;

  // Unit Management
  totalUnits: number;
  availableUnits: number;

  // Metrics (Handling the nulls from your JSON)
  demandScore: number | null;
  riskScore: number | null;
}

interface MyPropertyDetailsType extends PropertyDetailsType{
  status: number
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

// {
//   "id": "25c9d4f8-698b-4d9a-be67-9c41479d6d00",
//   "name": "bn ghjhv jjvc. ghjbc ",
//   "description": "fhbc hkjcd bnkudc hkkbff gjnvfh ",
//   "location": "miami ",
//   "propertyType": "Land",
//   "imageUrl": "https://testing-akshay-cm.s3.eu-south-1.amazonaws.com/_harmanProperties/902ade06-219d-45ff-a88e-98b24f4a26a9.jpg",
//   "totalValue": 1000000.00,
//   "totalUnits": 10000,
//   "pricePerUnit": 100.00,
//   "annualYieldPercent": 10.00,
//   "availableUnits": 10000,
//   "riskScore": null,
//   "demandScore": null,
//   "pricePerUnitEth": 0.05065805,
//   "userInvestmentAmount": null,
//   "userInvestedAmountEth": null
// }


export {InvestmentCardType, MyPropertyDetailsType, PropertyDetailsType}