const Groq = require("groq-sdk");
const Transaction = require("../models/Transaction"); // Assuming you have a Transaction model
const mongoose = require("mongoose");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Processes transactions to calculate total spending per category.
 * @param {Array} transactions - A list of transaction documents.
 * @returns {Object} An object with categories as keys and total spending as values.
 */
const processTransactions = (transactions) => {
  if (!transactions || transactions.length === 0) {
    return {};
  }

  return transactions.reduce((acc, transaction) => {
    const { category, amount } = transaction;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {});
};

/**
 * Generates a prompt for the AI based on spending data.
 * @param {Object} currentSpending - Spending data for the current period.
 * @param {Object} previousSpending - Spending data for the previous period.
 * @returns {string} The prompt for the AI model.
 */
const createAIPrompt = (currentSpending, previousSpending) => {
  const currentMonthString = JSON.stringify(currentSpending, null, 2);
  const previousMonthString = JSON.stringify(previousSpending, null, 2);

  return `
    As a financial analyst for "Smart Spending Insights", analyze the following user expense data for the current and previous month. The currency is LKR (Sri Lankan Rupees).

    Previous Month's Spending by Category:
    ${previousMonthString}

    Current Month's Spending by Category (so far):
    ${currentMonthString}

    Based on this data, provide 3-4 concise and actionable insights for the user. Examples of insights include:
    - "You spent X% more/less on [Category] this month."
    - "Your [Category] expenses have increased/decreased by Y%."
    - "You could save around LKR Z by reducing [Category] expenses."
    
    Focus on the most significant changes and provide practical advice. Be friendly and encouraging. Address the user directly as "You".
    Return the insights as a JSON object with a single key "insights" which is an array of strings.

    Example response format:
    {
      "insights": [
        "You spent 30% more on Food this month.",
        "Your Entertainment expenses have increased by 20%.",
        "You could save LKR 5,000 by reducing dining out expenses."
      ]
    }
  `;
};

exports.getSpendingInsights = async (req, res) => {
  try {
    const userId = req.user.id;

    
    const today = new Date();
    const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const previousMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const previousMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

    const currentMonthTransactions = await Transaction.find({
      user: userId,
      date: { $gte: currentMonthStart },
    });

    const previousMonthTransactions = await Transaction.find({
      user: userId,
      date: { $gte: previousMonthStart, $lte: previousMonthEnd },
    });

    
    const currentSpending = processTransactions(currentMonthTransactions);
    const previousSpending = processTransactions(previousMonthTransactions);

    // Handle case with no spending data to prevent empty prompts
    if (Object.keys(currentSpending).length === 0 && Object.keys(previousSpending).length === 0) {
      return res.json({
        insights: ["No spending data available for this or the previous month. Start by adding some transactions!"],
      });
    }

  
    const prompt = createAIPrompt(currentSpending, previousSpending);

    let chatCompletion;
    try {
      chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.1-8b-instant", 
        temperature: 0.7,
        response_format: { type: "json_object" },
      });
    } catch (apiError) {
      console.error("Full Groq API Error:", apiError); 
      let errorMessage = "Failed to communicate with the AI service.";
      if (apiError instanceof Groq.APIError) {
        errorMessage = `Groq API Error (${apiError.status}): ${apiError.message}`;
        if (apiError.status === 401) {
          errorMessage = "Groq API authentication failed. Please check your GROQ_API_KEY.";
        }
      } else if (apiError.code === 'ENOTFOUND') {
        errorMessage = "Network error: Could not resolve the AI service hostname. Check your internet connection and DNS settings.";
      }

      throw new Error(errorMessage);
    }

    const aiResponse = chatCompletion.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("AI response was empty or malformed.");
    }

    let insights;
    try {
      insights = JSON.parse(aiResponse);
    } catch (parseError) {
      console.error("Error parsing AI JSON response:", parseError);
      console.error("AI Response Content:", aiResponse);
      throw new Error("Failed to parse AI response.");
    }

    res.json(insights);
  } catch (error) {
    console.error("Error getting AI insights:", error.message);
    res.status(500).json({ msg: "Server Error: Could not retrieve AI insights.", error: error.message });
  }
};


exports.getSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const transactions = await Transaction.find({
      user: userId,
      date: { $gte: startOfMonth },
    });

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(t => {
      if (t.type === 'income') {
        totalIncome += t.amount;
      } else {
        totalExpense += t.amount;
      }
    });

    res.json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    });
  } catch (error) {
    console.error("Error getting summary:", error.message);
    res.status(500).json({ msg: "Server Error: Could not get summary.", error: error.message });
  }
};


exports.getCategoryStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const { month } = req.query; 

    let startDate, endDate;

    if (month && /^\d{4}-\d{2}$/.test(month)) {
      const [year, monthNum] = month.split("-").map(Number);
      startDate = new Date(year, monthNum - 1, 1);
      endDate = new Date(year, monthNum, 0, 23, 59, 59, 999); 
    } else {
      
      const today = new Date();
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);
    }

    const expenses = await Transaction.find({
      user: userId,
      type: 'expense',
      date: { $gte: startDate, $lte: endDate },
    });

    const categoryStats = processTransactions(expenses);

    res.json(categoryStats);
  } catch (error) {
    console.error("Error getting category stats:", error.message);
    res.status(500).json({ msg: "Server Error: Could not get category stats.", error: error.message });
  }
};


exports.getIncomeVsExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date();
    const last12Months = new Date();
    last12Months.setMonth(last12Months.getMonth() - 11);
    last12Months.setDate(1);
    last12Months.setHours(0, 0, 0, 0);

    const result = await Transaction.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          date: { $gte: last12Months },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          income: {
            $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
          },
          expense: {
            $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          month: { $concat: [{ $toString: "$_id.year" }, "-", { $toString: { $cond: { if: { $lt: ["$_id.month", 10] }, then: { $concat: ["0", { $toString: "$_id.month" }] }, else: { $toString: "$_id.month" } } } }] },
          income: "$income",
          expense: "$expense",
        },
      },
      { $sort: { month: 1 } },
    ]);

    res.json(result);
  } catch (error) {
    console.error("Error getting income vs expense:", error.message);
    res.status(500).json({ msg: "Server Error: Could not get income vs expense data.", error: error.message });
  }
};


exports.getMonthlyExpenses = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await Transaction.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId), type: 'expense' } },
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } }, // Get the most recent months first
      { $limit: 12 },
      { $sort: { "_id.year": 1, "_id.month": 1 } }, // Sort them in chronological order for charting
      { $project: { _id: 0, month: { $concat: [ { $toString: "$_id.year" }, "-", { $toString: { $cond: { if: { $lt: ["$_id.month", 10] }, then: { $concat: ["0", { $toString: "$_id.month" }] }, else: { $toString: "$_id.month" } } } }] }, total: 1 } }
    ]);

    res.json(result);
  } catch (error) {
    console.error("Error getting monthly expenses:", error.message);
    res.status(500).json({ msg: "Server Error: Could not get monthly expenses.", error: error.message });
  }
};