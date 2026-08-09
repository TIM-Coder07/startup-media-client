"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

type DashboardData = {
  totalInvestment?: number;
  activeStartups?: number;
  pendingDeals?: number;
  savedStartups?: number;

  monthlyInvestment?: {
    month: string;
    amount: number;
  }[];

  portfolio?: {
    name: string;
    value: number;
  }[];
};

type Props = {
  dashboardData: DashboardData;
};

const COLORS = ["#4F46E5", "#06B6D4", "#F59E0B", "#10B981"];

const InvestorDashboard = ({ dashboardData }: Props) => {
  const monthlyInvestment = dashboardData.monthlyInvestment ?? [];

  const portfolio = dashboardData.portfolio ?? [];

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="mb-8 text-4xl font-bold text-slate-800">
        Investor Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-4">
        <div className="rounded-2xl bg-indigo-600 p-6 text-white shadow-lg">
          <h3 className="text-lg">Total Investment</h3>
          <p className="mt-2 text-3xl font-bold">
            $
            {(dashboardData.totalInvestment ?? 0).toLocaleString()}
          </p>
        </div>

        <div className="rounded-2xl bg-emerald-600 p-6 text-white shadow-lg">
          <h3 className="text-lg">Active Startups</h3>
          <p className="mt-2 text-3xl font-bold">
            {dashboardData.activeStartups ?? 0}
          </p>
        </div>

        <div className="rounded-2xl bg-amber-500 p-6 text-white shadow-lg">
          <h3 className="text-lg">Pending Deals</h3>
          <p className="mt-2 text-3xl font-bold">
            {dashboardData.pendingDeals ?? 0}
          </p>
        </div>

        <div className="rounded-2xl bg-sky-600 p-6 text-white shadow-lg">
          <h3 className="text-lg">Saved Startups</h3>
          <p className="mt-2 text-3xl font-bold">
            {dashboardData.savedStartups ?? 0}
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Monthly Investment */}
        <div className="rounded-3xl bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-2xl font-semibold">
            Monthly Investments
          </h2>

          {monthlyInvestment.length === 0 ? (
            <div className="flex h-[350px] items-center justify-center text-slate-500">
              No investment data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={monthlyInvestment}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="amount"
                  fill="#4F46E5"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Portfolio */}
        <div className="rounded-3xl bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-2xl font-semibold">
            Portfolio Distribution
          </h2>

          {portfolio.length === 0 ? (
            <div className="flex h-[350px] items-center justify-center text-slate-500">
              No portfolio data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={portfolio}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >
                  {portfolio.map((_, index) => (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;