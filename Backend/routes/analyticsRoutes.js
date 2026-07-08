const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  getSpendingInsights,
  getSummary,
  getCategoryStats,
  getIncomeVsExpense,
  getMonthlyExpenses,
} = require("../controllers/analyticsController");

// @route   GET /api/analytics/insights
// @desc    Get AI-powered spending insights for the authenticated user
// @access  Private
router.get("/insights", protect, getSpendingInsights);

// @route   GET /api/analytics/summary
// @desc    Get financial summary for the current month
// @access  Private
router.get("/summary", protect, getSummary);

// @route   GET /api/analytics/category-stats
// @desc    Get expense statistics grouped by category for the current month
// @access  Private
router.get("/category-stats", protect, getCategoryStats);

// @route   GET /api/analytics/income-vs-expense
// @desc    Get income vs. expense data for the last 12 months
// @access  Private
router.get("/income-vs-expense", protect, getIncomeVsExpense);

// @route   GET /api/analytics/monthly-expenses
// @desc    Get total expenses for each of the last 12 months
// @access  Private
router.get("/monthly-expenses", protect, getMonthlyExpenses);

module.exports = router;