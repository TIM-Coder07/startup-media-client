import getSession from "@/lib/session";
import OverviewChart from "./OverviewChart";

const FounderOverviewPage = async () => {

    const session = await getSession();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/founder-overview/${session.user.id}`,
        {
            cache: "no-store",
        }
    );
    const data = await res.json();

    return (
        <div>
            <OverviewChart data={data} />
        </div>
    );
};

export default FounderOverviewPage;