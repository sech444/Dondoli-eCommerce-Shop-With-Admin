// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { Footer, Header } from "@/components";
// import SessionProvider from "@/utils/SessionProvider";
// import Providers from "@/Providers";
// import { getServerSession } from "next-auth";
// import { Analytics } from "@vercel/analytics/react";
// import 'svgmap/dist/svgMap.min.css';

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'),
//   title: "DONDOIL APP | Health & Wellness Solutions | Enhancing immunity to fight diseases",
//   description: "DONDOIL Health provides natural wellness solutions and health products. Discover our range of therapeutic oils and health supplements for optimal wellbeing.",
//   keywords: "DONDOIL,Ishannderoil, Hosannahoil, health products, wellness, natural oils, therapeutic oils, health supplements, Enhancing immunity to fight diseases",
//   icons: {
//     icon: [
//       { url: '/favicon.svg', type: 'image/svg+xml' }, // SVG version for modern browsers
//       { url: '/favicon.svg', sizes: '32x32', type: 'image/svg+xml' }, // Fallback PNG
//       { url: '/favicon.svg', sizes: '192x192', type: 'image/svg+xml' }, // For Android
//     ],
//     apple: [
//       { url: '/apple-icon.png', sizes: '180x180', type: 'image/svg+xml' }, // For iOS
//     ],
//   },
//   openGraph: {
//     title: "DONDOIL Health & Wellness Solutions | Enhancing immunity to fight diseases",
//     description: "Your trusted source for natural health products and wellness solutions. Explore DONDOIL's premium range of therapeutic oils and supplements.",
//     type: "website",
//     locale: "en_US",
//     siteName: "DONDOIL Health",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "DONDOIL Health & Wellness Solutions",
//     description: "Natural wellness solutions and health products for optimal wellbeing. Discover DONDOIL's therapeutic oils and supplements.",
//   },
//   robots: {
//     index: true,
//     follow: true,
//   }
// };


// export default async function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const session = await getServerSession();
//   return (
//     <html lang="en" data-theme="light">
//       <body className={inter.className}>
//         <SessionProvider session={session}>
//           <Header />
//           <Providers>
//             {children}
//             <Analytics />
//           </Providers>
//           <Footer />
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }


// In app/layout.tsx

"use client"; // <-- Add this to use client-side hooks

import { usePathname } from "next/navigation"; // <-- Import the hook
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components";
import SessionProvider from "@/utils/SessionProvider"; // Assuming this is your NextAuthProvider
import Providers from "@/Providers";
import { Analytics } from "@vercel/analytics/react";
import 'svgmap/dist/svgMap.min.css';
import { Toaster } from "react-hot-toast"; // Import Toaster for notifications

const inter = Inter({ subsets: ["latin"] });

// Metadata can't be exported from a Client Component.
// You should move the 'metadata' object to the individual page files that need it,
// like your main app/page.tsx.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current URL path
  const isAdminPage = pathname.startsWith("/admin"); // Check if it's an admin page

  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <SessionProvider> {/* Assuming SessionProvider wraps NextAuth's provider */}
          <Toaster position="top-center" />
          
          {/* Only render the main Header if it's NOT an admin page */}
          {!isAdminPage && <Header />}
          
          <Providers>
            <main> {/* It's good practice to wrap children in a <main> tag */}
              {children}
              <Analytics />
            </main>
          </Providers>
          
          {/* Only render the main Footer if it's NOT an admin page */}
          {!isAdminPage && <Footer />}
        </SessionProvider>
      </body>
    </html>
  );
}