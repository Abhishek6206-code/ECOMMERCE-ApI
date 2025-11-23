import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './Routes/user.js';
import productRouter from './Routes/product.js';
import cartRouter from './Routes/cart.js';
import addressRouter from './Routes/address.js';
import orderRouter from './Routes/order.js';
import adminRouter from "./Routes/admin.js";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Use single variable like second code
const CLIENT_URL = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(express.json());

// CORS same pattern as second one
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin", adminRouter);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI, { dbName: "Mern_E_Commerce" })
  .then(() => console.log("mongodb connected successfully"))
  .catch((err) => console.log(err));

// Server
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
