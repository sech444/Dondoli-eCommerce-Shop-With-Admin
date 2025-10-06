// In app/post-login/page.tsx

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * This is a temporary "sorting hat" page. Its only purpose is to check the
 * user's role after they log in and redirect them to the correct dashboard.
 * Users should only see the loading message for a brief moment.
 */
const PostLoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // The `useEffect` hook runs when the component mounts and when its dependencies change.
    // We wait for the session status to be determined before doing anything.

    if (status === "loading") {
      // Session is still being fetched. Do nothing and wait.
      return;
    }

    if (status === "authenticated") {
      // The user is successfully authenticated. Now we check their role.
      if (session.user?.role === "admin") {
        // If the user's role is 'admin', redirect them to the admin panel.
        // We use `router.replace` so the user can't click "back" to this page.
        router.replace("/admin/orders");
      } else {
        // If the user is any other role (e.g., 'user'), redirect them to their
        // profile page or the homepage.
        router.replace("/profile"); // <-- IMPORTANT: Change this to "/" if you don't have a /profile page.
      }
    } else {
      // `status` is 'unauthenticated'. This can happen if the login fails or the
      // session is invalid. Send them back to the login page.
      router.replace("/login");
    }
  }, [status, session, router]); // The effect re-runs if any of these change.

  // Render a simple loading state while the logic in `useEffect` runs.
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="text-center">
        <p className="text-lg font-semibold text-slate-700">Authenticating...</p>
        <p className="text-sm text-slate-500">Please wait while we redirect you.</p>
      </div>
    </div>
  );
};

export default PostLoginPage;