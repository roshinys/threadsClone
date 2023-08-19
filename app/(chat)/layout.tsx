import TopBar from "@/components/shared/TopBar";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Head from "next/head";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Daivik Message App",
  description: "A nextjs Daivik Message App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <link rel="icon" href="../favicon.ico" />
        </Head>
        <body className={`${inter.className}`}>
          <TopBar />
          <main className="flex flex-row ">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
