// form.type.ts
export interface DocumentFile {
  uri: string;
  name: string;
  type?: string;
  size?: number;
}

export interface KYCFormData {
  fullName: string;
  dateOfBirth: string;
  fullAddress: string;
  documentType: string;
  document: DocumentFile | null;
  selfieUrl: string;
}
