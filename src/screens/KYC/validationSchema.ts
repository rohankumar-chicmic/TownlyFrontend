import * as yup from 'yup';
import { KYCFormData, DocumentFile } from './form.type';

export const kycSchema: yup.ObjectSchema<KYCFormData> = yup.object({
  fullName: yup.string().required('Full name is required'),

  dateOfBirth: yup
    .string()
    .required('Date of birth is required')
    .test(
      'valid-date',
      'Invalid date',
      value => !!value && !isNaN(Date.parse(value)),
    ),

  fullAddress: yup.string().required('Address is required'),

  documentType: yup.string().required('Document type is required'),

  document: yup
    .mixed<DocumentFile>()
    .nullable()
    .required('Document is required'),

  selfieUrl: yup.string().required('Selfie is required'),
});
