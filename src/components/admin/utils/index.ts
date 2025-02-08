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
