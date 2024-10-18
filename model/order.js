import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  order_id: {
    type: Number,
    required: true,
  },
  order_by: {
    type: String,
    required: true,
  },
  order_date: {
    type: Date,
    default: Date.now,
  },
  total: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered"],
    required: true,
  },
});

const Order = new mongoose.model("Order", orderSchema);
export default Order;
