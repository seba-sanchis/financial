"use server";

import { expenses } from "@/constants";
import {
  convertMonth,
  extractAmount,
  extractDate,
  findExpense,
} from "../utils";

// Function to extract receipt data from the given text
export async function extractReceiptData(text: string): Promise<Receipt[]> {
  const statement: Receipt[] = [];

  // Flags to determine the type of receipt
  const payment = text.includes("Comprobante de pago");
  const transfer = text.includes("Comprobante de transferencia");
  const resume = text.includes("RESUMEN DE CUENTA");

  // Check if the text includes "Comprobante de pago"
  if (payment) {
    // Extract the date using the specified regex pattern
    const date = extractDate(
      text,
      /Fecha y hora de pago\s+(\d{2}\/\d{2}\/\d{4})/
    );

    // Extract the amount from the text
    const amount = extractAmount(text)[0];

    // Find the corresponding expense details
    const { category, payee, payment } = findExpense(text, expenses);

    // Add the extracted data to the statement array
    statement.push({ date, category, payee, payment, amount });
  }
  // Check if the text includes "Comprobante de transferencia"
  else if (transfer) {
    // Extract the date using the specified regex pattern
    const date = extractDate(
      text,
      /Fecha de ejecución\s+(\d{2}\/\d{2}\/\d{4})/
    );

    // Extract the amount from the text
    const amount = extractAmount(text)[0];

    // Find the corresponding expense details
    const { category, payee, payment } = findExpense(text, expenses);

    // Add the extracted data to the statement array
    statement.push({ date, category, payee, payment, amount });
  }
  // Check if the text includes "RESUMEN DE CUENTA"
  else if (resume) {
    // Extract the date using the specified regex pattern
    const dateMatch = text.match(/VENCIMIENTO\s+(\d{2}\s+\w{3}\s+\d{2})/);

    if (!dateMatch) throw new Error("Date not found");

    const [day, month, year] = dateMatch[1].split(" ");

    // Convert month name to month number
    const monthNumber = convertMonth(month);

    // Format the date in the required format
    const date = `20${year}-${monthNumber}-${day}`;

    // Iterate over each expense to find matches in the text
    expenses.forEach((expense) => {
      if (text.includes(expense.id)) {
        // Get the amounts related to the expense id
        const amounts = extractAmount(text, expense.id);

        // Add each found amount to the statement array
        amounts.forEach((amount) => {
          statement.push({
            date,
            category: expense.category,
            payee: expense.payee,
            payment: expense.payment,
            amount,
          });
        });
      }
    });
  }

  return statement;
}
