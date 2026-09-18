"use client";

import { useEffect, useState } from "react";

import ProfileCard from "./ProfileCard";
import ViewProfile from "./ViewProfile";

import type { FounderProfile } from "./type";


type ProfileStatus =
    | "pending"
    | "approved"
    | "rejected"
    | "suspended"
    | "disabled";


type Session = {
    user?: {
        name?: string;
        email?: string;
        role?: string;
    };
};


type ProfileContainerProps = {
    session: Session | null;
};


const ProfileContainer = ({
    session,
}: ProfileContainerProps) => {

    const [profile, setProfile] =
        useState<FounderProfile | null>(
            null
        );


    const [status, setStatus] =
        useState<ProfileStatus | null>(
            null
        );


    const [isEditing, setIsEditing] =
        useState(false);


    const [loading, setLoading] =
        useState(true);


    // =================================================
    // GET PROFILE STATUS
    // =================================================

    useEffect(() => {

        const getProfileStatus =
            async () => {

                try {

                    const email =
                        session?.user?.email;


                    console.log(
                        "Session email:",
                        email
                    );


                    // ---------------------------------
                    // No session
                    // ---------------------------------

                    if (!email) {

                        setProfile(null);
                        setStatus(null);

                        return;
                    }


                    // ---------------------------------
                    // API URL
                    // ---------------------------------

                    const url =
                        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}` +
                        `/founder-requests/me?email=${encodeURIComponent(
                            email
                        )}`;


                    console.log(
                        "Profile API:",
                        url
                    );


                    // ---------------------------------
                    // Fetch
                    // ---------------------------------

                    const res =
                        await fetch(
                            url,
                            {
                                cache:
                                    "no-store",
                            }
                        );


                    const data =
                        await res.json();


                    console.log(
                        "Profile API response:",
                        data
                    );


                    // =================================================
                    // NO PROFILE + NO REQUEST
                    // =================================================

                    if (
                        res.status ===
                        404
                    ) {

                        console.log(
                            "No founder profile found."
                        );


                        setProfile(
                            null
                        );

                        setStatus(
                            null
                        );


                        return;
                    }


                    // =================================================
                    // ERROR
                    // =================================================

                    if (!res.ok) {

                        throw new Error(
                            data.message ||
                                "Failed to fetch profile"
                        );
                    }


                    // =================================================
                    // PROFILE / REQUEST FOUND
                    // =================================================

                    setProfile(
                        data.data ??
                            null
                    );


                    setStatus(
                        data.status ??
                            null
                    );

                } catch (error) {

                    console.error(
                        "Failed to fetch profile:",
                        error
                    );


                    setProfile(
                        null
                    );


                    setStatus(
                        null
                    );

                } finally {

                    setLoading(
                        false
                    );

                }
            };


        getProfileStatus();

    }, [session]);


    // =================================================
    // LOADING
    // =================================================

    if (loading) {

        return (
            <div className="py-20 text-center">

                Loading profile...

            </div>
        );
    }


    // =================================================
    // EDITING
    // =================================================

    if (isEditing) {

        return (
            <ProfileCard

                session={session}

                profile={profile}

                onSuccess={(data) => {

                    setProfile(data);

                    setStatus(
                        "pending"
                    );

                    setIsEditing(
                        false
                    );

                }}

            />
        );
    }


    // =================================================
    // APPROVED
    // =================================================

    if (
        status === "approved" &&
        profile
    ) {

        return (
            <ViewProfile

                profile={profile}

                onEdit={() =>
                    setIsEditing(
                        true
                    )
                }

            />
        );
    }


    // =================================================
    // PENDING
    // =================================================

    if (
        status === "pending"
    ) {

        return (
            <div className="mx-auto max-w-2xl px-5 py-20">

                <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">

                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 text-2xl">
                        ⏳
                    </div>


                    <h1 className="text-3xl font-bold">
                        Profile Under Review
                    </h1>


                    <p className="mt-3 text-gray-500">
                        Your founder profile has
                        been submitted successfully.
                    </p>


                    <p className="mt-2 text-gray-500">
                        Please wait for admin approval.
                    </p>


                    <div className="mt-6 inline-block rounded-full bg-yellow-100 px-5 py-2 text-sm font-semibold text-yellow-700">

                        Status: Pending

                    </div>

                </div>

            </div>
        );
    }


    // =================================================
    // REJECTED
    // =================================================

    if (
        status === "rejected"
    ) {

        return (
            <div className="mx-auto max-w-2xl px-5 py-20">

                <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">

                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl">
                        ❌
                    </div>


                    <h1 className="text-3xl font-bold">
                        Profile Request Rejected
                    </h1>


                    <p className="mt-3 text-gray-500">
                        Your founder profile request
                        was rejected by the admin.
                    </p>


                    <button
                        onClick={() =>
                            setIsEditing(
                                true
                            )
                        }
                        className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
                    >
                        Submit Again
                    </button>

                </div>

            </div>
        );
    }


    // =================================================
    // SUSPENDED
    // =================================================

    if (
        status === "suspended"
    ) {

        return (
            <div className="mx-auto max-w-2xl px-5 py-20">

                <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">

                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-2xl">
                        ⚠️
                    </div>


                    <h1 className="text-3xl font-bold">
                        Account Suspended
                    </h1>


                    <p className="mt-3 text-gray-500">
                        Your founder account has
                        been temporarily suspended
                        by the admin.
                    </p>

                </div>

            </div>
        );
    }


    // =================================================
    // DISABLED
    // =================================================

    if (
        status === "disabled"
    ) {

        return (
            <div className="mx-auto max-w-2xl px-5 py-20">

                <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">

                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl">
                        🚫
                    </div>


                    <h1 className="text-3xl font-bold">
                        Account Disabled
                    </h1>


                    <p className="mt-3 text-gray-500">
                        Your founder account has
                        been disabled by the admin.
                    </p>

                </div>

            </div>
        );
    }


    // =================================================
    // NO PROFILE
    // =================================================
    // This is the important part.
    //
    // founders collection থেকে delete হলে
    // backend 404 পাঠাবে।
    //
    // তখন profile = null
    // status = null
    //
    // এবং এই ProfileCard render হবে।
    // =================================================

    return (
        <ProfileCard

            session={session}

            profile={null}

            onSuccess={(data) => {

                setProfile(data);

                setStatus(
                    "pending"
                );

            }}

        />
    );
};


export default ProfileContainer;