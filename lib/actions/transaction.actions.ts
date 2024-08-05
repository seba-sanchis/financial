"use server";

import { getSession } from "../auth";
import { Category, Payment, Transaction, Type } from "@/types";
import { expenses, revenue } from "@/constants";
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
  const account = text.includes("Últimos movimientos");

  // Check if the text includes "Comprobante de pago"
  if (payment) {
    // Extract the date using the specified regex pattern
    const date = parseDate(
      text,
      /Fecha y hora de pago\s+(\d{2}\/\d{2}\/\d{4})/
    );

    // Extract the amount from the text
    const amount = parseAmount(text, /[$€£]?\s*([\d,.]+)\s/g)[0];

    // Find the corresponding expense details
    const { category, description, payment, type } = parseExpense(text);

    // Add the extracted data to the transactions array
    transactions.push({
      date,
      category,
      description,
      payment,
      amount,
      type,
      accountId,
    });
  }
  // Check if the text includes "Comprobante de transferencia"
  else if (transfer) {
    // Extract the date using the specified regex pattern
    const date = parseDate(text, /Fecha de ejecución\s+(\d{2}\/\d{2}\/\d{4})/);

    // Extract the amount from the text
    const amount = parseAmount(text, /[$€£]?\s*([\d,.]+)\s/g)[0];

    // Find the corresponding expense details
    const { category, description, payment, type } = parseExpense(text);

    // Add the extracted data to the transactions array
    transactions.push({
      date,
      category,
      description,
      payment,
      amount,
      type,
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
        const amounts = parseAmount(
          text,
          new RegExp(`${expense.id}.*?\\s+([$€£]?\\s*[\\d,.]+)\\s`, "g")
        );

        // Add each found amount to the transactions array
        amounts.forEach((amount) => {
          transactions.push({
            date,
            category: expense.category as Category,
            description: expense.description,
            payment: expense.payment as Payment,
            amount,
            type: expense.type as Type,
            accountId,
          });
        });
      }
    });
  } else if (account) {
    // Split the text into lines and filter out the lines with the matching description
    const transactionLines = text
      .split("\n")
      .filter((line) => revenue.some((revenue) => line.includes(revenue.id)));

    transactionLines.forEach((line) => {
      const date = parseDate(line, /^(\d{2}\/\d{2}\/\d{4})/);

      const amountMatch = line.match(/\d{11}\d{8}(\d+\.\d{2})/);

      if (amountMatch) {
        const amount = Number(amountMatch[1]);

        // Iterate over revenue to find the corresponding revenue details
        revenue.forEach((revenue) => {
          if (line.includes(revenue.id)) {
            transactions.push({
              date,
              category: revenue.category as Category,
              description: revenue.description,
              payment: revenue.payment as Payment,
              amount,
              type: revenue.type as Type,
              accountId,
            });
          }
        });
      }
    });
  }

  return transactions;
}
