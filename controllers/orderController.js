import Order from "../models/orderModel.js";

// Create New Order (For Simple User)
export const placeOrder = async (req, res) => {
  try {
     const {
      productName,
      price,
      quantity,
      address,
      phone,
      paymentMethod,
      paymentId,
      transactionId
    } = req.body;

    const newOrder = new Order({
      user: req.user.userId, 
      productName,
      price,
      quantity,
      totalAmount: price * quantity,
      address,
      phone,
      paymentMethod,
      paymentId,
      transactionId,
      paymentStatus: paymentMethod === "COD" ? "Pending" : "Pending",
      status: "Pending",
    });

    await newOrder.save();

    res.status(201).json({ success: true, message: "Order placed successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Orders (For Admin Dashboard)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Order Status (Pending -> Completed)
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json({ success: true, updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { paymentStatus },
      { new: true }
    );

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



