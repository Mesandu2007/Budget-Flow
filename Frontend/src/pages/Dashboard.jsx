import React, { useEffect, useState } from "react";
import { getSummary } from "../../api/axios";

const StatCard = ({ title, amount, color }) => (
  <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-200`}>
    <h3 className="text-lg font-medium text-gray-500">{title}</h3>
    <p className={`text-3xl font-bold mt-2 ${color}`}>
      {amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })}
    </p>
  </div>
);

export default function Dashboard() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getSummary();
        setSummary(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Could not load dashboard summary. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-lg font-medium text-gray-600">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-500 text-sm">
          Here's a summary of your activity for this month.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Income" amount={summary.totalIncome} color="text-green-600" />
        <StatCard title="Total Expense" amount={summary.totalExpense} color="text-red-600" />
        <StatCard title="Balance" amount={summary.balance} color="text-blue-600" />
      </div>
    </div>
  );
}