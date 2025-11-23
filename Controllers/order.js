import { Order } from "../Models/Order.js";
import { Cart } from "../Models/Cart.js";
import { Address } from "../Models/Address.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { addressId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.json({ success: false, message: "Cart is empty" });
    }

    const address = await Address.findById(addressId);
    if (!address) {
      return res.json({ success: false, message: "Address not found" });
    }

    const totalAmount = cart.items.reduce((acc, item) => acc + item.price, 0);

    const newOrder = new Order({
      userId,
      items: cart.items,
      address: {
        fullName: address.fullName,
        phone: address.phone,
        street: address.street,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        country: address.country
      },
      totalAmount
    });

    await newOrder.save();
    cart.items = [];
    await cart.save();

    res.json({ success: true, message: "Order placed successfully", order: newOrder });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

  export const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find().populate("userId", "name email").sort({ createdAt: -1 });
      res.json({ success: true, orders });
    } catch (err) {
      res.json({ success: false, error: err.message });
    }
  };

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) return res.json({ success: false, message: "Order not found" });

    res.json({ success: true, message: "Order status updated", order });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};
