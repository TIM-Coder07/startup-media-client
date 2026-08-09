"use client";

import { useSession } from "@/lib/auth-client";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please login first.</div>;
  }

  const user = session.user;

  return (
    <div className="mx-auto max-w-4xl p-8">
      <div className="rounded-3xl bg-white p-8 shadow-xl">
        <div className="flex items-center gap-6">
          <Image
            src={
              user.profilePicture ||
              "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name)
            }
            alt={user.name}
            width={120}
            height={120}
            className="rounded-full border-4 border-indigo-500"
          />

          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>

            <span className="mt-3 inline-block rounded-full bg-indigo-100 px-4 py-2 text-indigo-700">
              {user.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}