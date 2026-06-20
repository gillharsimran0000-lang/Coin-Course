// Frontend — Root layout (fonts, metadata, auth provider)

import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./providers";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Coin Course · Free financial literacy for every age",
  description: "Eight short modules covering everything from your first allowance to your first 401(k). Free, forever.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Bricolage+Grotesque:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
