export function getSlug(name: string): string {
  return name
    .toLowerCase() // Convert to lower case
    .replace(/&/g, "-") // Replace '&' with 'and'
    .replace(/[\s\W-]+/g, "-") // Replace spaces, non-word characters and dashes with a single dash
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing dashes
}

export function processName(name: string): string {
  return name.replace("'s ", " ").replace("' ", " ").replace(" Shoes", "");
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
) {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function capitalizeFirstLetter(input: string): string {
  if (!input) return input; // Return input if it's empty or null
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export const turkcetarih_formati = (
  tarih: Date,
  options?: any
  //format: string = "j F Y l"
) => {
  // Function to format Turkish date, adjust as needed
  return formatDate(tarih, undefined, options);
};

export const getTarihYılsız = (format: string, tarih: Date) => {
  // Function to format Turkish date, adjust as needed
  return (
    tarih
      .toLocaleDateString("tr-TR", {
        // Turkish date format
        day: "2-digit",
        month: "long",
        weekday: format.includes("l") ? "long" : undefined,
      })
      .replace(/,.*/, "") +
    " " +
    tarih.toLocaleTimeString("tr-TR")
  );
};

export const formatDate = (
  date: Date,
  locale: string = "tr-TR",
  options?: {
    showDay?: boolean;
    showMonth?: boolean;
    showYear?: boolean;
    showWeekday?: boolean;
    showTime?: boolean;
    order?: ("day" | "month" | "year" | "weekday" | "time")[];
  }
): string => {
  const {
    showDay = true,
    showMonth = true,
    showYear = true,
    showWeekday = false,
    showTime = true,
    order = ["day", "month", "year", "weekday", "time"],
  } = options || {};

  const formatOptions: Intl.DateTimeFormatOptions = {
    day: showDay ? "2-digit" : undefined,
    month: showMonth ? "long" : undefined,
    year: showYear ? "numeric" : undefined,
    weekday: showWeekday ? "long" : undefined,
  };

  const formattedParts: Record<string, string> = {
    day: showDay ? date.toLocaleDateString(locale, { day: "2-digit" }) : "",
    month: showMonth ? date.toLocaleDateString(locale, { month: "long" }) : "",
    year: showYear ? date.toLocaleDateString(locale, { year: "numeric" }) : "",
    weekday: showWeekday
      ? date.toLocaleDateString(locale, { weekday: "long" })
      : "",
    time: showTime ? date.toLocaleTimeString(locale) : "",
  };

  return order
    .map((part) => formattedParts[part])
    .filter(Boolean)
    .join(" ");
};

export function dropProperty<T, K extends keyof T>(
  obj: T,
  prop: K
): Omit<T, K> {
  const { [prop]: _, ...rest } = obj;
  return rest;
}
