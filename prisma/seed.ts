import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const products = [
        {
            name: "Advanced Patient Monitor",
            description: "Multi-parameter patient monitor for ICU and OR use. High resolution display.",
            specifications: JSON.stringify({
                "Display": "12.1 inch TFT Color LCD",
                "Parameters": "ECG, SPO2, NIBP, RESP, TEMP, PR",
                "Battery": "Rechargeable Li-ion battery",
                "Weight": "4.5 kg"
            }),
            images: JSON.stringify(["/placeholder.jpg"]),
            category: "Medical Equipment"
        },
        {
            name: "Surgical LED Light",
            description: "Shadowless operating lamp with adjustable color temperature and intensity.",
            specifications: JSON.stringify({
                "Illumination": "160,000 Lux",
                "Color Temp": "3500K - 5000K",
                "LED Life": "> 50,000 hours",
                "Diameter": "700mm"
            }),
            images: JSON.stringify(["/placeholder.jpg"]),
            category: "Surgical"
        },
        {
            name: "Digital Ultrasound System",
            description: "Portable ultrasound scanner with high image quality and doppler function.",
            specifications: JSON.stringify({
                "Monitor": "15 inch LED",
                "Probe Ports": "2 active ports",
                "Modes": "B, B/B, 4B, M, B/M",
                "Storage": "500GB Hard Disk"
            }),
            images: JSON.stringify(["/placeholder.jpg"]),
            category: "Imaging"
        },
        {
            name: "Hospital Bed Series",
            description: "Electric ICU bed with weighing scale and multiple position adjustments.",
            specifications: JSON.stringify({
                "Load Capacity": "250 kg",
                "Backrest": "0-75 degrees",
                "Height": "450-750mm",
                "Castors": "Central locking system"
            }),
            images: JSON.stringify(["/placeholder.jpg"]),
            category: "Furniture"
        },
        {
            name: "Disposable Syringe",
            description: "Sterile disposable syringe with needle. Luer lock or luer slip.",
            specifications: JSON.stringify({
                "Size": "1ml, 3ml, 5ml, 10ml, 20ml",
                "Material": "Medical grade PP",
                "Sterilization": "EO Gas",
                "Package": "Blister or PE bag"
            }),
            images: JSON.stringify(["/placeholder.jpg"]),
            category: "Consumables"
        },
        {
            name: "Infusion Set",
            description: "IV administration set with vented spike and roller clamp.",
            specifications: JSON.stringify({
                "Tube Length": "150cm",
                "Filter": "15 micron",
                "Needle": "21G",
                "Type": "Luer slip"
            }),
            images: JSON.stringify(["/placeholder.jpg"]),
            category: "Consumables"
        }
    ];

    for (const product of products) {
        await prisma.product.create({
            data: product,
        });
    }

    // Create Admin User
    // Password is 'admin123' hashed with bcrypt
    // Hash generated for simplicity: $2a$10$y/.. (placeholder)
    // Actually let's use a simple hash or just plain text if we use a simple credential provider for MVP
    // But better to use bcrypt. I'll use a hardcoded hash for 'admin123'
    // $2a$10$EpThp.e.X/.. is hard to guess.
    // Let's use a known hash for 'password': $2a$10$ix.i.e.
    // Or I can import bcrypt in seed.ts if I installed it. I did.

    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await prisma.user.upsert({
        where: { email: 'admin@karemax.com' },
        update: {},
        create: {
            email: 'admin@karemax.com',
            name: 'Admin User',
            password: hashedPassword,
        },
    });

    console.log("Seed data inserted");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
