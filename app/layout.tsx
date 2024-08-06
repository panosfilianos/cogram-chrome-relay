import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import "./globals.css";

const arimo = Arimo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cogram Chrome Relay",
  description: "Cogram Chrome Relay helps you capture all moments that matter from your online meetings, livestreams and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={arimo.className + " overflow-hidden"}>{children}</body>
    </html>
  );
}
