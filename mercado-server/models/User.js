const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: String, default: "" },
    gender: {
      type: String,
      enum: ["male", "female", "other", ""],
      default: "",
    },
    contactNumber: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["admin", "editor", "user"],
      default: "user",
    },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

userSchema.virtual("type").get(function getType() {
  return this.role;
});

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);
