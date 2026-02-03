export interface DocumentFile {
  name: string;
  uri?: string;
  type?: string;
  size?: number;
}

export interface NFTFormData {
  // Step 1: Property Details
  propertyName: string;
  description: string;
  location: string;
  propertyType: string;

  documents: Array<{
    documentName: string;
    file: DocumentFile | null;
  }>;

  // Step 2: Financial Info
  totalPropertyValue: string;
  numberOfShares: string;
  rentalIncome: string;
  expectedAnnualYield: string;

  // Step 3: Upload Image
  propertyImage: DocumentFile;
}
