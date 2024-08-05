"use client";

import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Transaction, Type } from "@/types";
import extractFile from "@/lib/actions/file.actions";

type Props = {
  type: Type;
  setTransactions: Dispatch<SetStateAction<Transaction[]>>;
};

export default function DragAndDrop({ type, setTransactions }: Props) {
  const [error, setError] = useState("");

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

          // Validate transactions before updating state
          const filteredData = data.filter(
            (transaction) => transaction.type === type
          );

          if (filteredData.length < data.length) {
            setError(
              "Some transactions were ignored because they do not match the selected type."
            );
          }

          setTransactions((prevTransactions) => [
            ...prevTransactions,
            ...filteredData,
          ]);
        }
      };

      // Read the file as an ArrayBuffer
      reader.readAsArrayBuffer(file);
    });
  }, []);

  // Set up the dropzone with the onDrop callback
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center text-sm h-[50px] border rounded-lg ${
        isDragActive
          ? "text-[--accent-1] border-[--accent-1] border-dashed bg-[--accent-2]"
          : "text-[oklch(82.96%_0.017_253.92deg)] hover:text-[oklch(65.10%_0.025_260.70deg)] border-transparent shadow-[0_0_0_1px_rgba(65,69,82,.16)] cursor-pointer"
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop files here.</p>
      ) : (
        <p>Drag some files here or click to upload files.</p>
      )}
    </div>
  );
}
