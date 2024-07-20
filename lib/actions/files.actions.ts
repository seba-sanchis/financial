"use server";

import PdfParse from "pdf-parse";

export async function getTextFromPDF(file: File): Promise<string> {
  // Convert the file to an ArrayBuffer
  const pdfBuffer = await file.arrayBuffer();

  // Create a Buffer from the ArrayBuffer (required for pdf-parse)
  const dataBuffer = Buffer.from(pdfBuffer);

  // Parse the PDF buffer and extract text
  const data = await PdfParse(dataBuffer);

  // Return the extracted text content
  return data.text;
}
