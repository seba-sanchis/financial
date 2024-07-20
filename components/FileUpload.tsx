"use client";

import handleOCR from "@/lib/actions/ocr.actions";
import { ChangeEvent, FormEvent, useState } from "react";

export default function FileUpload() {
  const [files, setFiles] = useState<File[]>();
  const [receipts, setReceipts] = useState<Receipt[]>();

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) setFiles(Array.from(event.target.files));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!files) throw new Error("No files selected.");

    // Create a FormData object to send the file
    const formData = files.reduce((formData, file, index) => {
      formData.append(`file${index}`, file);
      return formData;
    }, new FormData());

    const data = await handleOCR(formData);

    setReceipts(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">Upload</button>

      <div>
        {receipts?.map((receipt, index) => (
          <div key={index}>
            <h2>----------------------</h2>
            <p>Date: {receipt.date}</p>
            <p>Category: {receipt.category}</p>
            <p>Payment: {receipt.payment}</p>
            <p>Payee: {receipt.payee}</p>
            <p>Amount: {receipt.amount}</p>
            <h2>----------------------</h2>
          </div>
        ))}
      </div>
    </form>
  );
}
