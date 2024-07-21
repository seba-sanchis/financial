import { model, models, Schema, Types } from "mongoose";

const TransactionSchema = new Schema({
  date: {
    type: Date,
    required: [true, "Date is required."],
  },
  category: {
    type: String,
    required: [true, "Category is required."],
  },
  payee: {
    type: String,
    required: [true, "Payee is required."],
  },
  payment: {
    type: String,
    required: [true, "Payment is required."],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required."],
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
