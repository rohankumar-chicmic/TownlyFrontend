// validationSchemas/kycSchema.ts
import * as yup from 'yup';

export const kycSchema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  dateOfBirth: yup.string().required('Date of birth is required'),
  fullAddress: yup.string().required('Address is required'),
  documentType: yup.string().required('Document type is required'),
  document: yup.object().nullable().required('Document is required'),
  selfieUrl: yup.string().required('Selfie is required'),
});
