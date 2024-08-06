import { model, models, Schema, Types } from "mongoose";

const TransactionSchema = new Schema({
  date: {
    type: Date,
    required: [true, "Date is required."],
  },
  category: {
    type: String,
    enum: [
      "healthcare",
      "home",
      "insurance",
      "supermarket",
      "transportation",
      "utilities",
      "work",
    ],
    required: [true, "Category is required."],
  },
  description: {
    type: String,
    required: [true, "Description is required."],
  },
  payment: {
    type: String,
    enum: ["debit_card", "credit_card", "bank_transfer"],
    required: [true, "Payment is required."],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required."],
  },
  type: {
    type: String,
    enum: ["revenue", "expense"],
    required: [true, "Type is required."],
  },
  accountId: {
    type: Types.ObjectId,
    ref: "Account",
    required: [true, "Account ID is required."],
  },
});

const Transaction =
  models.Transaction || model("Transaction", TransactionSchema);
export default Transaction;
