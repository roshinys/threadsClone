import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { Inter } from "next/font/google";
import "../globals.css";

export const metadata = {
  title: "Daivik",
  description: "A nextjs Daivik App",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      {/* clerk is a provider this will all us to use clerk functionality */}
      <html lang="en">
        <body className={`${inter} bg-dark-1`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
