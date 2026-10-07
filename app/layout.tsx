import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { BRAND } from "@/data/content";
import "./globals.css";

const font = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: `${BRAND} — Bookkeeping, cash and planning for Cambodian retail`,
  description:
    "LedgerVision helps small retail businesses in Cambodia keep their books, understand their cash position and plan ahead, in Khmer or English and in USD or KHR.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the inline script below adds the `js` class before React hydrates.
    <html lang="en" className={font.variable} suppressHydrationWarning>
      <body>
        {/* Mark JS as available before first paint so scroll-reveal content starts hidden without a flash. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {children}
      </body>
    </html>
  );
}
