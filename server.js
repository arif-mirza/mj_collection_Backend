// imports
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();
dotenv.config();

// connect to database
try {
  connectDB();
  console.log("Database connection successful");
} catch (error) {
  console.error("Database connection failed");
}

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mj-collection-frontend-sim8.vercel.app",
    ],

    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
const PORT = process.env.PORT || 8000;

// routes

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

// export default app;

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
