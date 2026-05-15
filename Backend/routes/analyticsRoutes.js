const express= require("express");
const router=express.Router();

const {
  getSummary,
  getCategoryStats,
  getMonthlyExpenses,
  getIncomeVsExpense,
} = require("../controllers/analyticsController");

const protect = require("../middleware/authMiddleware");


router.get("/summary", protect, getSummary);

router.get("/categories", protect, getCategoryStats);

router.get("/monthly-expenses", protect, getMonthlyExpenses);

router.get("/income-vs-expense", protect, getIncomeVsExpense);

module.exports = router;


