const Budget = require("../models/Budget");
const Transaction = require("../models/Transaction");
const mongoose = require("mongoose");



exports.createBudget = async (req, res) => {
  try {
    const { month, amount } = req.body;

    
    const existing = await Budget.findOne({
      user: req.user._id,
      month,
    });

    if (existing) {
      return res.status(400).json({
        msg: "Budget already exists for this month",
      });
    }

    const budget = await Budget.create({
      user: req.user._id,
      month,
      amount,
    });

    res.status(201).json(budget);
  } catch (err) {
    console.log("CREATE BUDGET ERROR:", err);
    res.status(500).json({ msg: "Error creating budget" });
  }
};



exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user._id });
    res.json(budgets);
  } catch (err) {
    console.log("GET BUDGET ERROR:", err);
    res.status(500).json({ msg: "Error fetching budgets" });
  }
};



exports.updateBudget = async (req, res) => {
  try {
    const updated = await Budget.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Budget not found" });
    }

    res.json(updated);
  } catch (err) {
    console.log("UPDATE BUDGET ERROR:", err);
    res.status(500).json({ msg: "Error updating budget" });
  }
};



exports.deleteBudget = async (req, res) => {
  try {
    const deleted = await Budget.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ msg: "Budget not found" });
    }

    res.json({ msg: "Budget deleted" });
  } catch (err) {
    console.log("DELETE BUDGET ERROR:", err);
    res.status(500).json({ msg: "Error deleting budget" });
  }
};



exports.checkBudget = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month || !month.includes("-")) {
      return res.status(400).json({
        msg: "Invalid month format. Use YYYY-MM",
      });
    }

    
    const [year, monthNum] = month.split("-");

    const start = new Date(year, monthNum - 1, 1);
    const end = new Date(year, monthNum, 0);

    const budget = await Budget.findOne({
      user: req.user._id,
      month,
    });

    if (!budget) {
      return res.json({ msg: "No budget set for this month" });
    }

    
    const expenses = await Transaction.find({
      user: req.user._id,
      type: "expense",
      date: { $gte: start, $lte: end },
    });

    const totalSpent = expenses.reduce(
      (sum, e) => sum + (e.amount || 0),
      0
    );

    let status = "safe";

    const percentage = (totalSpent / budget.amount) * 100;

    if (percentage >= 100) {
      status = "exceeded";
    } else if (percentage >= 80) {
      status = "warning";
    }

    res.json({
      budget: budget.amount,
      spent: totalSpent,
      remaining: budget.amount - totalSpent,
      percentage: Number(percentage.toFixed(2)),
      status,
    });
  } catch (err) {
    console.log("CHECK BUDGET ERROR:", err);
    res.status(500).json({ msg: "Error checking budget" });
  }
};