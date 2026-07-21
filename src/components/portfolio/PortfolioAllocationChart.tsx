"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: {
    symbol: string;
    value: number;
  }[];
};

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ef4444",
  "#06b6d4",
  "#84cc16",
];

export default function PortfolioAllocationChart({
  data,
}: Props) {
  const chartData = data
    .filter((item) => item.value > 0)
    .map((item) => ({
      name: item.symbol,
      value: Number(item.value.toFixed(2)),
    }));

  if (!chartData.length) {
    return null;
  }

  return (
    <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h3 className="mb-5 text-xl font-semibold text-white">
        Portfolio Allocation
      </h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={95}
              label={({ name, percent }) => {
                const percentage = ((percent ?? 0) * 100).toFixed(0);
                return `${name} ${percentage}%`;
              }}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [
                `$${Number(value).toLocaleString()}`,
                "Value",
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}