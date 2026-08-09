"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type Props = {
  investment: any;
};

export default function InvestmentDetails({ investment }: Props) {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-slate-700 transition hover:bg-slate-100"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <h1 className="mb-6 text-3xl font-bold">
        {investment.startupTitle}
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h4 className="font-semibold">Investor</h4>
          <p>{investment.investorName}</p>
        </div>

        <div>
          <h4 className="font-semibold">Email</h4>
          <p>{investment.investorEmail}</p>
        </div>

        <div>
          <h4 className="font-semibold">Funding Goal</h4>
          <p>${investment.fundingGoal.toLocaleString()}</p>
        </div>

        <div>
          <h4 className="font-semibold">Status</h4>
          <p>{investment.status}</p>
        </div>
      </div>
    </div>
  );
}