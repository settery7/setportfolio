import type { Metadata } from "next";
import { Bricolage_Grotesque, Karla, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/* Display — headings only. */
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

/* Body — everything else. */
const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  display: "swap",
});

/* Mono — actual code snippets only, never decoration for small labels. */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Clayne Cezclark Nable",
  description:
    "Computer Engineering graduate building full-stack web and mobile applications — React, Node, PostgreSQL, Flutter — and self-hosting them end to end with Docker. Based in Cebu.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${karla.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
