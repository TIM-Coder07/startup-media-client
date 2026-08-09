"use client";

import Image from "next/image";
import type { FounderProfile } from "./type";

type ViewProfileProps = {
    profile: FounderProfile;
    onEdit: () => void;
};

const ViewProfile = ({
    profile,
    onEdit,
}: ViewProfileProps) => {

    return (
        <div className="mx-auto max-w-4xl px-5 py-10">

            <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-8">

                    <div className="flex flex-col items-center gap-5 md:flex-row">

                        <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-white">

                            <Image
                                src={
                                    profile.profileImage ||
                                    "/default-avatar.png"
                                }
                                alt={profile.name}
                                fill
                                className="object-cover"
                            />

                        </div>

                        <div className="text-center md:text-left">

                            <h1 className="text-3xl font-bold text-white">
                                {profile.name}
                            </h1>

                            <p className="mt-1 text-indigo-100">
                                {profile.email}
                            </p>

                            <p className="mt-1 text-indigo-100">
                                {profile.location}
                            </p>

                        </div>

                    </div>

                </div>

                {/* Body */}
                <div className="space-y-6 p-8">

                    <div className="grid gap-5 md:grid-cols-2">

                        <div className="rounded-xl bg-gray-50 p-5">
                            <h3 className="mb-2 text-sm font-semibold text-gray-500">
                                Industry
                            </h3>

                            <p className="font-medium text-gray-800">
                                {profile.industry}
                            </p>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-5">
                            <h3 className="mb-2 text-sm font-semibold text-gray-500">
                                Experience
                            </h3>

                            <p className="font-medium text-gray-800">
                                {profile.experience}
                            </p>
                        </div>

                    </div>

                    {/* Skills */}
                    <div>

                        <h2 className="mb-3 text-lg font-bold text-gray-800">
                            Skills
                        </h2>

                        <div className="flex flex-wrap gap-2">

                            {profile.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700"
                                >
                                    {skill}
                                </span>
                            ))}

                        </div>

                    </div>

                    {/* Bio */}
                    <div>

                        <h2 className="mb-3 text-lg font-bold text-gray-800">
                            About
                        </h2>

                        <p className="leading-7 text-gray-600">
                            {profile.bio}
                        </p>

                    </div>

                    {/* LinkedIn */}
                    {profile.linkedin && (
                        <a
                            href={profile.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex rounded-xl border border-indigo-600 px-5 py-3 font-semibold text-indigo-600 hover:bg-indigo-50"
                        >
                            View LinkedIn
                        </a>
                    )}

                    {/* Edit */}
                    <div className="border-t pt-6">

                        <button
                            type="button"
                            onClick={onEdit}
                            className="rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white hover:bg-indigo-700"
                        >
                            Edit Profile
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ViewProfile;