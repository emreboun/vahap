export const getNextLinkHref = (
  currentUrl: string,
  urlParam: string
): string => {
  const url = new URL(currentUrl);
  const searchParams = new URLSearchParams(url.search);

  // Add the new URL parameter to the current URL's params
  searchParams.set(urlParam, "newValue");

  // Reconstruct the URL with the updated params
  return `${url.origin}${url.pathname}?${searchParams.toString()}${url.hash}`;
};

export const getUrlSlug = (name: string) => {
  return name.toLowerCase().replace(/ /g, "-");
};

export const decodeUrlParam = (urlParam: string): string => {
  // Decode the percent-encoded URL parameter
  const decodedParam = decodeURIComponent(urlParam);
  return decodedParam;
};
