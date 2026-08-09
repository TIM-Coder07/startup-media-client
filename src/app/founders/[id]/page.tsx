import CoFounderDetailsCard from "./CoFounderDetailsCard";


type CoFounder = {
  _id: string;
  name: string;
  email: string;
  role: string;
  skills: string[];
  experience: string;
  bio: string;
  industry: string;
  location: string;
  linkedin: string;
  profileImage: string;
  createdAt: string;
};

async function getCoFounder(id: string): Promise<CoFounder> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/founders/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch co-founder");
  }

  return res.json();
}

export default async function CoFounderDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const coFounder = await getCoFounder(id);

  return (
    <div>
        <CoFounderDetailsCard coFounder={coFounder} />
    </div>
  );
}