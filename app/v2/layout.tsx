import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import { BRAND } from "@/data/v2";

const font = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-v2" });

export const metadata: Metadata = {
  title: `${BRAND} — Drive growth confidently with insight at every step`,
  description:
    "Track targets, understand your balance and let AI highlight what truly matters. Start for free and upgrade as your business scales.",
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={font.variable}>
      {/* Mark JS as available before first paint so scroll-reveal content starts hidden without a flash. */}
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      {children}
    </div>
  );
}
