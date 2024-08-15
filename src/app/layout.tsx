import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quest for Azrael Interactive Map",
  description: "Maps running quests and character locations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
