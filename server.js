require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const userRoute = require("./routes/userRoutes");
const roleRotes = require("./routes/roleRotes");
const categoryRoutes = require("./routes/categoryRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is Running 🏃🏻‍♂️");
});
// Serve static files from the 'uploads' folder

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoute);

app.use("/api/category", categoryRoutes);

app.use("/api/role", roleRotes);

app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server Running On http://localhost:${PORT} `)
);
