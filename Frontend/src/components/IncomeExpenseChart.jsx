import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function IncomeExpenseChart({ data }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-[400px] w-full border border-gray-100">

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800">
          Income vs Expenses
        </h3>
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          Monthly Analysis
        </span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >

          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />

          <Tooltip />

          <Legend />

          <Bar
            name="Income"
            dataKey="income"
            fill="#10b981"
            radius={[4, 4, 0, 0]}
            barSize={32}
          />

          <Bar
            name="Expense"
            dataKey="expense"
            fill="#ef4444"
            radius={[4, 4, 0, 0]}
            barSize={32}
          />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}