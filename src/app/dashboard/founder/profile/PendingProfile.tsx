"use client";

import { Clock } from "lucide-react";

const PendingProfile = () => {
    return (
        <div className="mx-auto max-w-2xl px-5 py-20">
            <div className="rounded-2xl border bg-white p-10 text-center shadow-lg">

                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
                    <Clock
                        size={40}
                        className="text-yellow-600"
                    />
                </div>

                <h1 className="text-3xl font-bold text-gray-800">
                    Profile Under Review
                </h1>

                <p className="mt-4 leading-7 text-gray-500">
                    Your founder profile has been submitted
                    successfully and is currently waiting for
                    admin approval.
                </p>

                <div className="mt-6 rounded-xl bg-yellow-50 p-4">
                    <p className="font-medium text-yellow-700">
                        Status: Pending Approval
                    </p>
                </div>

                <p className="mt-5 text-sm text-gray-400">
                    Once an admin approves your profile,
                    it will become visible on the Founders page.
                </p>

            </div>
        </div>
    );
};

export default PendingProfile;