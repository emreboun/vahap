export const generateUrlSlug = (text: string) => {
  // Reserved characters in URLs (not including unreserved)
  //const reservedCharacters = /[:\/?#@\[\]!$&'()+,;=]/g;
  //const charactersToReplace = /[:\/?#@\[\]!$&'()+,;=. _~-]/g;
  const charactersToReplace = /[:\/?#@\[\]!$&'()+,;=. _~-]/g;
  // Replace all reserved characters with a space
  let formatted = text
    .trim()
    .replace("*", "")
    .replace("_", "")
    .replace("~", "")
    .replace(charactersToReplace, " ");

  // Replace any sequence of spaces with a single hyphen
  formatted = formatted.replace(/\s+/g, "-");
  // Convert Turkish characters to English equivalents
  formatted = formatted
    .replace(/ı/g, "i")
    .replace(/İ/g, "I")
    .replace(/ş/g, "s")
    .replace(/Ş/g, "S")
    .replace(/ğ/g, "g")
    .replace(/Ğ/g, "G")
    .replace(/ü/g, "u")
    .replace(/Ü/g, "U")
    .replace(/ö/g, "o")
    .replace(/Ö/g, "O")
    .replace(/ç/g, "c")
    .replace(/Ç/g, "C");

  if (formatted.length > 0 && formatted[0] && formatted[0] === "-") {
    formatted = formatted.slice(1);
  }

  if (
    formatted.length > 0 &&
    formatted[formatted.length - 1] &&
    formatted[formatted.length - 1] === "-"
  ) {
    formatted = formatted.slice(0, -1);
  }

  // Convert all letters to lowercase
  return formatted.toLowerCase();
};

export const formatText = (text: string) => {
  const formatted = text.trim();

  //formatted = formatted.replace(/\s+/g, " ");
  //formatted = formatted.replace(/\n+/g, "\n");
  console.log(formatted);
  return formatted;
};

export const formatUrl = (text: string) => {
  let formatted = text.trim();

  formatted = formatted.replace(/\s+/g, "");
  //formatted = formatted.replace(/\s/g, "-");
  formatted = formatted.replace(/-+/g, "-");
  formatted = formatted.replace(/\n+/g, "");
  formatted = convertTurkishChars(formatted).toLowerCase();

  return formatted;
};

export const turkish_chars = [
  "ş",
  "Ş",
  "ç",
  "Ç",
  "ı",
  "İ",
  "ö",
  "Ö",
  "ü",
  "Ü",
  "ğ",
  "Ğ",
];

export function isAlphanumeric(str: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(str);
}

export const turkishCharMap: Record<string, string> = {
  ç: "c",
  Ç: "C",
  ğ: "g",
  Ğ: "G",
  ı: "i",
  I: "I",
  i: "i",
  İ: "I",
  ö: "o",
  Ö: "O",
  ş: "s",
  Ş: "S",
  ü: "u",
  Ü: "U",
};

export function convertTurkishChars(text: string): string {
  return text
    .split("")
    .map((char) => turkishCharMap[char] || char)
    .join("");
}
