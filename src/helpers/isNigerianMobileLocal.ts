/**
 * Nigerian GSM in local 11-digit form (leading 0), e.g. 08031234567.
 * Covers common prefixes (070–090 range mobile segments).
 */
export function isNigerianMobileLocal(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return /^0[789]\d{9}$/.test(digits);
}
