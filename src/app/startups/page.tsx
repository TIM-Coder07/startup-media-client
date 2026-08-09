import StartupCard from "./StartupCard";

type Startup = {
  _id: string;
  startupName: string;
  tagline: string;
  industry: string;
  logo: string;
};

async function getStartups() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/browse-startups`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch startups");
  }

  return res.json();
}

export default async function BrowseStartupsPage() {
  const startups: Startup[] = await getStartups();

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {startups.map((startup) => (
    <StartupCard key={startup._id} startup={startup} />
  ))}
</div>
  );
}