import * as yup from 'yup';

export const step1Schema = yup.object().shape({
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
  
  propertyType: yup
    .string()
    .required('Property type is required'),
  
  documents: yup
    .array()
    .of(
      yup.object().shape({
        documentName: yup.string().required('Document name is required'),
        file: yup.mixed().required('Document file is required').nullable(),
      })
    )
    .min(1, 'At least one document is required')
    .max(3, 'Maximum 3 documents allowed')
    .required('Documents are required'),
});

export const step2Schema = yup.object().shape({
  totalPropertyValue: yup
    .string()
    .required('Total property value is required')
    .test('min-value', 'Total property value must be at least $1000', (value) => {
      const numValue = parseFloat(value?.replace(/[^0-9.]/g, '') || '0');
      return numValue >= 1000;
    }),
  
  numberOfShares: yup
    .string()
    .required('Number of shares is required')
    .test('min-shares', 'Number of shares must be at least 100', (value) => {
      const numValue = parseInt(value?.replace(/[^0-9]/g, '') || '0', 10);
      return numValue >= 100;
    }),
  
  rentalIncome: yup
    .string()
    .required('Rental income is required')
    .test('non-negative', 'Rental income cannot be negative', (value) => {
      const numValue = parseFloat(value?.replace(/[^0-9.]/g, '') || '0');
      return numValue >= 0;
    }),
  
  expectedAnnualYield: yup
    .string()
    .required('Expected annual yield is required')
    .test('valid-percentage', 'Expected annual yield must be between 0 and 100%', (value) => {
      const numValue = parseFloat(value?.replace(/[^0-9.]/g, '') || '0');
      return numValue >= 0 && numValue <= 100;
    }),
});

export const step3Schema = yup.object().shape({
  propertyImage: yup
    .mixed()
    .required('Property image is required')
    .nullable(),
});

export const fullFormSchema = yup.object().shape({
  ...step1Schema.fields,
  ...step2Schema.fields,
  ...step3Schema.fields,
});