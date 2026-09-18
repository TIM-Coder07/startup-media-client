"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Trash2, Ban, Pause, CheckCircle } from "lucide-react";

type Founder = {
    _id: string;
    name: string;
    email: string;
    industry: string;
    experience: string;
    location: string;
    linkedin: string;
    profileImage: string;
    skills: string[];
    bio: string;
    status: "approved" | "suspended" | "disabled";
    createdAt: string;
    updatedAt: string;
};

const AdminActions = () => {
    const [founders, setFounders] = useState<Founder[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const API_URL =
        process.env.NEXT_PUBLIC_BETTER_AUTH_URL;

    // ==========================================
    // GET ALL FOUNDERS
    // ==========================================

    const fetchFounders = async () => {
        try {
            setLoading(true);

            const res = await fetch(
                `${API_URL}/api/founders`,
                {
                    cache: "no-store",
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message ||
                    "Failed to fetch founders"
                );
            }

            setFounders(data.founders || []);
        } catch (error) {
            console.error(error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to fetch founders"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFounders();
    }, []);

    // ==========================================
    // UPDATE STATUS
    // ==========================================

    const updateStatus = async (
        id: string,
        status: "approved" | "suspended" | "disabled"
    ) => {
        try {
            setActionLoading(id);

            const res = await fetch(
                `${API_URL}/api/founders/${id}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        status,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message ||
                    "Failed to update status"
                );
            }

            // Update UI immediately
            setFounders((prev) =>
                prev.map((founder) =>
                    founder._id === id
                        ? {
                              ...founder,
                              status,
                          }
                        : founder
                )
            );

            toast.success(
                data.message ||
                "Status updated successfully"
            );
        } catch (error) {
            console.error(error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to update status"
            );
        } finally {
            setActionLoading(null);
        }
    };

    // ==========================================
    // DELETE FOUNDER
    // ==========================================

    const deleteFounder = async (
        id: string,
        name: string
    ) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${name}?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setActionLoading(id);

            const res = await fetch(
                `${API_URL}/api/founders/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message ||
                    "Failed to delete founder"
                );
            }

            // Remove from UI
            setFounders((prev) =>
                prev.filter(
                    (founder) =>
                        founder._id !== id
                )
            );

            toast.success(
                "Founder deleted successfully"
            );
        } catch (error) {
            console.error(error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to delete founder"
            );
        } finally {
            setActionLoading(null);
        }
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="py-20 text-center">
                Loading founders...
            </div>
        );
    }

    // ==========================================
    // UI
    // ==========================================

    return (
        <div className="mx-auto max-w-7xl px-5 py-10">

            {/* Header */}

            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Manage Founders
                </h1>

                <p className="mt-2 text-gray-500">
                    Manage founder accounts, status,
                    suspension and access.
                </p>
            </div>

            {/* Empty */}

            {founders.length === 0 ? (
                <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
                    <h2 className="text-xl font-semibold">
                        No founders found
                    </h2>

                    <p className="mt-2 text-gray-500">
                        There are currently no founder
                        profiles.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                    {founders.map((founder) => (

                        <div
                            key={founder._id}
                            className="overflow-hidden rounded-2xl border bg-white shadow-sm"
                        >

                            {/* Profile */}

                            <div className="p-6">

                                <div className="flex items-start gap-4">

                                    {founder.profileImage ? (
                                        <img
                                            src={
                                                founder.profileImage
                                            }
                                            alt={
                                                founder.name
                                            }
                                            className="h-16 w-16 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-xl font-bold">
                                            {founder.name
                                                ?.charAt(0)
                                                .toUpperCase()}
                                        </div>
                                    )}

                                    <div className="min-w-0">

                                        <h2 className="truncate text-xl font-bold">
                                            {founder.name}
                                        </h2>

                                        <p className="truncate text-sm text-gray-500">
                                            {founder.email}
                                        </p>

                                        <StatusBadge
                                            status={
                                                founder.status
                                            }
                                        />

                                    </div>

                                </div>

                                {/* Information */}

                                <div className="mt-6 space-y-3">

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Industry
                                        </p>

                                        <p className="font-medium">
                                            {
                                                founder.industry
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Experience
                                        </p>

                                        <p className="font-medium">
                                            {
                                                founder.experience
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Location
                                        </p>

                                        <p className="font-medium">
                                            {
                                                founder.location
                                            }
                                        </p>
                                    </div>

                                </div>

                                {/* Skills */}

                                <div className="mt-5">

                                    <p className="mb-2 text-sm font-semibold">
                                        Skills
                                    </p>

                                    <div className="flex flex-wrap gap-2">

                                        {founder.skills?.map(
                                            (
                                                skill
                                            ) => (
                                                <span
                                                    key={
                                                        skill
                                                    }
                                                    className="rounded-full bg-indigo-50 px-3 py-1 text-xs text-indigo-700"
                                                >
                                                    {
                                                        skill
                                                    }
                                                </span>
                                            )
                                        )}

                                    </div>

                                </div>

                            </div>

                            {/* Actions */}

                            <div className="border-t bg-gray-50 p-4">

                                <div className="grid grid-cols-2 gap-2">

                                    {/* Suspend */}

                                    {founder.status !==
                                        "suspended" && (
                                        <button
                                            disabled={
                                                actionLoading ===
                                                founder._id
                                            }
                                            onClick={() =>
                                                updateStatus(
                                                    founder._id,
                                                    "suspended"
                                                )
                                            }
                                            className="flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
                                        >
                                            <Pause
                                                size={16}
                                            />
                                            Suspend
                                        </button>
                                    )}

                                    {/* Disable */}

                                    {founder.status !==
                                        "disabled" && (
                                        <button
                                            disabled={
                                                actionLoading ===
                                                founder._id
                                            }
                                            onClick={() =>
                                                updateStatus(
                                                    founder._id,
                                                    "disabled"
                                                )
                                            }
                                            className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                                        >
                                            <Ban
                                                size={16}
                                            />
                                            Disable
                                        </button>
                                    )}

                                    {/* Activate */}

                                    {founder.status !==
                                        "approved" && (
                                        <button
                                            disabled={
                                                actionLoading ===
                                                founder._id
                                            }
                                            onClick={() =>
                                                updateStatus(
                                                    founder._id,
                                                    "approved"
                                                )
                                            }
                                            className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                                        >
                                            <CheckCircle
                                                size={16}
                                            />
                                            Activate
                                        </button>
                                    )}

                                    {/* Delete */}

                                    <button
                                        disabled={
                                            actionLoading ===
                                            founder._id
                                        }
                                        onClick={() =>
                                            deleteFounder(
                                                founder._id,
                                                founder.name
                                            )
                                        }
                                        className="flex items-center justify-center gap-2 rounded-lg bg-gray-800 px-3 py-2 text-sm font-semibold text-white hover:bg-black disabled:opacity-50"
                                    >
                                        <Trash2
                                            size={16}
                                        />
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
};

export default AdminActions;


// ==========================================
// STATUS BADGE
// ==========================================

const StatusBadge = ({
    status,
}: {
    status: Founder["status"];
}) => {

    if (status === "approved") {
        return (
            <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Approved
            </span>
        );
    }

    if (status === "suspended") {
        return (
            <span className="mt-2 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                Suspended
            </span>
        );
    }

    return (
        <span className="mt-2 inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
            Disabled
        </span>
    );
};