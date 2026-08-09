"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { CheckCircle2, Clock3, XCircle } from "lucide-react";

const data = [
  { name: "Accepted", value: 120 },
  { name: "Pending", value: 45 },
  { name: "Cancelled", value: 20 },
];

const COLORS = ["#22C55E", "#F59E0B", "#EF4444"];

const total = data.reduce((acc, item) => acc + item.value, 0);

export default function UserOverViewPage() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-indigo-50 p-8 shadow-xl">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">User Overview</h2>
          <p className="mt-1 text-sm text-slate-500">User request statistics</p>
        </div>

        <div className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
          Total: {total}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Chart */}
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={85}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
                stroke="white"
                strokeWidth={5}
                label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  borderRadius: "14px",
                  border: "none",
                  boxShadow: "0 10px 30px rgba(0,0,0,.1)",
                }}
              />

              {/* Center Text */}
              <text
                x="50%"
                y="48%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-slate-700 text-3xl font-bold"
              >
                {total}
              </text>

              <text
                x="50%"
                y="58%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-slate-500 text-sm"
              >
                Total Applications
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Stats */}
        <div className="flex flex-col justify-center gap-5">
          <div className="flex items-center justify-between rounded-2xl bg-green-50 p-5">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle2 className="text-green-600" />
              </div>

              <div>
                <p className="text-sm text-slate-500">Accepted</p>
                <h3 className="text-2xl font-bold">{data[0].value}</h3>
              </div>
            </div>

            <span className="font-semibold text-green-600">✓</span>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-amber-50 p-5">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-amber-100 p-3">
                <Clock3 className="text-amber-600" />
              </div>

              <div>
                <p className="text-sm text-slate-500">Pending</p>
                <h3 className="text-2xl font-bold">{data[1].value}</h3>
              </div>
            </div>

            <span className="font-semibold text-amber-600">⏳</span>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-red-50 p-5">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-red-100 p-3">
                <XCircle className="text-red-600" />
              </div>

              <div>
                <p className="text-sm text-slate-500">Cancelled</p>
                <h3 className="text-2xl font-bold">{data[2].value}</h3>
              </div>
            </div>

            <span className="font-semibold text-red-600">✕</span>
          </div>
        </div>
      </div>
    </div>
  );
}
