import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", 
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

// Transaction routes
export const getTransactions = () => API.get("/transactions");
export const createTransaction = (data) => API.post("/transactions", data);
export const updateTransaction = (id, data) => API.patch(`/transactions/${id}`, data);
export const deleteTransaction = (id) => API.delete(`/transactions/${id}`);

// Budget routes
export const getBudgets = () => API.get("/budgets");
export const createBudget = (data) => API.post("/budgets", data);
export const updateBudget = (id, data) => API.patch(`/budgets/${id}`, data);
export const deleteBudget = (id) => API.delete(`/budgets/${id}`);
export const checkBudget = (month) => API.get(`/budgets/check/${month}`);

// Analytics routes
export const getSpendingInsights = () => API.get("/analytics/insights");
export const getSummary = () => API.get("/analytics/summary");
export const getIncomeVsExpense = () => API.get("/analytics/income-vs-expense");
export const getMonthlyExpenses = () => API.get("/analytics/monthly-expenses");
export const getCategoryStats = () => API.get("/analytics/category-stats");

// Auth routes
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);
export const getUserProfile = () => API.get("/auth/profile");
export const forgotPassword = (data) => API.post("/auth/forgot-password", data);
export const resetPassword = (token, data) => API.post(`/auth/reset-password/${token}`, data);

export default API;