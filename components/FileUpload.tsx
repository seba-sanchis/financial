"use client";

import { useDropzone } from "react-dropzone";
import handleOCR from "@/lib/actions/ocr.actions";
import React, { useCallback, useState } from "react";

export default function FileUpload() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);

  // Handle file drop
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const formData = new FormData();

    // Process each file
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      // Event handler for when file reading is aborted
      reader.onabort = () => {
        throw new Error("File reading was aborted");
      };
      // Event handler for when file reading fails
      reader.onerror = () => {
        throw new Error("File reading has failed");
      };
      // Event handler for when file reading is successful
      reader.onload = async () => {
        const binaryStr = reader.result;

        // Append the file to FormData as a Blob
        formData.append(
          "files",
          new Blob([binaryStr as ArrayBuffer], { type: file.type }),
          file.name
        );

        // Check if all files have been appended
        if (formData.getAll("files").length === acceptedFiles.length) {
          const data = await handleOCR(formData);
          setReceipts(data);
        }
      };

      // Read the file as an ArrayBuffer
      reader.readAsArrayBuffer(file);
    });
  }, []);

  // Set up the dropzone with the onDrop callback
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <div>
        {receipts?.map((receipt, index) => (
          <ul key={index}>
            <li>Date: {receipt.date}</li>
            <li>Category: {receipt.category}</li>
            <li>Payee: {receipt.payee}</li>
            <li>Payment: {receipt.payment}</li>
            <li>Amount: {receipt.amount}</li>
          </ul>
        ))}
      </div>
    </>
  );
}
