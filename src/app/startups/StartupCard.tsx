import Image from "next/image";
import Link from "next/link";

type Startup = {
  _id: string;
  title: string;
  description: string;
  industry: string;
  stage: string;
  fundingGoal: number;
  founderId: string;
  image: string;
  createdAt: string;
};

export default function StartupCard({ startup }: { startup: Startup }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative h-56 w-full">
        <Image
          src={startup.image}
          alt={startup.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="space-y-4 p-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {startup.title}
          </h2>

          <p className="mt-2 line-clamp-2 text-sm text-slate-600">
            {startup.description}
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
            {startup.industry}
          </span>

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            {startup.stage}
          </span>
        </div>

        {/* Funding */}
        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <p className="text-xs text-slate-500">Funding Goal</p>
            <p className="text-xl font-bold text-emerald-600">
              ${startup.fundingGoal.toLocaleString()}
            </p>
          </div>

          <Link href={`/startups/${startup._id}`} className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}