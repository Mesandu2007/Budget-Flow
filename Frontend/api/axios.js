import axios from "axios";

const API_URL = "http://localhost:5000/api";


export const registerUser = async (data) => {
  return axios.post(`${API_URL}/auth/register`, data);
};

export const loginUser = async (data) => {
  return axios.post(`${API_URL}/auth/login`, data);
};

export const getUserProfile = async () => {
  const token = localStorage.getItem("token");

  return axios.get(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const forgotPassword = async (data) => {
  return axios.post(`${API_URL}/auth/forgot-password`, data);
};

export const resetPassword = async (token, data) => {
  return axios.post(
    `${API_URL}/auth/reset-password/${token}`,
    data
  );
};



export const getTransactions = async () => {
  const token = localStorage.getItem("token");

  return axios.get(`${API_URL}/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createTransaction = async (data) => {
  const token = localStorage.getItem("token");

  return axios.post(`${API_URL}/transactions`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTransaction = async (id, data) => {
  const token = localStorage.getItem("token");

  return axios.put(`${API_URL}/transactions/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteTransaction = async (id) => {
  const token = localStorage.getItem("token");

  return axios.delete(`${API_URL}/transactions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};



export const getBudgets = async () => {
  const token = localStorage.getItem("token");

  return axios.get(`${API_URL}/budgets`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createBudget = async (data) => {
  const token = localStorage.getItem("token");

  return axios.post(`${API_URL}/budgets`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateBudget = async (id, data) => {
  const token = localStorage.getItem("token");

  return axios.put(`${API_URL}/budgets/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteBudget = async (id) => {
  const token = localStorage.getItem("token");

  return axios.delete(`${API_URL}/budgets/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const checkBudget = async (month) => {
  const token = localStorage.getItem("token");

  return axios.get(
    `${API_URL}/budgets/check?month=${month}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getSummary = async () => {
  const token = localStorage.getItem("token");

  return axios.get(`${API_URL}/analytics/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCategoryStats = async () => {
  const token = localStorage.getItem("token");

  return axios.get(`${API_URL}/analytics/categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMonthlyExpenses = async () => {
  const token = localStorage.getItem("token");

  return axios.get(`${API_URL}/analytics/monthly-expenses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getIncomeVsExpense = async () => {
  const token = localStorage.getItem("token");

  return axios.get(`${API_URL}/analytics/income-vs-expense`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};