"use server";

import { connectToDB } from "../database";
import Transaction from "../models/transaction.model";
import { Transaction as TransactionType } from "@/types";

// Create a new transactions
export async function newTransactions(transactions: TransactionType[]) {
  try {
    await connectToDB();

    // Create new documents and save transactions in MongoDB
    await Transaction.create(transactions);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create new transactions: ${error.message}`);
    }
  }
}

// Get transactions with optional filter
export async function getTransactions() {
  try {
    await connectToDB();

    // Find transactions based on the query
    const transactions = await Transaction.find();

    return transactions;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get transactions: ${error.message}`);
    }
  }
}
