import getSession from "@/lib/session";
import InvestmentTable from "./InvestmentTable";

const getApplicationData = async () => {
    const session = await getSession();

    if (!session) {
        return [];
    }

    const res = await fetch(
    `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/applications?investorId=${session.user.id}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

const InvestMentRequestPage = async () => {
    const applicationData = await getApplicationData();
    const apply = applicationData.map((application: any) => ({ ...application, id: application.id }));
    return (
        <div>
            <InvestmentTable apply={apply} />
        </div>
    );
};

export default InvestMentRequestPage;