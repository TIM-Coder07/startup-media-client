"use client";

import { useEffect } from "react";

import {
    useForm,
} from "react-hook-form";

import toast from "react-hot-toast";

import type {
    FounderProfile,
} from "./type";


type FounderForm = {
    name: string;
    email: string;
    industry: string;
    experience: string;
    location: string;
    linkedin: string;
    profileImage: string;
    skills: string;
    bio: string;
};


type Session = {
    user?: {
        name?: string;
        email?: string;
        role?: string;
    };
};


type ProfileCardProps = {
    session: Session | null;

    profile?:
        | FounderProfile
        | null;

    onSuccess:
        (
            data: FounderProfile
        ) => void;
};


const ProfileCard = ({
    profile,
    onSuccess,
    session,
}: ProfileCardProps) => {


    // =================================================
    // FORM
    // =================================================

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<FounderForm>({

        defaultValues: {

            name:
                profile?.name ??
                session?.user?.name ??
                "",

            email:
                profile?.email ??
                session?.user?.email ??
                "",

            industry:
                profile?.industry ??
                "",

            experience:
                profile?.experience ??
                "",

            location:
                profile?.location ??
                "",

            linkedin:
                profile?.linkedin ??
                "",

            profileImage:
                profile?.profileImage ??
                "",

            skills:
                profile?.skills?.join(
                    ", "
                ) ?? "",

            bio:
                profile?.bio ??
                "",
        },
    });


    // =================================================
    // RESET WHEN PROFILE / SESSION CHANGES
    // =================================================

    useEffect(() => {

        reset({

            name:
                profile?.name ??
                session?.user?.name ??
                "",

            email:
                profile?.email ??
                session?.user?.email ??
                "",

            industry:
                profile?.industry ??
                "",

            experience:
                profile?.experience ??
                "",

            location:
                profile?.location ??
                "",

            linkedin:
                profile?.linkedin ??
                "",

            profileImage:
                profile?.profileImage ??
                "",

            skills:
                profile?.skills?.join(
                    ", "
                ) ?? "",

            bio:
                profile?.bio ??
                "",
        });

    }, [
        profile,
        session,
        reset,
    ]);


    // =================================================
    // SUBMIT
    // =================================================

    const submitForm = async (data: FounderForm) => {
    try {
        const founderData = {
            ...data,

            skills: data.skills
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean),
        };

        let res: Response;

        // ==========================================
        // EDIT EXISTING PROFILE
        // ==========================================

        if (profile?._id) {
            res = await fetch(
                `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/founders/${profile._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(founderData),
                }
            );
        }

        // ==========================================
        // CREATE NEW PROFILE REQUEST
        // ==========================================

        else {
            res = await fetch(
                `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/founder-requests`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(founderData),
                }
            );
        }

        const result = await res.json();

        console.log("Profile response:", result);

        if (!res.ok) {
            throw new Error(
                result.message ||
                "Failed to save profile"
            );
        }

        // ==========================================
        // EDIT SUCCESS
        // ==========================================

        if (profile?._id) {
            toast.success(
                "Profile updated successfully"
            );

            onSuccess(result.founder);

            return;
        }

        // ==========================================
        // NEW PROFILE SUCCESS
        // ==========================================

        toast.success(
            "Profile submitted for approval"
        );

        onSuccess({
            ...result.request,
            status: "pending",
        });

    } catch (error) {
        console.error(
            "Profile submit error:",
            error
        );

        toast.error(
            error instanceof Error
                ? error.message
                : "Something went wrong"
        );
    }
};


    return (

        <div className="mx-auto max-w-4xl px-5 py-10">

            <div className="rounded-2xl bg-white p-8 shadow-lg">

                <h1 className="mb-8 text-3xl font-bold">
                    Founder Profile
                </h1>


                <form
                    className="space-y-6"

                    onSubmit={
                        handleSubmit(
                            submitForm
                        )
                    }
                >


                    {/* =================================================
                        NAME + EMAIL
                    ================================================= */}

                    <div className="grid gap-6 md:grid-cols-2">

                        {/* NAME */}

                        <div>

                            <label className="mb-2 block font-medium">
                                Full Name
                            </label>


                            <input
                                type="text"

                                {...register(
                                    "name"
                                )}

                                readOnly

                                className="w-full rounded-xl border bg-gray-100 px-4 py-3 outline-none"
                            />

                        </div>


                        {/* EMAIL */}

                        <div>

                            <label className="mb-2 block font-medium">
                                Email
                            </label>


                            <input
                                type="email"

                                {...register(
                                    "email"
                                )}

                                readOnly

                                className="w-full rounded-xl border bg-gray-100 px-4 py-3 outline-none"
                            />

                        </div>

                    </div>


                    {/* =================================================
                        INDUSTRY
                    ================================================= */}

                    <div>

                        <label className="mb-2 block font-medium">
                            Industry
                        </label>


                        <input
                            type="text"

                            {...register(
                                "industry"
                            )}

                            placeholder="MarTech"

                            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-indigo-500"
                        />

                    </div>


                    {/* =================================================
                        EXPERIENCE + LOCATION
                    ================================================= */}

                    <div className="grid gap-6 md:grid-cols-2">

                        <div>

                            <label className="mb-2 block font-medium">
                                Experience
                            </label>


                            <input
                                type="text"

                                {...register(
                                    "experience"
                                )}

                                placeholder="7 years"

                                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-indigo-500"
                            />

                        </div>


                        <div>

                            <label className="mb-2 block font-medium">
                                Location
                            </label>


                            <input
                                type="text"

                                {...register(
                                    "location"
                                )}

                                placeholder="Dhaka, Bangladesh"

                                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-indigo-500"
                            />

                        </div>

                    </div>


                    {/* =================================================
                        LINKEDIN
                    ================================================= */}

                    <div>

                        <label className="mb-2 block font-medium">
                            LinkedIn
                        </label>


                        <input
                            type="url"

                            {...register(
                                "linkedin"
                            )}

                            placeholder="https://linkedin.com/in/username"

                            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-indigo-500"
                        />

                    </div>


                    {/* =================================================
                        PROFILE IMAGE
                    ================================================= */}

                    <div>

                        <label className="mb-2 block font-medium">
                            Profile Image URL
                        </label>


                        <input
                            type="url"

                            {...register(
                                "profileImage"
                            )}

                            placeholder="https://example.com/profile.jpg"

                            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-indigo-500"
                        />

                    </div>


                    {/* =================================================
                        SKILLS
                    ================================================= */}

                    <div>

                        <label className="mb-2 block font-medium">
                            Skills
                        </label>


                        <input
                            type="text"

                            {...register(
                                "skills"
                            )}

                            placeholder="React, Next.js, Node.js"

                            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-indigo-500"
                        />


                        <p className="mt-2 text-sm text-gray-500">
                            Separate multiple skills
                            with commas.
                        </p>

                    </div>


                    {/* =================================================
                        BIO
                    ================================================= */}

                    <div>

                        <label className="mb-2 block font-medium">
                            Bio
                        </label>


                        <textarea
                            {...register(
                                "bio"
                            )}

                            rows={5}

                            placeholder="Tell us about yourself..."

                            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-indigo-500"
                        />

                    </div>


                    {/* =================================================
                        SUBMIT
                    ================================================= */}

                    <button
                        type="submit"

                        className="rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-700"
                    >

                        {profile
                            ? "Update Profile"
                            : "Send for Approval"}

                    </button>

                </form>

            </div>

        </div>
    );
};


export default ProfileCard;