import mongoose from "mongoose";

// Define the Category schema and its fields.
const CategorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Ensure each user cannot have multiple Category with the same name.
CategorySchema.index(
  {
    userId: 1,
    name: 1,
  },
  { unique: true },
);

// Create the Category model from the schema.
const Category = mongoose.model("Category", CategorySchema);

export default Category;
