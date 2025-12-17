"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function submitInquiry(formData: FormData, products: any[]) {
    const rawFormData = {
        customerName: formData.get("name") as string,
        email: formData.get("email") as string,
        company: formData.get("company") as string,
        message: formData.get("message") as string,
    };

    if (!rawFormData.customerName || !rawFormData.email || products.length === 0) {
        return { success: false, message: "Missing required fields or products." };
    }

    try {
        await prisma.inquiry.create({
            data: {
                ...rawFormData,
                products: JSON.stringify(products),
                status: "NEW",
            },
        });

        revalidatePath("/admin/inquiries");
        return { success: true, message: "Inquiry submitted successfully!" };
    } catch (error) {
        console.error("Failed to submit inquiry:", error);
        return { success: false, message: "Failed to submit inquiry. Please try again." };
    }
}

export async function updateInquiryStatus(id: string, status: string) {
    await prisma.inquiry.update({
        where: { id },
        data: { status },
    });
    revalidatePath("/admin/inquiries");
    revalidatePath(`/admin/inquiries/${id}`);
}
