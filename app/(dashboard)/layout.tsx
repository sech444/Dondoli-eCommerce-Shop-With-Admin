// In app/(dashboard)/layout.tsx

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth"; // <-- THE ONLY CHANGE NEEDED

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Get the session on the server
  const session = await getServerSession(authOptions);

  // 2. Check for a valid session and the 'admin' role
  if (!session || session.user?.role !== "admin") {
    // 3. If check fails, redirect to the login page
    redirect("/login");
  }

  // 4. If check passes, render the admin content
  return <>{children}</>;
}