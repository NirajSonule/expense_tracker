import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define the User schema and its fields.
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    currency: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// Hash the password before saving a new user or updating a password.
UserSchema.pre("save", async function (next) {
  const user = this;

  // Skip hashing if the password has not been modified.
  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

// Compare a plain-text password with the stored hashed password.
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create the User model from the schema.
const User = mongoose.model("User", UserSchema);

export default User;
