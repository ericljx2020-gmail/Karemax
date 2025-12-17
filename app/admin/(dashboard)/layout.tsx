import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { LayoutDashboard, Package, MessageSquare, LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button"; // Server component usage might be tricky if Button is client, but it's exported as client component usually or compatible.
// Actually Button is client component (forwardRef).
// We can use a client component for the sidebar logout button.

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/admin/login");
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="flex h-16 items-center justify-center border-b px-6">
                    <span className="text-xl font-bold text-primary-600">Karemax Admin</span>
                </div>
                <nav className="p-4 space-y-2">
                    <Link
                        href="/admin/dashboard"
                        className="flex items-center gap-3 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                    >
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/products"
                        className="flex items-center gap-3 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                    >
                        <Package className="h-5 w-5" />
                        Products
                    </Link>
                    <Link
                        href="/admin/inquiries"
                        className="flex items-center gap-3 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                    >
                        <MessageSquare className="h-5 w-5" />
                        Inquiries
                    </Link>
                </nav>
                <div className="absolute bottom-4 w-64 px-4">
                    {/* Logout link/button - for now just a link to api/auth/signout or client component */}
                    <Link href="/api/auth/signout" className="flex items-center gap-3 rounded-md px-4 py-2 text-red-600 hover:bg-red-50">
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}
