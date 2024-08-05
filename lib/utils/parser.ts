import { expenses } from "@/constants";
import { Category, Payment, Type } from "@/types";

export function parseAmount(text: string, regex: RegExp) {
  let amounts: number[] = []; // Array to store the extracted amounts

  let amountMatch;
  // Execute the regex pattern on the text to find all matches
  while ((amountMatch = regex.exec(text)) !== null) {
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

export function parseDate(text: string, regex: RegExp): Date {
  // Use the regular expression to match the date pattern in the text
  const dateMatch = text.match(regex);

  // Throw an error if the date pattern is not found
  if (!dateMatch) throw new Error("Date not found");

  // Split the matched date into parts (day, month, year), reverse them to get year-month-day
  const dateParts = dateMatch[1].split("/").reverse();

  // Join the parts with hyphens to format as "yyyy-MM-dd"
  const date = new Date(dateParts.join("-"));
  return date;
}

export function parseExpense(text: string): {
  category: Category;
  description: string;
  payment: Payment;
  type: Type;
} {
  // Find the first expense in the list whose ID is included in the text
  const expense = expenses.find((expense) => text.includes(expense.id));

  // Throw an error if no matching expense ID is found
  if (!expense) throw new Error("Expense id not found");

  // Return the details of the found expense
  return {
    category: expense.category as Category,
    description: expense.description,
    payment: expense.payment as Payment,
    type: expense.type as Type,
  };
}
