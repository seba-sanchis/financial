import { Types } from "mongoose";

export interface Account {
  _id?: Types.ObjectId;
  email: string;
  password?: string;
  name: string;
  image: string;
  createdAt?: Date;
}

export type Category =
  | "healthcare"
  | "home"
  | "insurance"
  | "supermarket"
  | "transportation"
  | "utilities";

export type Payment = "debit_card" | "credit_card" | "bank_transfer";

export interface Session {
  user: Account;
}

export interface Transaction {
  _id?: Types.ObjectId;
  accountId?: Types.ObjectId;
  date: Date;
  category: Category;
  description: string;
  payment: Payment;
  type: Type;
  amount: number;
}

export type Type = "revenue" | "expense";
