import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    productName: String,
    price: Number,
    quantity: Number,
    totalAmount: Number,

    address: String,
    phone: String,

    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      required: true,
    },
paymentId: String,        // nanoid generated
    transactionId: String,    // user entered
    paymentStatus: {
      type: String,
      enum: ["Pending", "Confirmed"],
      default: "Pending",
    },

    paymentId: String,        // nanoid generated
    transactionId: String,    // user entered

    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
