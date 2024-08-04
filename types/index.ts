import { Types } from "mongoose";

export interface Account {
  _id?: Types.ObjectId;
  email: string;
  password?: string;
  name: string;
  image: string;
  createdAt?: Date;
}

export interface Session {
  user: Account;
}

export interface Transaction {
  _id?: Types.ObjectId;
  accountId?: Types.ObjectId;
  date: Date;
  category: string;
  description: string;
  payment: string;
  amount: number;
}
