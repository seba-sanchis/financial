"use server";

import PdfParse from "pdf-parse";

import { Transaction } from "@/types";
import { extractTransactions } from "./transaction.actions";

// Function to handle the OCR service
export default async function extractFile(
  formData: FormData
): Promise<Transaction[]> {
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
      const transaction = await extractTransactions(data.text);

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
