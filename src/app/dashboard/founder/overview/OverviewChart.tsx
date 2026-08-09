"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = ["#F59E0B", "#10B981", "#EF4444"];

type Props = {
  data: {
    monthlyFunding: {
      month: string;
      amount: number;
    }[];

    requestStatus: {
      name: string;
      value: number;
    }[];

    profileViewsByMonth: {
      month: string;
      views: number;
    }[];
  };
};

export default function OverviewChart({ data }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      {/* Funding Bar Chart */}
      <div className="rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-5 text-xl font-bold">
          Monthly Funding Raised
        </h2>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data.monthlyFunding}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="amount"
              radius={[8, 8, 0, 0]}
              fill="#4F46E5"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-5 text-xl font-bold">
          Request Status
        </h2>

        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={data.requestStatus}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >
              {data.requestStatus.map((_, index) => (
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

      {/* Line Chart */}
      <div className="rounded-2xl bg-white p-6 shadow xl:col-span-2">
        <h2 className="mb-5 text-xl font-bold">
          Profile Views By Month
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data.profileViewsByMonth}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="views"
              stroke="#2563EB"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}