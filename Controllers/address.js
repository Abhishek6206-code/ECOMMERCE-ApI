import {Address} from "../Models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const { fullName, phone, street, city, state, pincode, country } = req.body;
    const newAddress = new Address({ user: req.user._id, fullName, phone, street, city, state, pincode, country });
    await newAddress.save();
    res.json({ message: "address added", address: newAddress });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const getAddress = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id });
    res.json(addresses);
  } catch (err) {
    res.json({ error: err.message });
  }
};



export const deleteAddress = async (req, res) => {
  try {
    
    const { id } = req.params;

    const address = await Address.findOne({ _id: id });
    if (!address) {
      return res.json({ success: false, message: "Address not found" });
    }

    await Address.findByIdAndDelete(id);
    res.json({ success: true, message: "Address deleted successfully" });
  } catch (err) {
    res.json({ success: false, message: "Error deleting address" });
  }
};
