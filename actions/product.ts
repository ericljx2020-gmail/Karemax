"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function createProduct(formData: FormData) {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const imageUrl = formData.get("imageUrl") as string; // Simplified for MVP (URL input)

    // Parse specs from form or use default empty
    // For MVP, we might just take a few fixed fields or a JSON string
    // Let's assume we just save basic info for now or use a text area for specs JSON
    const specsRaw = formData.get("specifications") as string;
    let specifications = "{}";
    try {
        // Validate if it's JSON
        JSON.parse(specsRaw);
        specifications = specsRaw;
    } catch (e) {
        // If not valid JSON, maybe treat as simple key-value text? 
        // For now, let's just save it as is if it's valid, else empty
    }

    await prisma.product.create({
        data: {
            name,
            description,
            category,
            images: JSON.stringify([imageUrl]),
            specifications: specifications,
        },
    });

    revalidatePath("/admin/products");
    revalidatePath("/products");
    redirect("/admin/products");
}

export async function deleteProduct(id: string) {
    await prisma.product.delete({
        where: { id },
    });
    revalidatePath("/admin/products");
    revalidatePath("/products");
}
