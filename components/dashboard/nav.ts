import type { IconName } from "@/components/Icon";

export type NavItem = { slug: string; label: string; icon: IconName; group: "Overview" | "Books" | "Business"; badge?: string; text: string };

/** Sidebar entries. `slug` is the segment after /dashboard ("" = overview). */
export const navItems: NavItem[] = [
  { slug: "", label: "Overview", icon: "home", group: "Overview", text: "Revenue, profit, cash and alerts across every branch." },
  { slug: "transactions", label: "Transactions", icon: "table", group: "Books", badge: "3", text: "Every sale, bill and transfer in USD and KHR, with the records behind each entry." },
  { slug: "import", label: "Data import", icon: "camera", group: "Books", text: "Snap receipts, upload CSV/Excel, or import ABA, Wing and ACLEDA statements. AI reads and flags them before you post." },
  { slug: "sales", label: "Sales & invoices", icon: "bag", group: "Books", text: "Invoices, POS sales and Shopify orders, with WeBill365 and KHQR payments matched automatically." },
  { slug: "reconcile", label: "Till & reconciliation", icon: "scale", group: "Books", text: "End-of-shift till counts with over/short per currency, and bank reconciliation matched on date, reference and amount." },
  { slug: "forecast", label: "Cash forecast", icon: "chart", group: "Business", text: "90-day cash forecast with expected, best and worst lines, cash-crunch alerts and what-if tests." },
  { slug: "branches", label: "Branches", icon: "building", group: "Business", text: "Branches, their managers and settings. Invite a Branch Manager to run day-to-day work for one branch." },
  { slug: "advisor", label: "AI advisor", icon: "sparkle", group: "Business", text: "Ask your numbers anything in Khmer or English and get an answer that shows the records behind it." },
  { slug: "settings", label: "Settings", icon: "gear", group: "Business", text: "Business details, currencies, safety cash level, integrations (Shopify, WeBill365, Telegram) and notifications." },
];

export const navGroups = ["Overview", "Books", "Business"] as const;

export const hrefFor = (slug: string) => (slug ? `/dashboard/${slug}` : "/dashboard");
