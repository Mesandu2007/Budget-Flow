const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

/* MIDDLEWARE */
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5175",
    credentials: true,
  })
);

app.use(express.json());
app.use(passport.initialize());

require("./config/passport");

/* HEALTH CHECK */
app.get("/", (req, res) => {
  res.send("FinTrack API is running...");
});

/* ROUTES (FINTRACK) */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/budgets", require("./routes/budgetRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));

/* PORT */
const PORT = process.env.PORT || 5000;

/* START SERVER */
const start = async () => {
  try {
    await connectDB();

    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

start();