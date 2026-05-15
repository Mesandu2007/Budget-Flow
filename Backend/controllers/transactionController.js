const Transaction = require("../models/Transaction");

/* ALLOWED VALUES (IMPORTANT FOR ANALYTICS) */
const allowedCategories = [
  "food",
  "transport",
  "bills",
  "shopping",
  "salary",
  "other",
];

const allowedTypes = ["income", "expense"];

/* ---------------- CREATE TRANSACTION ---------------- */
exports.createTransaction = async (req, res) => {
  try {
    let { amount, type, category, description, date } = req.body;

    /* NORMALIZE DATA */
    type = type?.toLowerCase();
    category = category?.toLowerCase();

    /* VALIDATION */
    if (!allowedTypes.includes(type)) {
      return res.status(400).json({ msg: "Invalid transaction type" });
    }

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ msg: "Invalid category" });
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      amount,
      type,
      category,
      description,
      date: date || new Date(),
    });

    res.status(201).json(transaction);
  } catch (err) {
    console.log("CREATE ERROR:", err);
    res.status(500).json({ msg: "Error creating transaction" });
  }
};

/* ---------------- GET TRANSACTIONS ---------------- */
exports.getTransactions = async (req, res) => {
  try {
    const { type, category, startDate, endDate, search } = req.query;

    let filter = { user: req.user._id };

    if (type) filter.type = type.toLowerCase();

    if (category) filter.category = category.toLowerCase();

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    if (search) {
      filter.description = { $regex: search, $options: "i" };
    }

    const transactions = await Transaction.find(filter).sort({ date: -1 });

    res.json(transactions);
  } catch (err) {
    console.log("GET ERROR:", err);
    res.status(500).json({ msg: "Error fetching transactions" });
  }
};

/* ---------------- UPDATE TRANSACTION ---------------- */
exports.updateTransaction = async (req, res) => {
  try {
    const updateData = { ...req.body };

    /* NORMALIZE IF EXISTS */
    if (updateData.type) {
      updateData.type = updateData.type.toLowerCase();

      if (!allowedTypes.includes(updateData.type)) {
        return res.status(400).json({ msg: "Invalid transaction type" });
      }
    }

    if (updateData.category) {
      updateData.category = updateData.category.toLowerCase();

      if (!allowedCategories.includes(updateData.category)) {
        return res.status(400).json({ msg: "Invalid category" });
      }
    }

    const updated = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    res.json(updated);
  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({ msg: "Error updating transaction" });
  }
};

/* ---------------- DELETE TRANSACTION ---------------- */
exports.deleteTransaction = async (req, res) => {
  try {
    const deleted = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    res.json({ msg: "Transaction deleted successfully" });
  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).json({ msg: "Error deleting transaction" });
  }
};