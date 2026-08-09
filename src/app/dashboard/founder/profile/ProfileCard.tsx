"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import type { FounderProfile } from "./type";

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

type ProfileCardProps = {
    profile?: FounderProfile | null;
    onSuccess: (data: FounderProfile) => void;
};

const ProfileCard = ({
    profile,
    onSuccess,
}: ProfileCardProps) => {

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<FounderForm>({
        defaultValues: profile
            ? {
                name: profile.name,
                email: profile.email,
                industry: profile.industry,
                experience: profile.experience,
                location: profile.location,
                linkedin: profile.linkedin,
                profileImage: profile.profileImage,
                skills: profile.skills.join(", "),
                bio: profile.bio,
            }
            : undefined,
    });


    const submitForm = async (
        data: FounderForm
    ) => {
        try {

            const founderData: FounderProfile = {
                ...data,

                skills: data.skills
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter(Boolean),
            };


            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/founder-requests`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify(founderData),
                }
            );


            const result = await res.json();


            if (!res.ok) {
                throw new Error(
                    result.message ||
                    "Failed to submit profile request"
                );
            }


            toast.success(
                "Profile request sent to admin!"
            );


            // Update parent state
            onSuccess(founderData);

            reset();

        } catch (error) {

            console.error(error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to submit profile"
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
                    onSubmit={handleSubmit(submitForm)}
                >

                    {/* Name & Email */}

                    <div className="grid gap-6 md:grid-cols-2">

                        <div>

                            <label className="mb-2 block font-medium">
                                Full Name
                            </label>

                            <input
                                type="text"
                                {...register("name")}
                                placeholder="Enter your full name"
                                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-indigo-500"
                            />

                        </div>


                        <div>

                            <label className="mb-2 block font-medium">
                                Email
                            </label>

                            <input
                                type="email"
                                {...register("email")}
                                placeholder="Enter your email"
                                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-indigo-500"
                            />

                        </div>

                    </div>


                    {/* Industry */}

                    <div>

                        <label className="mb-2 block font-medium">
                            Industry
                        </label>

                        <input
                            type="text"
                            {...register("industry")}
                            placeholder="MarTech"
                            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-indigo-500"
                        />

                    </div>


                    {/* Experience & Location */}

                    <div className="grid gap-6 md:grid-cols-2">

                        <div>

                            <label className="mb-2 block font-medium">
                                Experience
                            </label>

                            <input
                                type="text"
                                {...register("experience")}
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
                                {...register("location")}
                                placeholder="Dhaka, Bangladesh"
                                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-indigo-500"
                            />

                        </div>

                    </div>


                    {/* LinkedIn */}

                    <div>

                        <label className="mb-2 block font-medium">
                            LinkedIn
                        </label>

                        <input
                            type="url"
                            {...register("linkedin")}
                            placeholder="https://linkedin.com/in/username"
                            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-indigo-500"
                        />

                    </div>


                    {/* Profile Image */}

                    <div>

                        <label className="mb-2 block font-medium">
                            Profile Image URL
                        </label>

                        <input
                            type="url"
                            {...register("profileImage")}
                            placeholder="https://example.com/profile.jpg"
                            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-indigo-500"
                        />

                    </div>


                    {/* Skills */}

                    <div>

                        <label className="mb-2 block font-medium">
                            Skills
                        </label>

                        <input
                            type="text"
                            {...register("skills")}
                            placeholder="React, Next.js, Node.js"
                            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-indigo-500"
                        />

                        <p className="mt-2 text-sm text-gray-500">
                            Separate multiple skills with commas.
                        </p>

                    </div>


                    {/* Bio */}

                    <div>

                        <label className="mb-2 block font-medium">
                            Bio
                        </label>

                        <textarea
                            {...register("bio")}
                            rows={5}
                            placeholder="Tell us about yourself..."
                            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-indigo-500"
                        />

                    </div>


                    {/* Submit */}

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