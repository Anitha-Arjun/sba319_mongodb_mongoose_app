import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_id: {
    type: Number,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  product_description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    default: 0.0,
  },
});

const Product = new mongoose.model("Product", productSchema);
export default Product;
