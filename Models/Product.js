import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  category: { type: String },
  imageUrl: { type: String },
  isFeatured: { type: Boolean, default: false }
});

export const Product = mongoose.model("Product", productSchema);
