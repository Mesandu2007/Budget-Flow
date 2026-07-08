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

  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border flex flex-col items-center justify-center text-gray-500 h-full">
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
    <div className="bg-white p-5 rounded-xl shadow h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4">
        Expenses by Category
      </h2>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={110}
            label
          >
            {data.map((_, index) => (
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