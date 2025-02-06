

export function getSlug(name: string): string {
  return name
    .toLowerCase() // Convert to lower case
    .replace(/&/g, '-') // Replace '&' with 'and'
    .replace(/[\s\W-]+/g, '-') // Replace spaces, non-word characters and dashes with a single dash
    .replace(/^-+|-+$/g, ''); // Remove leading and trailing dashes
}

export function processName(name: string): string {
  return name
    .replace("'s ", ' ')
    .replace("' ", ' ')
    .replace(" Shoes", '');
}


export function throttle<T extends (...args: any[]) => any>(func: T, limit: number) {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
