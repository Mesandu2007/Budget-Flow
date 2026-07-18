
# 📊 Budget Flow – MERN Finance Tracker

# 💰 Finance Tracker - AI Powered Personal Finance Management Platform

A full-stack personal finance tracking application built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)** that helps users manage their income, expenses, and budgets efficiently. The platform provides secure authentication, transaction management, budget tracking, advanced analytics, AI-powered financial insights, and automated notifications using scheduled background jobs.

The application enables users to understand their spending behaviour, monitor budgets, detect overspending patterns, and receive intelligent recommendations to improve their financial decisions.

## 🚀 Features

## 🔐 Authentication & Security
- Secure user registration and login system
- JWT-based authentication and authorization
- Password encryption using bcrypt
- Protected API routes
- User-specific financial data management

---

## 💳 Transaction Management
- Create, update, and delete income and expense transactions
- Categorize transactions for better financial organization
- Track transaction details:
  - Amount
  - Category
  - Date
  - Description
- View complete transaction history
- Filter and analyze transactions based on categories and dates

---

## 📊 Budget Management
- Create monthly budgets for different spending categories
- Set spending limits and financial goals
- Track budget usage in real time
- Compare actual expenses with planned budgets
- Monitor category-wise spending performance

---

## 🚨 Automated Budget Overspending Notifications
- Automatically detects when users exceed their budget limits
- Background monitoring using **Node Cron scheduled jobs**
- Generates notifications when spending crosses defined limits
- Helps users identify excessive spending early
- Provides better control over financial habits

---

## 📈 Financial Analytics Dashboard
- Interactive dashboard for tracking financial performance
- Visualize:
  - Total income
  - Total expenses
  - Monthly spending trends
  - Category-wise expenses
  - Budget utilization
- Data-driven insights through charts and reports

---

## 🤖 AI Powered Financial Insights
- AI-based analysis of user spending behaviour
- Generates personalized financial recommendations
- Identifies unnecessary spending patterns
- Suggests ways to improve saving habits
- Provides intelligent insights based on transaction history
- Helps users make better financial decisions

---

## 🚀 Tech Stack

- **Backend:** Node.js, Express.js
- **AI:** Groq AI API
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, Passport.js
- **Email Service:** Nodemailer
- **Frontend:** React (Vite)

---

## 📁 Project Structure

### 🔧 Backend

```bash
Backend/
├── config/
│   ├── db.js
│   ├── passport.js
│
├── controllers/
│   ├── authController.js
│   ├── budgetController.js
│   ├── transactionController.js
│   ├── analyticsController.js
│
├── middleware/
│   ├── authMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Transaction.js
│   ├── Budget.js
│
├── routes/
│   ├── authRoutes.js
│   ├── transactionRoutes.js
│   ├── budgetRoutes.js
│   ├── analyticsRoutes.js
│
├── utils/
│   ├── sendEmail.js
│
├── server.js
├── .env

```

###  Frontend

```bash

frontend/
│
├── api/
│ └── axios.js
│
├── public/
│
├── src/
│ │
│ ├── assets/
│ │
│ ├── components/
│ │ ├── CategoryPieChart.jsx
│ │ ├── IncomeExpenseChart.jsx
│ │ ├── navbar.jsx
│ │ └── sidebar.jsx
│ │
│ ├── pages/
│ │ ├── Analytics.jsx
│ │ ├── Budgets.jsx
│ │ ├── Dashboard.jsx
│ │ ├── ForgotPassword.jsx
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ ├── Reset.jsx
│ │ ├── ResetPassword.jsx
│ │ └── Transactions.jsx
│ │
│ ├── App.css
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
└── package-lock.json

```

## 🔗 API Routes

### 🔐 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get user profile |

---

### 💰 Transactions

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/transactions` | Get all transactions |
| POST | `/api/transactions` | Create transaction |
| PUT | `/api/transactions/:id` | Update transaction |
| DELETE | `/api/transactions/:id` | Delete transaction |

---

### 📊 Budgets

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/budgets` | Get all budgets |
| POST | `/api/budgets` | Create budget |
| PUT | `/api/budgets/:id` | Update budget |
| DELETE | `/api/budgets/:id` | Delete budget |
| GET | `/api/budgets/check?month=YYYY-MM` | Check budget status |

---

### 📈 Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics/summary` | Get financial summary |
| GET | `/api/analytics/category-stats` | Get category statistics |
| GET | `/api/analytics/monthly-expenses` | Get monthly expenses |
| GET | `/api/analytics/income-vs-expense` | Compare income and expenses |



Mesandu
MERN Stack Developer
