import mongoose from "mongoose";

// Define the Account schema and its fields.
const AccountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    institution: {
      type: String,
      trim: true,
    },
    accountType: {
      type: String,
      enum: ["Bank", "Cash", "Credit", "Investment", "Wallet"],
      default: "Bank",
    },
    balance: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Ensure each user cannot have multiple accounts with the same name.
AccountSchema.index(
  {
    userId: 1,
    name: 1,
  },
  { unique: true },
);

// Create the User model from the schema.
const Account = mongoose.model("Account", AccountSchema);

export default Account;
