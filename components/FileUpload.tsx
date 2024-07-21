"use client";

import { useDropzone } from "react-dropzone";
import React, { useCallback, useState } from "react";

import { Transaction } from "@/types";
import extractFile from "@/lib/actions/file.actions";

export default function FileUpload() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

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
          const data = await extractFile(formData);
          setTransactions(data);
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
        {transactions?.map((transaction, index) => (
          <ul key={index}>
            <li>Date: {transaction.date.toString()}</li>
            <li>Category: {transaction.category}</li>
            <li>Payee: {transaction.payee}</li>
            <li>Payment: {transaction.payment}</li>
            <li>Amount: {transaction.amount}</li>
          </ul>
        ))}
      </div>
    </>
  );
}
