/**
 * Maps raw API error messages/codes to user-friendly display messages.
 * 
 * @param message The raw message or code from the API
 * @returns A formatted, user-friendly string
 */
export const mapApiError = (message: any): string => {
  if (!message) return 'An unexpected error occurred';

  // If message is not a string, try to stringify or return generic error
  const rawMessage = typeof message === 'string' ? message : String(message);

  const errorMappings: Record<string, string> = {
    'account_not_found': 'Account not found. Please register or try another number.',
    'mobile_not_found': 'This mobile number is not registered.',
    'email_not_found': 'This email address is not registered.',
    'invalid_otp': 'The verification code you entered is invalid. Please try again.',
    'otp_not_verified': 'Incorrect verification code. Please check and try again.',
    'otp_expired': 'The verification code has expired. Please request a new one.',
    'user_already_exists': 'An account already exists with these details.',
    'invalid_credentials': 'The details provided are incorrect.',
    'network_error': 'Please check your internet connection and try again.',
    'unauthorized': 'Your session has expired. Please log in again.',
    'not_found': 'We couldn\'t find the requested record. Please try again.',
    'internal_server_error': 'We are experiencing some technical issues. Please try again later.',
  };

  // Clean up the message: trim, lowercase, and remove leading/trailing underscores
  let cleanMessage = rawMessage.trim().toLowerCase();
  cleanMessage = cleanMessage.replace(/^_+|_+$/g, '');

  // Direct match in our specialized mapping
  if (errorMappings[cleanMessage]) {
    return errorMappings[cleanMessage];
  }

  // Handle common patterns like 'User not found' or 'Phone not found'
  if (cleanMessage.includes('not found') || cleanMessage.includes('not_found')) {
    if (cleanMessage.includes('account')) return errorMappings['account_not_found'];
    if (cleanMessage.includes('mobile') || cleanMessage.includes('phone')) return errorMappings['mobile_not_found'];
    if (cleanMessage.includes('email')) return errorMappings['email_not_found'];
    return 'The requested record was not found.';
  }

  // Handle underscore messages generically if no direct match 
  // e.g., 'missing_parameter' -> 'Missing Parameter'
  if (cleanMessage.includes('_')) {
    return cleanMessage
      .split('_')
      .filter(Boolean) // remove empty strings from leading/trailing or multiple underscores
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // If it's just a sentence, return it as is but capitalize first letter
  return rawMessage.charAt(0).toUpperCase() + rawMessage.slice(1);
};

/**
 * Maps technical field names to user-friendly labels.
 * e.g., 's_city' -> 'City', 'b_address' -> 'Address'
 * 
 * @param field The technical field name
 * @returns A formatted label
 */
export const mapFieldLabel = (field: string): string => {
  if (!field) return '';

  // Specific common mappings
  const specificLabels: Record<string, string> = {
    's_address': 'Street Address',
    's_address_2': 'Street Address 2',
    's_zipcode': 'Zip/Postal Code',
    'b_address': 'Billing Street Address',
    'b_address_2': 'Billing Street Address 2',
    'b_zipcode': 'Billing Zip/Postal Code',
    'nt_email_verify': 'Email Verification Status',
  };

  if (specificLabels[field]) return specificLabels[field];

  // Generic cleanup: strip common prefixes s_, b_, nt_
  let cleanField = field.replace(/^(s_|b_|nt_)/, '');

  // Replace underscores with spaces and capitalize
  return cleanField
    .split('_')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};