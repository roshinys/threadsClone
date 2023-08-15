import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { Inter } from "next/font/google";
import "../globals.css";
import Head from "next/head";

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
        <Head>
          <link rel="icon" href="../favicon.ico" />
        </Head>
        <body className={`${inter} bg-dark-1`}>
          <div className="w-full flex justify-center items-center min-h-screen">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
