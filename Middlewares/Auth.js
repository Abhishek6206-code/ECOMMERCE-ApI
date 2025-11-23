import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.header("Auth");

  if (!token) return res.json("login first");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.userId;
    const user = await User.findById(id);

    if (!user) return res.json({ message: "user not exist" });

    req.user = user;
    next();
  } catch (err) {
    res.json({ message: "invalid token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.json({ message: "access denied" });
  }
  next();
};
