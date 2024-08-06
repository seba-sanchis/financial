"use server";

import PdfParse from "pdf-parse";
import { getSession } from "../auth";
import { formatMonth } from "../utils";
import { expenses, revenue } from "@/constants";
import { Category, Payment, Transaction, Type } from "@/types";

function parseAmount(text: string, regex: RegExp) {
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

function parseDate(text: string, regex: RegExp): Date {
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

function parseExpense(text: string): {
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

// Parse transaction data from the given text
async function parseTransactions(text: string): Promise<Transaction[]> {
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

// Function to handle the OCR service
export async function parseFile(formData: FormData): Promise<Transaction[]> {
  const transactions = [];

  try {
    // Convert formData entries to an array
    const entries = Array.from(formData.entries());

    // Process each entry
    for (let [key, value] of entries) {
      const file = value as File;

      if (!file) throw new Error("No file found");

      // Convert the file to an ArrayBuffer
      const pdfBuffer = await file.arrayBuffer();

      // Create a Buffer from the ArrayBuffer (required for pdf-parse)
      const dataBuffer = Buffer.from(pdfBuffer);

      // Parse the PDF buffer and extract text
      const data = await PdfParse(dataBuffer);

      // Extract transaction data from the text
      const transaction = await parseTransactions(data.text);

      // Add extracted transactions to the transactions array
      transactions.push(...transaction);
    }

    return transactions;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to process the file: ${error.message}`);
    }
  }

  return transactions;
}
