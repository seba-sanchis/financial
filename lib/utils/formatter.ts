export function formatCategory(category: string): string {
  return category
    .split("_") // Split the category string by underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words back together with spaces
}

export function formatCurrency(
  amount: number,
  currencySymbol: string = "$"
): string {
  return `${currencySymbol}${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatDate(date: Date | string): string {
  // Convert string to Date if necessary
  const dateObj = typeof date === "string" ? new Date(date) : date;

  // Format the date as 'day month year' (e.g., '01 Aug 2024')
  return dateObj.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatMonth(month: string): string {
  const monthMap: { [key: string]: string } = {
    Ene: "01", // January
    Feb: "02", // February
    Mar: "03", // March
    Abr: "04", // April
    May: "05", // May
    Jun: "06", // June
    Jul: "07", // July
    Ago: "08", // August
    Sep: "09", // September
    Oct: "10", // October
    Nov: "11", // November
    Dic: "12", // December
  };

  return monthMap[month]; // Return the numeric month
}

export function formatPayment(paymentMethod: string): string {
  const methodMap: { [key: string]: string } = {
    debit_card: "Debit Card",
    credit_card: "Credit Card",
    bank_transfer: "Bank Transfer",
  };

  return methodMap[paymentMethod] || "Unknown";
}

export function formatRate(rate: number): string {
  return `${rate.toFixed(2)}%`;
}
