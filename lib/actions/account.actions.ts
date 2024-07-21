"use server";

import { connectToDB } from "../database";
import Account from "../models/account.model";
import { Account as AccountType } from "@/types";

// Create a new account
export async function newAccount(account: AccountType) {
  try {
    await connectToDB();

    // Create a new document and save account in MongoDB
    const newAccount = await Account.create(account);

    return newAccount;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create a new account: ${error.message}`);
    }
  }
}

// Get account by email
export async function getAccount(email: string) {
  try {
    await connectToDB();

    // Find account with the given email
    const account = await Account.findOne({ email });

    return account;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get account: ${error.message}`);
    }
  }
}
