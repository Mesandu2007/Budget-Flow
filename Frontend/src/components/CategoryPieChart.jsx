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
      <div className="bg-white p-5 rounded-xl shadow flex flex-col items-center justify-center min-h-[360px]">
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
    <div className="bg-white p-5 rounded-xl shadow min-h-[360px]">

      <h2 className="text-lg font-semibold mb-4">
        Expenses by Category
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
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