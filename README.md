💰 Budget Flow — MERN Finance Tracker

A full-stack Finance Tracking Web Application built using the MERN stack. It helps users manage income, expenses, budgets, and view financial analytics in a simple dashboard.

🚀 Features
🔐 User authentication (JWT login/register)
💸 Add / update / delete transactions
📊 Income vs Expense tracking
🥧 Category-based expense analysis
💰 Monthly budget management
⚠ Budget warning & exceeded alerts
📈 Analytics dashboard with charts
👤 Personalized user profile
🔔 Toast notifications for alerts
🛠️ Tech Stack

Frontend:

React.js
Tailwind CSS
Axios
React Router
Recharts
React Hot Toast

Backend:

Node.js
Express.js
MongoDB + Mongoose
JWT Authentication
Passport.js
Nodemailer
📁 Project Structure
🔧 Backend
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
🎨 Frontend
Frontend/
├── src/
│   ├── pages/
│   ├── components/
│   ├── api/
│   ├── App.jsx
│   ├── main.jsx
⚙️ Installation & Setup
1️⃣ Clone repository
git clone https://github.com/your-username/budget-flow.git
cd budget-flow
2️⃣ Backend setup
cd Backend
npm install

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
FRONTEND_URL=http://localhost:5173

Run backend:

npm start
3️⃣ Frontend setup
cd Frontend
npm install
npm run dev
🔗 API Routes
Auth
POST /api/auth/register
POST /api/auth/login
GET /api/auth/profile
Transactions
GET /api/transactions
POST /api/transactions
PUT /api/transactions/:id
DELETE /api/transactions/:id
Budgets
GET /api/budgets
POST /api/budgets
PUT /api/budgets/:id
DELETE /api/budgets/:id
GET /api/budgets/check?month=YYYY-MM
Analytics
GET /api/analytics/summary
GET /api/analytics/category-stats
GET /api/analytics/monthly-expenses
GET /api/analytics/income-vs-expense
📊 Future Improvements
AI-based expense insights
Export reports (PDF / Excel)
Mobile app (React Native)
Dark mode toggle
Email notifications for budget alerts
