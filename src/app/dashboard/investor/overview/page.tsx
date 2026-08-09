import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import InvestorDashboard from "./InvestorDashboard";
import getSession from "@/lib/session";

async function getDashboardData(investorId: string) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/investor-overview/${investorId}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch dashboard data");
    }

    return res.json();
}

export default async function InvestorOverviewPage() {
    const session = await getSession();
    const investorId = session.user.id;

    if (!session?.user) {
        return <div>Please login first</div>;
    }

    const dashboardData = await getDashboardData(investorId);
    console.log("Dashboard Data:", dashboardData);

    return <InvestorDashboard dashboardData={dashboardData} />;
}