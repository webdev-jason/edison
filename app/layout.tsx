import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { CartProvider } from "./context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Edison Avenue",
  description: "Custom laser engraving and precision decor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}