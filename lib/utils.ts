export function extractDate(text: string, regex: RegExp): string {
  // Use the regular expression to match the date pattern in the text
  const dateMatch = text.match(regex);

  // Throw an error if the date pattern is not found
  if (!dateMatch) throw new Error("Date not found");

  // Split the matched date into parts (day, month, year), reverse them to get year-month-day
  const dateParts = dateMatch[1].split("/").reverse();

  // Join the parts with hyphens to format as "yyyy-MM-dd"
  return dateParts.join("-");
}

export function extractAmount(text: string, id?: string) {
  let amounts: number[] = []; // Array to store the extracted amounts
  let regexPattern: RegExp; // Regular expression pattern for matching amounts

  // Determine the regular expression pattern based on whether an id is provided
  if (id) {
    regexPattern = new RegExp(
      `${id}.*?\\s+([$€£]?\\s*[\\d,.]+)\\s`,
      "g" // Adding 'g' flag to find all occurrences
    );
  } else {
    regexPattern = /[$€£]?\s*([\d,.]+)\s/g;
  }

  let amountMatch;
  // Execute the regex pattern on the text to find all matches
  while ((amountMatch = regexPattern.exec(text)) !== null) {
    // Parse the matched amount and convert it to a number
    const amount = parseFloat(
      amountMatch[1].replace("$", "").replace(".", "").replace(",", ".").trim()
    );

    // Add the parsed amount to the amounts array
    amounts.push(amount);
  }

  // Throw an error if no amounts were found
  if (amounts.length === 0) throw new Error("Amount not found");

  return amounts;
}

export function findExpense(
  text: string,
  expenses: any[]
): {
  category: string;
  payee: string;
  payment: string;
} {
  // Find the first expense in the list whose ID is included in the text
  const expense = expenses.find((expense) => text.includes(expense.id));

  // Throw an error if no matching expense ID is found
  if (!expense) throw new Error("Expense id not found");

  // Return the details of the found expense
  return {
    category: expense.category,
    payee: expense.payee,
    payment: expense.payment,
  };
}

export function convertMonth(month: string): string {
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
