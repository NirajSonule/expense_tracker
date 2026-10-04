import mongoose from "mongoose";

// Define the Transaction schema and its fields.
const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
      index: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    recurringTransactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RecurringTransaction",
      default: null,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      maxlength: 500,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Fetch transactions for a user, sorted by newest first.
TransactionSchema.index({ userId: 1, date: -1 });

// Fetch transactions for a specific account, sorted by newest first.
TransactionSchema.index({ userId: 1, accountId: 1, date: -1 });

// Fetch transactions for a specific category, sorted by newest first.
TransactionSchema.index({ userId: 1, categoryId: 1, date: -1 });

// Create the Transaction model from the schema.
const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
