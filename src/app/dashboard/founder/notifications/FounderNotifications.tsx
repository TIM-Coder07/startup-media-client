"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

type Notification = {
    _id: string;
    title: string;
    message: string;
    action?: string;
    read: boolean;
    createdAt: string;
};

const FounderNotifications = () => {

    const { data: session } =
        authClient.useSession();

    const [notifications, setNotifications] =
        useState<Notification[]>([]);

    useEffect(() => {

        const fetchNotifications =
            async () => {

                const email =
                    session?.user?.email;

                if (!email) {
                    return;
                }

                try {

                    const res =
                        await fetch(
                            `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/notifications/me?email=${encodeURIComponent(email)}`,
                            {
                                cache: "no-store",
                            }
                        );

                    const data =
                        await res.json();

                    if (res.ok) {
                        setNotifications(
                            data.notifications
                        );
                    }

                } catch (error) {

                    console.error(error);

                }
            };

        fetchNotifications();

    }, [session?.user?.email]);

    return (
        <div className="mx-auto max-w-3xl p-6">

            <h1 className="text-3xl font-bold">
                Notifications
            </h1>


            {notifications.length === 0 ? (

                <div className="mt-8 rounded-xl border p-8 text-center">
                    No notifications
                </div>

            ) : (

                <div className="mt-8 space-y-4">

                    {notifications.map(
                        (notification) => (

                            <div
                                key={
                                    notification._id
                                }
                                className={`rounded-xl border p-5 ${notification.read
                                        ? "bg-white"
                                        : "bg-blue-50"
                                    }`}
                            >

                                <div className="flex justify-between">

                                    <h2 className="font-bold">
                                        {
                                            notification.title
                                        }
                                    </h2>

                                    {!notification.read && (
                                        <span className="rounded-full bg-blue-600 px-3 py-1 text-xs text-white">
                                            New
                                        </span>
                                    )}

                                </div>

                                <p className="mt-2 text-gray-600">
                                    {
                                        notification.message
                                    }
                                </p>


                                <p className="mt-3 text-xs text-gray-400">
                                    {new Date(
                                        notification.createdAt
                                    ).toLocaleString()}
                                </p>

                            </div>

                        )
                    )}

                </div>

            )}

        </div>
    );
};

export default FounderNotifications;