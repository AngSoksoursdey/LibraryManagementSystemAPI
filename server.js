require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const userRoute = require("./routes/userRoutes");
const roleRotes = require("./routes/roleRotes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is Running 🏃🏻‍♂️");
});

app.use("/api/user", userRoute);

app.use("/api/category", categoryRoutes);

app.use("/api/role", roleRotes);

app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server Running On http://localhost:${PORT} `)
);
