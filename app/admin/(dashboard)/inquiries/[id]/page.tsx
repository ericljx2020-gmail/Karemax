import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Building, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { updateInquiryStatus } from "@/actions/inquiry";

const prisma = new PrismaClient();

export default async function InquiryDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const inquiry = await prisma.inquiry.findUnique({
        where: { id: params.id },
    });

    if (!inquiry) {
        notFound();
    }

    const products = JSON.parse(inquiry.products) as any[];

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
                <Link
                    href="/admin/inquiries"
                    className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary-600"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Inquiries
                </Link>

                <div className="flex gap-2">
                    <form action={updateInquiryStatus.bind(null, inquiry.id, "CONTACTED")}>
                        <Button variant="secondary" size="sm" disabled={inquiry.status === "CONTACTED"}>
                            Mark as Contacted
                        </Button>
                    </form>
                    <form action={updateInquiryStatus.bind(null, inquiry.id, "CLOSED")}>
                        <Button variant="outline" size="sm" disabled={inquiry.status === "CLOSED"}>
                            Close Inquiry
                        </Button>
                    </form>
                </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Inquiry Details</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Received on {new Date(inquiry.createdAt).toLocaleString()}
                    </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                                <User className="h-4 w-4" /> Customer Name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{inquiry.customerName}</dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                                <Mail className="h-4 w-4" /> Email
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{inquiry.email}</dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                                <Building className="h-4 w-4" /> Company
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{inquiry.company || "-"}</dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Message</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-wrap">
                                {inquiry.message || "-"}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            <h3 className="text-lg font-medium text-gray-900 mb-4">Requested Products</h3>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {products.map((product: any, index: number) => (
                        <li key={index} className="px-4 py-4 sm:px-6 flex items-center gap-4">
                            <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">
                                IMG
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">{product.name}</p>
                                <p className="text-xs text-gray-500">ID: {product.id}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
