import "./globals.css";

import { ClerkProvider, SignedOut, SignInButton } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Wealthflow",
  description: "Financial Tracking",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.className} antialiased`}>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
