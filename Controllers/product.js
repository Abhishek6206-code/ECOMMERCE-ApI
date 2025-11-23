import {Product} from "../Models/Product.js";

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, imageUrl, isFeatured } = req.body;
    const newProduct = new Product({ name, description, price, stock, category, imageUrl, isFeatured });
    await newProduct.save();
    res.json({ message: "product added successfully", product: newProduct });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.json({ message: "product not found" });
    res.json(product);
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.json({ message: "product not found" });
    res.json({ message: "product updated", product: updatedProduct });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.json({ message: "product not found" });
    res.json({ message: "product deleted" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const featured = await Product.find({ isFeatured: true });
    res.json(featured);
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const categoryName = req.params.category;
    const products = await Product.find({ category: categoryName });
    res.json(products);
  } catch (err) {
    res.json({ error: err.message });
  }
};


