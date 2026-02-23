import * as yup from 'yup';

export const kycSchema = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .required('Full name is required')
    .matches(/^[a-zA-Z\s]+$/, 'Full name must contain only letters')
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters'),

  // ✅ Fix: enforce minimum age of 18
  dateOfBirth: yup
    .string()
    .trim()
    .required('Date of birth is required')
    .test('min-age', 'You must be at least 18 years old', value => {
      if (!value) return false;
      const dob = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const hasHadBirthdayThisYear =
        today.getMonth() > dob.getMonth() ||
        (today.getMonth() === dob.getMonth() &&
          today.getDate() >= dob.getDate());
      return age > 18 || (age === 18 && hasHadBirthdayThisYear);
    }),

  fullAddress: yup
    .string()
    .trim()
    .required('Full address is required')
    .min(5, 'Address must be at least 5 characters')
    .max(255, 'Address must not exceed 255 characters'),

  documentType: yup
    .string()
    .trim()
    .required('Document type is required')
    .matches(/^[a-zA-Z\s]+$/, 'Document type must contain only letters')
    .max(50, 'Document type must not exceed 50 characters'),

  document: yup
    .object()
    .shape({
      name: yup.string().required(),
      uri: yup.string().required(),
      type: yup.string().required(),
      size: yup.number().nullable(),
    })
    .required('Document is required'),

  selfieUrl: yup.string().trim().required('Selfie is required'),
});
