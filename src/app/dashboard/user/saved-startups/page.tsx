"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Image from "next/image";

type SavedStartup = {
    _id: string;
    startupTitle: string;
    startupImage: string;
    founderId: string;
    investorEmail: string;
    createdAt: string;
};

export default function SavedStartupsPage() {
    const { data: session } = authClient.useSession();
    console.log("Session:", session);
    console.log("Email:", session?.user?.email);

    const [savedStartups, setSavedStartups] = useState<SavedStartup[]>([]);

    useEffect(() => {
        if (!session?.user?.email) return;

        fetch(
            `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/saved-founders?email=${session.user.email}`
        )
            .then((res) => res.json())
            .then((data) => setSavedStartups(data));
    }, [session]);

    return (
        <div className="mx-auto max-w-7xl px-6 py-10">
            <h1 className="mb-8 text-3xl font-bold">Saved Startups</h1>

            {savedStartups.length === 0 ? (
                <p className="text-gray-500">No saved startups.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {savedStartups.map((startup) => (
                        <div
                            key={startup._id}
                            className="overflow-hidden rounded-xl border bg-white shadow"
                        >
                            <Image
                                src={startup.startupImage}
                                alt={startup.startupTitle}
                                width={500}
                                height={300}
                                className="h-52 w-full object-cover"
                            />

                            <div className="p-5">
                                <h2 className="text-xl font-bold">
                                    {startup.startupTitle}
                                </h2>

                                <p className="mt-2 text-gray-600">
                                    Founder: {startup.founderId}
                                </p>

                                <p className="mt-2 text-sm text-gray-500">
                                    Saved on{" "}
                                    {new Date(startup.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}