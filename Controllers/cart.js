import { Cart } from "../Models/Cart.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, title, price, qty, img } = req.body;
    const userId = req.user._id;
    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });
    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].qty += qty;
      cart.items[itemIndex].price += price * qty;
    } else {
      cart.items.push({ productId, title, price: price * qty, qty, img });
    }
    await cart.save();
    res.json({ message: "product added successfully", success: true, cart });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ message: "no cart found", success: false });
    res.json({ message: "cart fetched", success: true, cart });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ message: "cart not found", success: false });
    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
    await cart.save();
    res.json({ message: "product removed", success: true, cart });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });
    else cart.items = [];
    await cart.save();
    res.json({ message: "cart cleared successfully", success: true });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const decreaseQty = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;
    const { qty } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ message: "cart not found", success: false });
    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
    if (itemIndex === -1) return res.json({ message: "product not found in cart", success: false });
    if (cart.items[itemIndex].qty > qty) {
      const pricePerItem = cart.items[itemIndex].price / cart.items[itemIndex].qty;
      cart.items[itemIndex].qty -= qty;
      cart.items[itemIndex].price -= pricePerItem * qty;
    } else {
      cart.items.splice(itemIndex, 1);
    }
    await cart.save();
    res.json({ message: "quantity updated", success: true, cart });
  } catch (err) {
    res.json({ error: err.message });
  }
};
