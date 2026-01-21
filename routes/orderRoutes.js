import express from "express";
import {
  placeOrder,
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
  getMyOrders,
} from "../controllers/orderController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/", getAllOrders);
router.put("/:id", updateOrderStatus);
router.put("/payment/:id", updatePaymentStatus);

export default router;
