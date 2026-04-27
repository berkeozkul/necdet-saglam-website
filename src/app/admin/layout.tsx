import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css"; // Ensure this path is correct based on structure

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Panel | Prof. Dr. Necdet Sağlam",
  description: "Website yönetim paneli.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="min-h-screen bg-slate-50 font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
