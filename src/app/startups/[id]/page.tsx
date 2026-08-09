import StartupDetailsCard from "./StartupDetailsCard";

async function getStartup(id: string) {
  const url = `http://localhost:5000/browse-startups/${id}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch startup");
  }

  return res.json();
}

export default async function StartupDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const startup = await getStartup(id);

  return (
    <div>
      <StartupDetailsCard startup={startup} />
    </div>
  );
}