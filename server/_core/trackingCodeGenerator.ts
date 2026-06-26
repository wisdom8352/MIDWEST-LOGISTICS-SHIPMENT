/**
 * Generate a unique tracking code with MWL prefix
 * Format: MWL-XXXXXXXXXX (where X is alphanumeric)
 */
export function generateTrackingCode(): string {
  // Generate 9 random characters (numbers and uppercase letters)
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < 9; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `MWL-${code}`;
}

/**
 * Validate a tracking code format
 */
export function isValidTrackingCode(code: string): boolean {
  return /^MWL-[A-Z0-9]{9}$/.test(code);
}
