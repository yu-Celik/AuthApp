import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Mon Application Next.js",
  description: "Une application d'authentification sécurisée construite avec Next.js et Prisma",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={` 
          ${geistSans.variable} 
          ${geistMono.variable} 
          bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800
          antialiased

        `}
      >
        {children}
      </body>
    </html>
  );
}
