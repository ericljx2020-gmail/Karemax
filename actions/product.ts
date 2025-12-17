"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

import { writeFile } from "fs/promises";
import path from "path";

export async function createProduct(formData: FormData) {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;

    // Handle Image Upload
    const imageFile = formData.get("image") as File;
    let imageUrl = "/placeholder.jpg";

    if (imageFile && imageFile.size > 0) {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const filename = `${Date.now()}_${imageFile.name.replace(/\s/g, "_")}`;
        const uploadDir = path.join(process.cwd(), "public/uploads");

        try {
            await writeFile(path.join(uploadDir, filename), buffer);
            imageUrl = `/uploads/${filename}`;
        } catch (error) {
            console.error("Error uploading file:", error);
            // Fallback or error handling
        }
    } else {
        // Check if a URL was provided as fallback (optional, if we keep the text input as alternative)
        const urlInput = formData.get("imageUrl") as string;
        if (urlInput) imageUrl = urlInput;
    }

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
