import ProfileCard from "./ProfileCard";

async function getProfile() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/profile`,
    {
      cache: "no-store",
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  return res.json();
}

export default async function ProfilePage() {
  const user = await getProfile();

  return (
    <div className="mx-auto max-w-6xl p-8">
      <ProfileCard user={user} />
    </div>
  );
}