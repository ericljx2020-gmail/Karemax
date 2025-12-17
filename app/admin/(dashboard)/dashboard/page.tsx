import { PrismaClient } from "@prisma/client";
import { Package, MessageSquare } from "lucide-react";

const prisma = new PrismaClient();

async function getStats() {
    const productCount = await prisma.product.count();
    const inquiryCount = await prisma.inquiry.count();
    const newInquiryCount = await prisma.inquiry.count({
        where: { status: "NEW" },
    });

    return { productCount, inquiryCount, newInquiryCount };
}

export default async function DashboardPage() {
    const stats = await getStats();

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <div className="flex items-center">
                        <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                            <Package className="h-6 w-6" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Total Products</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.productCount}</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <div className="flex items-center">
                        <div className="rounded-full bg-green-100 p-3 text-green-600">
                            <MessageSquare className="h-6 w-6" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Total Inquiries</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.inquiryCount}</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <div className="flex items-center">
                        <div className="rounded-full bg-yellow-100 p-3 text-yellow-600">
                            <MessageSquare className="h-6 w-6" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">New Inquiries</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.newInquiryCount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
