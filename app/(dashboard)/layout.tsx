// In app/(dashboard)/layout.tsx

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { HeaderTop } from "@/components"; // Assuming HeaderTop is in your components index
import Image from "next/image";
import Link from "next/link";
import { FaBell } from "react-icons/fa6";
import { signOut } from "next-auth/react"; // Note: signOut can't be used directly in a Server Component

// We will create a small client component for the user dropdown
import AdminUserMenu from "@/components/AdminUserMenu"; // We will create this component next

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Secure the layout on the server
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    redirect("/login");
  }

  // 2. Render the admin-specific layout structure
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Admin Header - Fixed to the top */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm">
        <div className="flex justify-between h-20 items-center px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto">
          <Link href="/admin">
            <Image
              src="/logo design.svg"
              width={150}
              height={150}
              alt="dondooil logo"
              className="h-12 w-auto"
            />
          </Link>
          <div className="flex items-center space-x-4">
            <FaBell className="text-xl text-gray-600 hover:text-blue-600 cursor-pointer" />
            {/* Pass session data to the client component */}
            <AdminUserMenu user={session.user} />
          </div>
        </div>
      </header>

      {/* Add padding-top to the main content area to push it below the fixed header */}
      {/* h-20 is 80px, so pt-20 is a perfect match */}
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
}