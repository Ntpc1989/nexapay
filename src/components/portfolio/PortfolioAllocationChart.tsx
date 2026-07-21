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
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EF4444",
  "#06B6D4",
  "#84CC16",
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

  const total = chartData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white">
          Portfolio Allocation
        </h3>

        <p className="mt-1 text-sm text-zinc-400">
          Asset distribution
        </p>
      </div>

      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              stroke="transparent"
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
                `$${Number(value).toFixed(2)}`,
                "Value",
              ]}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs uppercase tracking-widest text-zinc-500">
            Total
          </span>

          <span className="mt-1 text-3xl font-bold text-white">
            ${total.toFixed(2)}
          </span>

          <span className="mt-1 text-xs text-zinc-500">
            {chartData.length} Assets
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {chartData.map((item, index) => {
          const percent =
            total === 0
              ? 0
              : (item.value / total) * 100;

          return (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor:
                      COLORS[index % COLORS.length],
                  }}
                />

                <span className="font-medium text-white">
                  {item.name}
                </span>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-white">
                  ${item.value.toFixed(2)}
                </p>

                <p className="text-xs text-zinc-500">
                  {percent.toFixed(1)}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}