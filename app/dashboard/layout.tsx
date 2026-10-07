import type { Metadata } from "next";
import Shell from "@/components/dashboard/Shell";
import { BRAND } from "@/data/content";

export const metadata: Metadata = { title: `Dashboard · ${BRAND}` };

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <Shell>{children}</Shell>;
}
