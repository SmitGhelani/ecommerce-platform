import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
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
  const token = getToken();
  if (!token) {
    return Response.redirect("/login");
  }

  return (
    <StoreProvider>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
            integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </head>
        <body className="bg-slate-200">
          {/* Layout UI */}
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </StoreProvider>
  );
}
