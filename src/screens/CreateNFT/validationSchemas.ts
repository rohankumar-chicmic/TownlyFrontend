import * as yup from 'yup';
import { Step1FormData, DocumentFile } from './types';
import { customParseNumber } from '@utils/utility';

export const step1Schema: yup.ObjectSchema<Step1FormData> = yup.object({
  propertyName: yup
    .string()
    .required('Property name is required')
    .min(3, 'Property name must be at least 3 characters')
    .max(100, 'Property name must not exceed 100 characters'),

  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters'),

  location: yup
    .string()
    .required('Location is required')
    .min(3, 'Location must be at least 3 characters'),

  propertyType: yup.string().required('Property type is required'),

  documents: yup
    .array()
    .of(
      yup.object({
        documentName: yup.string().required('Document name is required'),

        file: yup
          .mixed<DocumentFile>()
          .nullable()
          .required('Document file is required'),
      }),
    )
    .min(1, 'At least one document is required')
    .max(3, 'Maximum 3 documents allowed')
    .required(),
});

const max10Digits = (field: string) =>
  yup
    .number()
    .transform(customParseNumber)
    .typeError(`${field} must be a number`)
    .required(`${field} is required`)
    .test(
      'maxDigits',
      `${field} cannot exceed 10 digits`,
      value => value !== undefined && value.toString().length <= 10,
    );

export const step2Schema = yup.object({
  totalPropertyValue: max10Digits('Total property value').min(
    1000,
    'Total property value must be at least $1000',
  ),

  numberOfShares: max10Digits('Number of shares').min(
    100,
    'Number of shares must be at least 100',
  ),

  rentalIncome: max10Digits('Rental income').min(
    0,
    'Rental income cannot be negative',
  ),

  expectedAnnualYield: max10Digits('Expected annual yield')
    .min(0, 'Expected annual yield must be at least 0%')
    .max(100, 'Expected annual yield must be at most 100%'),
});

export const step3Schema = yup.object().shape({
  propertyImage: yup.mixed().required('Property image is required').nullable(),
});

export const fullFormSchema = yup.object().shape({
  ...step1Schema.fields,
  ...step2Schema.fields,
  ...step3Schema.fields,
});
