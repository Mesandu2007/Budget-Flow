import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getSummary,
  checkBudget,
  getUserProfile,
} from "../../api/axios";

export default function Dashboard() {
  const [summary, setSummary] = useState({});
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        
        const userRes = await getUserProfile();
        setUser(userRes.data);

      
        const summaryRes = await getSummary();
        setSummary(summaryRes.data);

      
        const month = new Date().toISOString().slice(0, 7);
        const budgetRes = await checkBudget(month);

        if (budgetRes.data.status === "warning") {
          toast("⚠ Budget is reaching the limit!", {
            icon: "⚠️",
          });
        }

        if (budgetRes.data.status === "exceeded") {
          toast.error("🚨 Budget exceeded!");
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);

        setError(
          err.response?.data?.msg ||
            "Failed to load dashboard data."
        );

        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // GREETING FUNCTION
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  
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
        <h1 className="text-3xl font-bold text-gray-800">
          {getGreeting()}, {user?.name || "User"} 👋
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome back to your finance dashboard
        </p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-gray-500 text-sm mb-2">
            Total Income
          </h3>

          <p className="text-3xl font-bold text-green-600">
            Rs. {summary.totalIncome || 0}
          </p>
        </div>

        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-gray-500 text-sm mb-2">
            Total Expense
          </h3>

          <p className="text-3xl font-bold text-red-600">
            Rs. {summary.totalExpense || 0}
          </p>
        </div>

        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-gray-500 text-sm mb-2">
            Balance
          </h3>

          <p className="text-3xl font-bold text-blue-600">
            Rs. {summary.balance || 0}
          </p>
        </div>
      </div>
    </div>
  );
}