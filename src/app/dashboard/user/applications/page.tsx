"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

type Application = {
  _id: string;
  startupId: string;
  startupTitle: string;
  startupImage: string;
  fundingGoal: number;
  founderId: string;
  investorId: string;
  investorName: string;
  investorEmail: string;
  status: string;
  createdAt: string;
};

export default function ApplicationsPage() {
  const { data: session, isPending } = authClient.useSession();

  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    if (isPending) return;

    if (!session?.user?.id) {
      return;
    }

    const fetchApplications = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/applications?investorId=${session.user.id}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch applications");
        }

        const data: Application[] = await res.json();
        setApplications(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApplications();
  }, [session, isPending]);


  const handleCancel = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel this application?"
    );

    if (!confirmDelete) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/applications/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      setApplications((prev) =>
        prev.filter((application) => application._id !== id)
      );
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {applications.map((application) => (
        <div
          key={application._id}
          className="overflow-hidden rounded-2xl border bg-white shadow-md transition hover:shadow-lg"
        >
          {/* Startup Image */}
          <Image
            src={application.startupImage}
            alt={application.startupTitle}
            width={500}
            height={300}
            className="h-52 w-full object-cover"
          />

          <div className="p-6">
            <h2 className="mb-4 text-2xl font-bold">
              {application.startupTitle}
            </h2>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">Investor:</span>{" "}
                {application.investorName}
              </p>

              <p>
                <span className="font-semibold">Email:</span>{" "}
                {application.investorEmail}
              </p>

              <p>
                <span className="font-semibold">Funding Goal:</span> $
                {application.fundingGoal.toLocaleString()}
              </p>

              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${application.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : application.status === "Accepted"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                    }`}
                >
                  {application.status}
                </span>
              </p>

              <p className="text-gray-500">
                Applied:{" "}
                {new Date(application.createdAt).toLocaleDateString()}
              </p>
            </div>

            <button
              className="mt-6 w-full rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
              onClick={() => handleCancel(application._id)}
            >
              Cancel Application
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}