import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import "@/app/lib/data/db";
import StoreProvider from "./storeProvider";
import getToken from "./utils/getToken";
import { redirect } from "next/dist/server/api-utils";
import { NextRequest } from "next/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce Application",
  description: "Project Demo Nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = getToken()
  if(!token) {
    return Response.redirect("/login")
  }

  return (
    <StoreProvider>
      <html lang="en">
        <body>
          {/* Layout UI */}
          <Navbar/>
            <main>{children}</main>
          <Footer/>
        </body>
      </html>
    </StoreProvider>
  );
}
