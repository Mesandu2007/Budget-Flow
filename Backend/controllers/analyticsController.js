const Transaction = require("../models/Transaction");
const mongoose = require("mongoose");

/* ---------------- SUMMARY ---------------- */
exports.getSummary = async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    let totalIncome = 0;
    let totalExpense = 0;

    result.forEach((r) => {
      if (r._id === "income") totalIncome = r.total;
      if (r._id === "expense") totalExpense = r.total;
    });

    res.json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error fetching summary" });
  }
};

/* ---------------- CATEGORY STATS ---------------- */
exports.getCategoryStats = async (req, res) => {
  try {
    const stats = await Transaction.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user._id),
          type: "expense",
        },
      },
      {
        $group: {
          _id: { $toLower: "$category" }, // FIX: normalize
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json(
      stats.map((s) => ({
        category: s._id,
        total: s.total,
      }))
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error fetching category stats" });
  }
};

/* ---------------- MONTHLY EXPENSES ---------------- */
exports.getMonthlyExpenses = async (req, res) => {
  try {
    const stats = await Transaction.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user._id),
          type: "expense",
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    res.json(
      stats.map((s) => ({
        year: s._id.year,
        month: months[s._id.month - 1],
        total: s.total,
      }))
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error fetching monthly expenses" });
  }
};

/* ---------------- INCOME VS EXPENSE ---------------- */
exports.getIncomeVsExpense = async (req, res) => {
  try {
    const data = await Transaction.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            type: "$type",
          },
          total: { $sum: "$amount" },
        },
      },
    ]);

    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    res.json(
      data.map((d) => ({
        month: months[d._id.month - 1],
        type: d._id.type,
        total: d.total,
      }))
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error fetching income vs expense data" });
  }
};