"use client";

import Image from "next/image";
import { Mail } from "lucide-react";
import { LiaLinkedin } from "react-icons/lia";

const founders = [
    {
        id: 1,
        name: "Alex Johnson",
        role: "AI Startup Founder",
        email: "alex@startuphub.com",
        linkedin: "linkedin.com/in/alexjohnson",
        image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600",
    },
    {
        id: 2,
        name: "Sarah Williams",
        role: "Product Designer & Co-Founder",
        email: "sarah@startuphub.com",
        linkedin: "linkedin.com/in/sarahwilliams",
        image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600",
    },
    {
        id: 3,
        name: "David Kim",
        role: "Full Stack Founder",
        email: "david@startuphub.com",
        linkedin: "linkedin.com/in/davidkim",
        image:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600",
    },
    {
        id: 4,
        name: "Emma Davis",
        role: "Startup Mentor",
        email: "emma@startuphub.com",
        linkedin: "linkedin.com/in/emmadavis",
        image:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600",
    },
];

const FeaturedFounders = () => {
    return (
        <section className="mx-auto max-w-7xl px-5 py-16">
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold">Featured Founders</h2>

                <p className="mt-2 text-gray-500 max-w-2xl mx-auto">
                    Meet innovative entrepreneurs, experienced startup mentors, and
                    talented co-founders building the next generation of successful
                    startups.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {founders.map((founder) => (
                    <div
                        key={founder.id}
                        className="overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                    >
                        <div className="relative h-72 w-full">
                            <Image
                                src={founder.image}
                                alt={founder.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="space-y-3 p-5">
                            <div>
                                <h3 className="text-xl font-bold">{founder.name}</h3>

                                <p className="text-sm text-cyan-600">
                                    {founder.role}
                                </p>
                            </div>

                            <div className="space-y-2 text-sm text-gray-600">
                                <p className="flex items-center gap-2">
                                    <Mail size={16} />
                                    {founder.email}
                                </p>

                                <p className="flex items-center gap-2">
                                    <LiaLinkedin size={16} />
                                    {founder.linkedin}
                                </p>
                            </div>

                            <button className="mt-2 w-full rounded-xl bg-cyan-600 py-2 font-medium text-white transition hover:bg-cyan-700">
                                View Profile
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedFounders;