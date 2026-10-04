import mongoose from "mongoose";

// Define the Recurring Transaction schema and its fields.
const RecurringTransactionSchema = new mongoose.Schema(
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
    name: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    frequency: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"],
      required: true,
      trim: true,
    },
    nextDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Fetch a user's recurring transactions by account and category,
// sorted by the next scheduled date.
RecurringTransactionSchema.index({
  userId: 1,
  accountId: 1,
  categoryId: 1,
  nextDate: -1,
});

// Find pending recurring transactions that are due,
// ordered by their next scheduled date.
RecurringTransactionSchema.index({
  userId: 1,
  status: 1,
  nextDate: 1,
});

// Create the Recurring Transaction model from the schema.
const RecurringTransaction = mongoose.model(
  "RecurringTransaction",
  RecurringTransactionSchema,
);

export default RecurringTransaction;
