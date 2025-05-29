const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscribeRoutes = require("./routes/subscriberRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("WELCOME T0 M-VASTRA API!");
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscribeRoutes);

// Admin Routes
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

// POSTMAN invite link
// https://app.getpostman.com/join-team?invite_code=abc759033362ee7f4e0bcb2bd4fdc1856eee6326990637834252e20a870adf31

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
