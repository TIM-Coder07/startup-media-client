"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import RequestCard from "./RequestCard";
import type { FounderRequest } from "./type";

const AdminReq = () => {
    const [requests, setRequests] =
        useState<FounderRequest[]>([]);

    const [loading, setLoading] =
        useState(true);

    // ==========================================
    // FETCH REQUESTS
    // ==========================================

    const fetchRequests = async () => {
        try {
            setLoading(true);

            const url =
                `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}` +
                `/api/founder-requests`;

            console.log(
                "Fetching requests:",
                url
            );

            const res = await fetch(url, {
                cache: "no-store",
            });

            const data = await res.json();

            console.log(
                "Admin requests response:",
                data
            );

            if (!res.ok) {
                throw new Error(
                    data.message ||
                    "Failed to fetch requests"
                );
            }

            setRequests(
                data.requests ?? []
            );

        } catch (error) {
            console.error(
                "Fetch requests error:",
                error
            );

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to fetch requests"
            );

            setRequests([]);

        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchRequests();
    }, []);


    // ==========================================
    // APPROVE
    // ==========================================

    const handleApprove = async (
        id: string
    ) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}` +
                `/api/founder-requests/${id}/approve`,
                {
                    method: "PATCH",
                }
            );

            const data =
                await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message ||
                    "Failed to approve request"
                );
            }

            toast.success(
                "Founder approved successfully!"
            );

            setRequests((prev) =>
                prev.filter(
                    (request) =>
                        request._id !== id
                )
            );

        } catch (error) {
            console.error(error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to approve founder"
            );
        }
    };


    // ==========================================
    // REJECT
    // ==========================================

    const handleReject = async (
        id: string
    ) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}` +
                `/api/founder-requests/${id}/reject`,
                {
                    method: "PATCH",
                }
            );

            const data =
                await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message ||
                    "Failed to reject request"
                );
            }

            toast.success(
                "Founder request rejected"
            );

            setRequests((prev) =>
                prev.filter(
                    (request) =>
                        request._id !== id
                )
            );

        } catch (error) {
            console.error(error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to reject request"
            );
        }
    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="py-20 text-center">
                Loading requests...
            </div>
        );
    }


    // ==========================================
    // UI
    // ==========================================

    return (
        <div className="mx-auto max-w-7xl px-5 py-10">

            <div className="mb-10">

                <h1 className="text-3xl font-bold">
                    Founder Requests
                </h1>

                <p className="mt-2 text-gray-500">
                    Review founder profiles before
                    publishing them.
                </p>

            </div>


            {requests.length === 0 ? (

                <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

                    <h2 className="text-xl font-semibold">
                        No pending requests
                    </h2>

                    <p className="mt-2 text-gray-500">
                        New founder requests will
                        appear here.
                    </p>

                </div>

            ) : (

                <div className="grid gap-6 md:grid-cols-2">

                    {requests.map(
                        (request) => (

                            <RequestCard
                                key={
                                    request._id
                                }
                                request={
                                    request
                                }
                                onApprove={
                                    handleApprove
                                }
                                onReject={
                                    handleReject
                                }
                            />

                        )
                    )}

                </div>

            )}

        </div>
    );
};

export default AdminReq;