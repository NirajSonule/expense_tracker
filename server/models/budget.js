import mongoose from "mongoose";

// Define the Budget schema and its fields.
const BudgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    frequency: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"],
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Ensure each user has only one budget for a specific category.
BudgetSchema.index(
  {
    userId: 1,
    categoryId: 1,
  },
  {
    unique: true,
  },
);

BudgetSchema.index({ userId, categoryId });

// Create the Budget model from the schema.
const Budget = mongoose.model("Budget", BudgetSchema);

export default Budget;
