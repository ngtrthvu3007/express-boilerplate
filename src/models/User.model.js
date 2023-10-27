import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number },
    address: { type: String },
    // you can define more key herer
  },
  {
    timestamps: true,
  }
);
export default User = mongoose.model("User", userSchema);
