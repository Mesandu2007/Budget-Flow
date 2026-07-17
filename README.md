
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

⚙️ Installation & Setup

1️⃣ Clone repository
git clone https://github.com/your-username/budget-flow.git
cd budget-flow

2️⃣ Backend setup
cd Backend
npm install

3️⃣ Frontend setup
cd Frontend
npm install
npm run dev

🔗 API Routes
🔐 Auth
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile

💰 Transactions
GET    /api/transactions
POST   /api/transactions
PUT    /api/transactions/:id
DELETE /api/transactions/:id

📊 Budgets
GET    /api/budgets
POST   /api/budgets
PUT    /api/budgets/:id
DELETE /api/budgets/:id
GET    /api/budgets/check?month=YYYY-MM

📈 Analytics
GET /api/analytics/summary
GET /api/analytics/category-stats
GET /api/analytics/monthly-expenses
GET /api/analytics/income-vs-expense

📊 Future Improvements
🤖 AI-based expense insights
📄 Export reports (PDF / Excel)
📱 Mobile app (React Native)
🌙 Dark mode toggle
📧 Email notifications for budget alerts
👨‍💻 Author

Mesandu
MERN Stack Developer
