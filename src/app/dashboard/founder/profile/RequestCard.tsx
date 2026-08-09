"use client";

import type { FounderRequest } from "./type";

type RequestCardProps = {
    request: FounderRequest;

    onApprove: (id: string) => void;
    onReject: (id: string) => void;
};


const RequestCard = ({
    request,
    onApprove,
    onReject,
}: RequestCardProps) => {

    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <div className="flex items-start justify-between gap-5">

                <div>

                    <h2 className="text-xl font-bold">
                        {request.name}
                    </h2>

                    <p className="text-gray-500">
                        {request.email}
                    </p>

                    <p className="mt-2 text-sm">
                        {request.industry}
                    </p>

                </div>


                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                    Pending
                </span>

            </div>


            <div className="mt-5 grid gap-4 md:grid-cols-2">

                <div>
                    <p className="text-sm text-gray-500">
                        Experience
                    </p>

                    <p className="font-medium">
                        {request.experience}
                    </p>
                </div>


                <div>
                    <p className="text-sm text-gray-500">
                        Location
                    </p>

                    <p className="font-medium">
                        {request.location}
                    </p>
                </div>

            </div>


            <div className="mt-5">

                <p className="mb-2 text-sm font-semibold">
                    Skills
                </p>

                <div className="flex flex-wrap gap-2">

                    {request.skills.map((skill) => (
                        <span
                            key={skill}
                            className="rounded-full bg-indigo-50 px-3 py-1 text-xs text-indigo-700"
                        >
                            {skill}
                        </span>
                    ))}

                </div>

            </div>


            <p className="mt-5 line-clamp-3 text-sm text-gray-600">
                {request.bio}
            </p>


            <div className="mt-6 flex gap-3">

                <button
                    type="button"
                    onClick={() =>
                        onApprove(request._id)
                    }
                    className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
                >
                    Accept
                </button>


                <button
                    type="button"
                    onClick={() =>
                        onReject(request._id)
                    }
                    className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
                >
                    Reject
                </button>

            </div>

        </div>
    );
};


export default RequestCard;