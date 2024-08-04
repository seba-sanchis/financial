"use server";

import { getSession } from "../auth";
import { Transaction } from "@/types";
import { expenses } from "@/constants";
import { formatMonth } from "../utils/formatter";
import { parseAmount, parseDate, parseExpense } from "../utils/parser";

// Function to extract transaction data from the given text
export async function extractTransactions(
  text: string
): Promise<Transaction[]> {
  const { user } = await getSession();

  const accountId = user._id;

  const transactions: Transaction[] = [];

  // Flags to determine the type of transaction
  const payment = text.includes("Comprobante de pago");
  const transfer = text.includes("Comprobante de transferencia");
  const resume = text.includes("RESUMEN DE CUENTA");

  // Check if the text includes "Comprobante de pago"
  if (payment) {
    // Extract the date using the specified regex pattern
    const date = parseDate(
      text,
      /Fecha y hora de pago\s+(\d{2}\/\d{2}\/\d{4})/
    );

    // Extract the amount from the text
    const amount = parseAmount(text)[0];

    // Find the corresponding expense details
    const { category, description, payment } = parseExpense(text, expenses);

    // Add the extracted data to the transactions array
    transactions.push({
      date,
      category,
      description,
      payment,
      amount,
      accountId,
    });
  }
  // Check if the text includes "Comprobante de transferencia"
  else if (transfer) {
    // Extract the date using the specified regex pattern
    const date = parseDate(text, /Fecha de ejecución\s+(\d{2}\/\d{2}\/\d{4})/);

    // Extract the amount from the text
    const amount = parseAmount(text)[0];

    // Find the corresponding expense details
    const { category, description, payment } = parseExpense(text, expenses);

    // Add the extracted data to the transactions array
    transactions.push({
      date,
      category,
      description,
      payment,
      amount,
      accountId,
    });
  }
  // Check if the text includes "RESUMEN DE CUENTA"
  else if (resume) {
    // Extract the date using the specified regex pattern
    const dateMatch = text.match(/VENCIMIENTO\s+(\d{2}\s+\w{3}\s+\d{2})/);

    if (!dateMatch) throw new Error("Date not found");

    const [day, month, year] = dateMatch[1].split(" ");

    // Convert month name to month number
    const monthNumber = formatMonth(month);

    // Format the date in the required format
    const date = new Date(`20${year}-${monthNumber}-${day}`);

    // Iterate over each expense to find matches in the text
    expenses.forEach((expense) => {
      if (text.includes(expense.id)) {
        // Get the amounts related to the expense id
        const amounts = parseAmount(text, expense.id);

        // Add each found amount to the transactions array
        amounts.forEach((amount) => {
          transactions.push({
            date,
            category: expense.category,
            description: expense.description,
            payment: expense.payment,
            amount,
            accountId,
          });
        });
      }
    });
  }

  return transactions;
}
