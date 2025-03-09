export function isValidTurkishIdNumber(tcNo: string): boolean {
  if (!/^\d{11}$/.test(tcNo)) return false;

  const digits = tcNo.split("").map(Number);
  if (digits[0] === 0) return false;

  const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
  const evenSum = digits[1] + digits[3] + digits[5] + digits[7];
  const tenthDigit = (oddSum * 7 - evenSum) % 10;

  if (digits[9] !== tenthDigit) return false;

  const eleventhDigit =
    digits.slice(0, 10).reduce((sum, num) => sum + num, 0) % 10;
  return digits[10] === eleventhDigit;
}

export function isValidTurkishPassportNumber(passportNo: string): boolean {
  return /^[ABCEFGHJKLMNPRSTUVWXYZ][0-9]{8}$/i.test(passportNo);
}

export function formatTurkishGsmNumber(phone: string): string | null {
  if (!phone) return null;

  // Remove all non-digit characters
  const digits = phone.replace(/\D+/g, "");

  // Handle different cases
  if (digits.length === 10 && digits.startsWith("5")) {
    // Case: "5XXXXXXXXX" → Convert to "+90XXXXXXXXXX"
    return `+90${digits}`;
  }
  if (digits.length === 11 && digits.startsWith("05")) {
    // Case: "05XXXXXXXXX" → Convert to "+90XXXXXXXXXX"
    return `+90${digits.substring(1)}`;
  }
  if (digits.length === 12 && digits.startsWith("90")) {
    // Case: "90XXXXXXXXXX" → Convert to "+90XXXXXXXXXX"
    return `+${digits}`;
  }
  if (digits.length === 13 && digits.startsWith("+90")) {
    // Case: Already in correct format "+90XXXXXXXXXX"
    return digits;
  }

  return null; // Invalid number
}
