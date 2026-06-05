import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CategoryPieChart = ({ data }) => {
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];

  
  const formattedData = data?.map((item) => ({
    ...item,
    total: Number(item.total),
  }));

  if (!formattedData || formattedData.length === 0) {
    return (
      <div className="bg-white p-5 rounded-xl shadow h-[360px] flex flex-col items-center justify-center">
        <h2 className="text-lg font-semibold mb-4 self-start">
          Expenses by Category
        </h2>

        <p className="text-gray-400 text-sm">
          No data available for this period.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow h-[360px]">
      <h2 className="text-lg font-semibold mb-4">
        Expenses by Category
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={formattedData}
            dataKey="total"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={110}
            label
          >
            {formattedData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;