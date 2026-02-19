const customParseNumber = (value: any, originalValue: any) => {
  // If the original value is empty string, null, or undefined, return undefined
  if (
    originalValue === '' ||
    originalValue === null ||
    originalValue === undefined
  ) {
    return undefined;
  }

  // Parse the number
  const parsed = Number(originalValue);

  // Return undefined if it's NaN, otherwise return the parsed number
  return isNaN(parsed) ? undefined : parsed;
};

export default customParseNumber;
