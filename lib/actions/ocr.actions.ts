"use server";

import { getTextFromPDF } from "./files.actions";
import { extractReceiptData } from "./receipts.actions";

// Function to handle the OCR service
export default async function handleOCR(
  formData: FormData
): Promise<Receipt[]> {
  const receipts = [];

  try {
    // Convert formData entries to an array
    const entries = Array.from(formData.entries());

    // Process each entry
    for (let [key, value] of entries) {
      const file = value as File;

      if (!file) throw new Error("No file found");

      // Extract text from the PDF file
      const text = await getTextFromPDF(file);

      // Extract receipt data from the text
      const receipt = await extractReceiptData(text);

      // Add extracted receipts to the receipts array
      receipts.push(...receipt);
    }

    return receipts;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to process the file: ${error.message}`);
    }
  }

  return receipts;
}
