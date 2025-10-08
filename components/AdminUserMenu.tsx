// In components/AdminUserMenu.tsx

"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import toast from "react-hot-toast";
// Import the Session type, which contains our custom user object
import type { Session } from "next-auth";

// Define the props to accept the user object from our custom session
interface AdminUserMenuProps {
  // The user prop is the 'user' object from a NextAuth Session
  user: Session["user"];
}

const AdminUserMenu = ({ user }: AdminUserMenuProps) => {
  const handleLogout = () => {
    toast.success("Logging out...");
    // After logging out, redirect the user to the login page.
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-2 border-slate-200 hover:border-blue-500 transition-colors"
      >
        {/* Use a default image if the user doesn't have one from their Google/GitHub profile */}
        <Image
          src={user?.image || "/founder.png"} // Using the placeholder you had
          alt={user?.name || "Admin Profile"}
          width={40}
          height={40}
          className="w-full h-full object-cover"
        />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[50] menu p-2 shadow bg-base-100 rounded-box w-56 mt-2"
      >
        <li className="p-2 border-b">
          <p className="font-bold text-slate-800">{user?.name || "Admin"}</p>
          <p className="text-xs text-slate-500 -mt-1">{user?.email}</p>
        </li>
        <li>
          <a>Profile</a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <div className="divider my-0"></div>
        <li>
          <a onClick={handleLogout} className="text-red-500 hover:bg-red-50">
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AdminUserMenu;
