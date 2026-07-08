import { useEffect, useState } from "react";

import IncomeExpenseChart from "../components/IncomeExpenseChart";
import CategoryPieChart from "../components/CategoryPieChart";

import {
  getIncomeVsExpense,
  getSpendingInsights,
  getCategoryStats,
} from "../../api/axios";

export default function Analytics() {
  const [chartData, setChartData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [insights, setInsights] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAnalyticsData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch all data in parallel
        const [incomeExpenseRes, categoryStatsRes, insightsRes] = await Promise.all([
          getIncomeVsExpense(),
          getCategoryStats(),
          getSpendingInsights(),
        ]);

        // Process income vs expense data
        const incomeExpenseData = incomeExpenseRes.data.map(item => ({
          name: item.month,
          income: item.income || 0,
          expense: item.expense || 0,
        })).sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setChartData(incomeExpenseData);

        // Backend now returns aggregated data, so we can use it directly.
        const pieChartData = (Array.isArray(categoryStatsRes.data) ? categoryStatsRes.data : [])
          .map(item => ({
            name: item._id, // Rename '_id' to 'name' for the pie chart
            value: item.value,
          }))
          .sort((a, b) => b.value - a.value); // Sort for better visualization
        
        setCategoryData(pieChartData);
        
        // Set AI insights
        setInsights(insightsRes.data.insights);
      } catch (err) {
        console.error("Error loading analytics data:", err);
        setError("Failed to load analytics data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadAnalyticsData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-lg font-medium text-gray-600">Loading analytics...</p>
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
    <div className="transition-all duration-300">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Financial Analytics
        </h2>
        <p className="text-gray-500 text-sm">
          Visualize your income, expenses, and spending categories.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[400px]">
        {chartData.length > 0 ? (
          <IncomeExpenseChart data={chartData} />
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-sm border flex items-center justify-center text-gray-500">No income or expense data to display.</div>
        )}
        {categoryData.length > 0 ? (
          <CategoryPieChart data={categoryData} />
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-sm border flex items-center justify-center text-gray-500">No category data to display.</div>
        )}
      </div>

      {/* AI INSIGHTS SECTION */}
      <div className="mt-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">AI Insights</h2>
          <p className="text-gray-500 text-sm">
            Get smart insights into your spending habits.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-700 whitespace-pre-wrap">{insights}</p>
        </div>
      </div>
    </div>
  );
}