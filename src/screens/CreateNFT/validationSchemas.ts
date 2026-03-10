import * as yup from 'yup';
import { Step1FormData, DocumentFile } from './types';
import { customParseNumber } from '@utils/utility';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const fileSizeValidation = (fieldName: string) =>
  yup
    .mixed<DocumentFile>()
    .nullable()
    .required(`${fieldName} is required`)
    .test('fileSize', `${fieldName} must be less than 5MB`, value => {
      if (!value || typeof value.size !== 'number') return false;
      return value.size <= MAX_FILE_SIZE;
    });

const cleanString = (field: string, min = 3, max = 100) =>
  yup
    .string()
    .transform(v => (typeof v === 'string' ? v.trim() : v))
    .required(`${field} is required`)
    .min(min, `${field} must be at least ${min} characters`)
    .max(max, `${field} must not exceed ${max} characters`)
    .matches(/[a-zA-Z0-9]/, `${field} cannot contain only symbols`);

export const step1Schema: yup.ObjectSchema<Step1FormData> = yup.object({
  propertyName: cleanString('Property name', 3, 100),

  description: yup
    .string()
    .transform(v => (typeof v === 'string' ? v.trim() : v))
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters'),

  location: cleanString('Location', 3, 120),

  propertyType: yup
    .string()
    .transform(v => (typeof v === 'string' ? v.trim() : v))
    .required('Property type is required'),

  documents: yup
    .array()
    .of(
      yup.object({
        documentName: cleanString('Document name', 2, 80),
        file: fileSizeValidation('Document file'),
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
    .typeError(`${field} must be a valid number`)
    .required(`${field} is required`)
    .integer(`${field} must be a whole number`)
    .test(
      'maxDigits',
      `${field} cannot exceed 10 digits`,
      value =>
        value !== undefined && Number.isFinite(value) && value <= 9999999999,
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

  rentalIncome: yup
    .number()
    .transform(customParseNumber)
    .typeError('Rental income must be a number')
    .required('Rental income is required')
    .min(0, 'Rental income cannot be negative')
    .max(9999999999, 'Rental income cannot exceed 10 digits'),

  expectedAnnualYield: yup
    .number()
    .transform(customParseNumber)
    .typeError('Expected annual yield must be a number')
    .required('Expected annual yield is required')
    .min(0, 'Expected annual yield must be at least 0%')
    .max(100, 'Expected annual yield must be at most 100%'),
});

export const step3Schema = yup.object({
  propertyImage: fileSizeValidation('Property image'),
});

export const fullFormSchema = yup.object({
  ...step1Schema.fields,
  ...step2Schema.fields,
  ...step3Schema.fields,
});
