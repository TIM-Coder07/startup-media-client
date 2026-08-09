"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import toast from "react-hot-toast";
import {
    FaBookmark,
    FaBuilding,
    FaEnvelope,
    FaHandshake,
    FaIndustry,
    FaRocket,
    FaDollarSign,
    FaUserTie,
} from "react-icons/fa";

type Startup = {
    _id: string;
    title: string;
    description: string;
    industry: string;
    stage: string;
    fundingGoal: number;
    founderId: string;
    image: string;
    createdAt: string;
    role: string;
};

type Props = {
    startup: Startup;
};

const StartupDetailsCard = ({ startup }: Props) => {
    const { data: session } = authClient.useSession();
    const canInvest = session?.user?.role === "investor";

    const handleInvestClick = async () => {
        if (!session?.user) {
            toast.error("Please login first.");
            return;
        }

        try {
            const application = {
                startupId: startup._id,
                founderId: startup.founderId,
                startupTitle: startup.title,
                startupImage: startup.image,
                fundingGoal: startup.fundingGoal,

                investorId: session.user.id,
                investorName: session.user.name,
                investorEmail: session.user.email,

                status: "Pending",
                createdAt: new Date().toISOString(),
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/applications`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(application),
            });

            const data = await res.json();

            if (data.insertedId) {
                toast.success("Investment request sent.");
            } else {
                toast.error("Failed to send request.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        }
    };

    const handleSaveFounder = async () => {
        if (!session?.user) {
            toast.error("Please login first.");
            return;
        }

        try {
            const saveData = {
                investorId: session.user.id,
                investorName: session.user.name,
                investorEmail: session.user.email,

                founderId: startup.founderId,

                startupId: startup._id,
                startupTitle: startup.title,
                startupImage: startup.image,

                createdAt: new Date().toISOString(),
            };

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/saved-founders`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(saveData),
                }
            );

            const data = await res.json();

            if (res.ok) {
                toast.success("Founder saved successfully.");
            } else {
                toast.error(data.message || "Failed to save founder.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-16">
            <div className="mx-auto max-w-7xl px-6">

                {/* ================= HERO ================= */}
                <div className="relative overflow-hidden rounded-[32px] shadow-2xl">

                    <div className="relative h-[550px]">
                        <Image
                            src={startup.image}
                            alt={startup.title}
                            fill
                            className="object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-black/20" />

                        <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-14">

                            <div className="mb-6 flex flex-wrap gap-3">

                                <span className="rounded-full bg-indigo-500/30 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                                    <FaIndustry className="mr-2 inline" />
                                    {startup.industry}
                                </span>

                                <span className="rounded-full bg-emerald-500/30 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                                    <FaRocket className="mr-2 inline" />
                                    {startup.stage}
                                </span>

                            </div>

                            <h1 className="max-w-3xl text-5xl font-extrabold leading-tight text-white md:text-6xl">
                                {startup.title}
                            </h1>

                            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-200">
                                {startup.description}
                            </p>

                        </div>
                    </div>
                </div>

                {/* ================= CONTENT ================= */}

                <div className="mt-12 grid gap-10 lg:grid-cols-3">

                    {/* LEFT CONTENT */}

                    <div className="space-y-8 lg:col-span-2">

                        {/* Stats */}

                        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                            <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">

                                <FaIndustry className="mb-4 text-3xl text-indigo-600" />

                                <p className="text-sm text-gray-500">
                                    Industry
                                </p>

                                <h3 className="mt-2 text-xl font-bold">
                                    {startup.industry}
                                </h3>

                            </div>

                            <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">

                                <FaRocket className="mb-4 text-3xl text-emerald-600" />

                                <p className="text-sm text-gray-500">
                                    Startup Stage
                                </p>

                                <h3 className="mt-2 text-xl font-bold">
                                    {startup.stage}
                                </h3>

                            </div>

                            <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">

                                <FaDollarSign className="mb-4 text-3xl text-yellow-500" />

                                <p className="text-sm text-gray-500">
                                    Funding Goal
                                </p>

                                <h3 className="mt-2 text-xl font-bold">
                                    ${startup.fundingGoal.toLocaleString()}
                                </h3>

                            </div>

                            <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">

                                <FaUserTie className="mb-4 text-3xl text-sky-600" />

                                <p className="text-sm text-gray-500">
                                    Founder
                                </p>

                                <h3 className="mt-2 break-all text-lg font-bold">
                                    {startup.founderId}
                                </h3>

                            </div>

                        </div>

                        {/* About */}

                        <div className="rounded-3xl bg-white p-10 shadow-lg">

                            <h2 className="mb-6 text-3xl font-bold">
                                About This Startup
                            </h2>

                            <p className="leading-9 text-gray-600">
                                {startup.description}
                            </p>

                        </div>

                        {/* Founder Card */}

                        <div className="rounded-3xl bg-white p-8 shadow-lg">

                            <div className="flex items-center gap-5">

                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">

                                    <FaBuilding className="text-4xl text-indigo-600" />

                                </div>

                                <div>

                                    <h3 className="text-2xl font-bold">
                                        Startup Founder
                                    </h3>

                                    <p className="text-gray-500">
                                        Founder ID
                                    </p>

                                    <p className="font-semibold">
                                        {startup.founderId}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT SIDEBAR */}

                    <div>

                        <div className="sticky top-24 rounded-3xl bg-white p-8 shadow-2xl">

                            <h2 className="text-2xl font-bold">
                                Ready to Invest?
                            </h2>

                            <p className="mt-3 text-gray-500">
                                Connect with this startup and become one of the first investors.
                            </p>

                            <div className="my-8 space-y-5">

                                <div className="flex justify-between">

                                    <span className="text-gray-500">
                                        Industry
                                    </span>

                                    <span className="font-semibold">
                                        {startup.industry}
                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span className="text-gray-500">
                                        Stage
                                    </span>

                                    <span className="font-semibold">
                                        {startup.stage}
                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span className="text-gray-500">
                                        Funding Goal
                                    </span>

                                    <span className="font-semibold text-green-600">
                                        ${startup.fundingGoal.toLocaleString()}
                                    </span>

                                </div>

                            </div>

                            <button
                                onClick={handleInvestClick}
                                disabled={!canInvest}
                                title={!canInvest ? "Only investors can invest" : ""}
                                className={`mb-4 flex w-full items-center justify-center gap-3 rounded-2xl py-4 font-semibold text-white transition ${canInvest
                                    ? "bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 hover:scale-105"
                                    : "cursor-not-allowed bg-gray-400"
                                    }`}
                            >
                                <FaHandshake />
                                Invest Now
                            </button>

                            <button
                                className="mb-4 flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-indigo-600 py-4 font-semibold text-indigo-600 transition hover:bg-indigo-50"
                            >
                                <FaEnvelope />
                                Contact Founder
                            </button>

                            <button
                                onClick={handleSaveFounder}
                                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange-400 to-amber-500 py-4 font-semibold text-white transition hover:scale-105"
                            >
                                <FaBookmark />
                                Save Startup
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default StartupDetailsCard;