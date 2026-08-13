"use client";

import { useEffect, useState } from "react";

import RequestCard from "./RequestCard";
import type { FounderRequest } from "./type";

import toast from "react-hot-toast";


const AdminReq = () => {

    const [requests, setRequests] =
        useState<FounderRequest[]>([]);

    const [loading, setLoading] =
        useState(true);


    const fetchRequests = async () => {

        try {

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/founder-requests`
            );


            const data = await res.json();


            if (!res.ok) {
                throw new Error(
                    data.message ||
                    "Failed to fetch requests"
                );
            }


            setRequests(data);

        } catch (error) {

            console.error(error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to fetch requests"
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {
        fetchRequests();
    }, []);


    const handleApprove = async (
        id: string
    ) => {

        try {

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/founder-requests/${id}/approve`,
                {
                    method: "PATCH",
                }
            );


            const data = await res.json();


            if (!res.ok) {
                throw new Error(
                    data.message ||
                    "Failed to approve request"
                );
            }


            toast.success(
                "Founder approved successfully!"
            );


            // Remove from pending list
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


    const handleReject = async (
        id: string
    ) => {

        try {

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/founder-requests/${id}/reject`,
                {
                    method: "PATCH",
                }
            );


            const data = await res.json();


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


    if (loading) {

        return (
            <div className="py-20 text-center">
                Loading requests...
            </div>
        );
    }


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
                        New founder requests will appear here.
                    </p>

                </div>

            ) : (

                <div className="grid gap-6 md:grid-cols-2">

                    {requests.map((request) => (

                        <RequestCard
                            key={request._id}
                            request={request}
                            onApprove={handleApprove}
                            onReject={handleReject}
                        />

                    ))}

                </div>

            )}

        </div>
    );
};


export default AdminReq;