export interface DocumentFile {
  name: string;
  uri?: string;
  type?: string;
  size?: number;
}

export interface Step1FormData {
  propertyName: string;
  description: string;
  location: string;
  propertyType: string;
  documents: {
    documentName: string;
    file: DocumentFile | null;
  }[];
}

export interface Step2FormData {
  totalPropertyValue: number | undefined;
  numberOfShares: number | undefined;
  rentalIncome: number | undefined;
  expectedAnnualYield: number | undefined;
}

export interface NFTFormData extends Step1FormData, Step2FormData {
  pricePerUnit: number;
  propertyImage: DocumentFile | null;
}
