require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const userRoute = require("./routes/userRoutes");
const roleRotes = require("./routes/roleRotes");
const categoryRoutes = require("./routes/categoryRoutes");
const authRoutes = require("./routes/authRoutes");
const stockRoutes = require("./routes/stockRoutes");
const memberRoutes = require("./routes/memberRoutes");
const reportRoutes = require("./routes/reportRoutes");

const cors = require("cors");

const app = express();

connectDB();

app.use(
  cors({
    origin: "http://localhost:4200",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is Running 🏃🏻‍♂️");
});
// Serve static files from the 'uploads' folder

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoute);
app.use("/api/stocks", stockRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/reports", reportRoutes);

app.use("/api/role", roleRotes);

//app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server Running On http://localhost:${PORT} `)
);
