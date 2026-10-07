import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { navItems } from "@/components/dashboard/nav";
import AdvisorPage from "@/components/dashboard/sections/AdvisorPage";
import BranchesPage from "@/components/dashboard/sections/BranchesPage";
import ForecastPage from "@/components/dashboard/sections/ForecastPage";
import ImportPage from "@/components/dashboard/sections/ImportPage";
import ReconcilePage from "@/components/dashboard/sections/ReconcilePage";
import SalesPage from "@/components/dashboard/sections/SalesPage";
import SettingsPage from "@/components/dashboard/sections/SettingsPage";
import TransactionsPage from "@/components/dashboard/sections/TransactionsPage";
import { BRAND } from "@/data/content";

type Params = { params: Promise<{ section: string }> };

/** DEMO section screens (frontend only, placeholder data, local state). Slugs match components/dashboard/nav.ts. */
const screens: Record<string, React.ComponentType> = {
  transactions: TransactionsPage,
  import: ImportPage,
  sales: SalesPage,
  reconcile: ReconcilePage,
  forecast: ForecastPage,
  branches: BranchesPage,
  advisor: AdvisorPage,
  settings: SettingsPage,
};

export function generateStaticParams() {
  return Object.keys(screens).map((section) => ({ section }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { section } = await params;
  const item = navItems.find((n) => n.slug === section);
  return { title: `${item?.label ?? "Dashboard"} · ${BRAND}` };
}

export default async function SectionPage({ params }: Params) {
  const { section } = await params;
  const Screen = screens[section];
  if (!Screen) notFound();
  return <Screen />;
}
