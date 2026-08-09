"use client";

import { useEffect, useState } from "react";

import ProfileCard from "./ProfileCard";
import ViewProfile from "./ViewProfile";

import type { FounderProfile } from "./type";


const ProfileContainer = () => {

    const [profile, setProfile] =
        useState<FounderProfile | null>(null);

    const [isEditing, setIsEditing] =
        useState(false);


    useEffect(() => {

        const getProfile = async () => {

            try {

                const email =
                    localStorage.getItem("email");


                if (!email) {
                    setProfile(null);
                    return;
                }


                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/founders/me?email=${encodeURIComponent(email)}`
                );


                const data = await res.json();


                if (!res.ok) {

                    if (res.status === 404) {
                        setProfile(null);
                        return;
                    }

                    throw new Error(
                        data.message ||
                        "Failed to fetch profile"
                    );
                }

                setProfile(data);

            } catch (error) {

                console.error(
                    "Failed to fetch profile:",
                    error
                );

                setProfile(null);

            }
        };


        getProfile();

    }, []);

    // Edit profile
    if (isEditing) {

        return (
            <ProfileCard
                profile={profile}

                onSuccess={(data) => {
                    setProfile(data);
                    setIsEditing(false);
                }}
            />
        );
    }


    // Approved profile exists
    if (profile) {

        return (
            <ViewProfile
                profile={profile}
                onEdit={() => setIsEditing(true)}
            />
        );
    }


    // No approved profile
    return (
        <ProfileCard
            onSuccess={(data) => {
                setProfile(data);
            }}
        />
    );
};


export default ProfileContainer;