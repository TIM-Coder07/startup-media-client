import InvestmentDetails from "./InvestmentDetails";

async function getInvestment(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/applications/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load investment");
  }

  return res.json();
}

export default async function InvestmentDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const investment = await getInvestment(id);

  return <InvestmentDetails investment={investment} />;
}