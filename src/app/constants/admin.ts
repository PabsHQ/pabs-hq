// Admin configuration constants
export const ALLOWED_WALLET_LIST: string[] = [
  // Add authorized wallet addresses here
  // For now, empty array - add specific addresses as needed
];

// Check if wallet is allowed (for now, allow any connected wallet)
export const isWalletAllowed = (address: string | undefined): boolean => {
  if (!address) return false;
  
  // If no specific wallets are configured, allow any connected wallet
  if (ALLOWED_WALLET_LIST.length === 0) {
    return true;
  }
  
  return ALLOWED_WALLET_LIST.includes(address);
};

// Admin configuration
export const ADMIN_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  UPLOAD_TIMEOUT: 30000, // 30 seconds
};
