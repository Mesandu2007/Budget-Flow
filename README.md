
# 📊 Budget Flow – MERN Finance Tracker

A full-stack finance tracking application built with the MERN stack featuring authentication, budgets, transactions, analytics, AI insights and email notifications.

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
