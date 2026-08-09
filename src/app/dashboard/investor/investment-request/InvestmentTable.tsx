"use client";

import CancelButton from "@/Component/Shared/CancelButton";
import { Table } from "@heroui/react";
import { Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Application = {
    _id: string;
    startupTitle: string;
    investorName: string;
    investorEmail: string;
    fundingGoal: number;
    status: string;
};

type Props = {
    apply: Application[];
};

export default function InvestmentTable({ apply }: Props) {
    const [selectedKeys, setSelectedKeys] = useState<Set<React.Key>>(
        new Set()
    );

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Accepted":
                return "bg-green-100 text-green-700";

            case "Pending":
                return "bg-yellow-100 text-yellow-700";

            case "Rejected":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
            <div className="flex items-center justify-between border-b px-6 py-5">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">
                        Investment Requests
                    </h2>

                    <p className="text-sm text-slate-500">
                        Total Requests: {apply.length}
                    </p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <Table.ScrollContainer>
                        <Table.Content
                            aria-label="Investment Table"
                            selectionMode="multiple"
                            selectedKeys={selectedKeys}
                            onSelectionChange={(keys) =>
                                setSelectedKeys(keys as Set<React.Key>)
                            }
                            className="min-w-[900px]"
                        >
                            <Table.Header>
                                <Table.Column isRowHeader>
                                    Startup
                                </Table.Column>

                                <Table.Column>
                                    Investor
                                </Table.Column>

                                <Table.Column>
                                    Email
                                </Table.Column>

                                <Table.Column>
                                    Funding Goal
                                </Table.Column>

                                <Table.Column>
                                    Status
                                </Table.Column>

                                <Table.Column>
                                    Actions
                                </Table.Column>
                            </Table.Header>

                            <Table.Body>
                                {apply.length === 0 ? (
                                    <Table.Row key="empty">
                                        <Table.Cell>No Startup</Table.Cell>
                                        <Table.Cell>-</Table.Cell>
                                        <Table.Cell>-</Table.Cell>
                                        <Table.Cell>-</Table.Cell>
                                        <Table.Cell>-</Table.Cell>
                                        <Table.Cell>-</Table.Cell>
                                    </Table.Row>
                                ) : (
                                    apply.map((item) => (
                                        <Table.Row key={item._id}>
                                            <Table.Cell>
                                                <div>
                                                    <p className="font-semibold text-slate-800">
                                                        {item.startupTitle}
                                                    </p>
                                                </div>
                                            </Table.Cell>

                                            <Table.Cell>
                                                {item.investorName}
                                            </Table.Cell>

                                            <Table.Cell>
                                                <span className="text-slate-600">
                                                    {item.investorEmail}
                                                </span>
                                            </Table.Cell>

                                            <Table.Cell>
                                                <span className="font-semibold text-emerald-600">
                                                    ${item.fundingGoal.toLocaleString()}
                                                </span>
                                            </Table.Cell>

                                            <Table.Cell>
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                                                        item.status
                                                    )}`}
                                                >
                                                    {item.status}
                                                </span>
                                            </Table.Cell>

                                            <Table.Cell>
                                                <div className="flex items-center gap-2">
                                            <Link href={`/dashboard/investor/investment-request/${item._id}`}>
                                                        <button className="rounded-lg p-2 text-sky-600 transition hover:bg-sky-100">
                                                            <Eye size={18} />
                                                        </button>
                                                    </Link>

                                                    <CancelButton
                                                        id={item._id}
                                                        startupTitle={item.startupTitle}
                                                    />
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                )}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>

            <div className="border-t bg-slate-50 px-6 py-4">
                <p className="text-sm text-slate-500">
                    Selected Items:{" "}
                    <span className="font-semibold text-indigo-600">
                        {selectedKeys.size}
                    </span>
                </p>
            </div>
        </div>
    );
}