import { useEffect, useState } from "react";

import IncomeExpenseChart from "../components/IncomeExpenseChart";
import CategoryPieChart from "../components/CategoryPieChart";

import {
  getIncomeVsExpense,
  getCategoryStats,
} from "../../api/axios";

export default function Analytics() {
  const [chartData, setChartData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    loadIncomeExpense();
    loadCategoryData();
  }, []);

  /* ---------------- INCOME VS EXPENSE ---------------- */
  const loadIncomeExpense = async () => {
    try {
      const res = await getIncomeVsExpense();
      const raw = res.data;

      const map = {};

      raw.forEach((item) => {
        const month = item.month;

        if (!map[month]) {
          map[month] = {
            name: month,
            income: 0,
            expense: 0,
          };
        }

        if (item.type === "income") {
          map[month].income = item.total;
        }

        if (item.type === "expense") {
          map[month].expense = item.total;
        }
      });

      setChartData(Object.values(map));
    } catch (err) {
      console.error("Error loading income vs expense:", err);
    }
  };

  /* ---------------- CATEGORY PIE CHART ---------------- */
  const loadCategoryData = async () => {
    try {
      const res = await getCategoryStats();

      
      const processedData = res.data.map((item) => ({
        name: item.category || item._id || "Other",
        total: Number(item.total) || 0,
      }));

      setCategoryData(processedData);
    } catch (err) {
      console.error("Error loading category stats:", err);
    }
  };

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

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  
        <IncomeExpenseChart data={chartData} />

        
        <CategoryPieChart data={categoryData} />
      </div>
    </div>
  );
}