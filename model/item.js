import mongoose from "mongoose";

export const itemSchema = new mongoose.Schema({
  item_id: {
    type: mongoose.Types.ObjectId,
    ref: "Item",
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const Item = new mongoose.model("Item", itemSchema);
export default Item;
