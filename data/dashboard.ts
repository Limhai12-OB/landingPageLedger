import type { IconName } from "@/components/Icon";

/**
 * PLACEHOLDER dashboard data — example values so the layout can be reviewed.
 * Replace with real API responses. Amounts keep their own currency (USD or KHR), as in the ledger.
 */

export const owner = { name: "Sokha Chan", role: "Business Owner", business: "Sokha Mart" };

export const branches = [
  { id: "all", name: "All branches" },
  { id: "central", name: "Central Market" },
  { id: "riverside", name: "Riverside" },
  { id: "tk", name: "Toul Kork" },
] as const;

export type Kpi = { label: string; value: string; sub: string; delta?: string; up?: boolean; icon: IconName };

export const kpis: Kpi[] = [
  { label: "Monthly revenue", value: "$48,920", sub: "All branches · October", delta: "12.5%", up: true, icon: "chart" },
  { label: "Net profit", value: "$25,684", sub: "After bills and wages", delta: "8.0%", up: true, icon: "wallet" },
  { label: "Cash runway", value: "74 days", sub: "On the expected line", delta: "6 days", up: false, icon: "target" },
  { label: "Cash on hand", value: "$32,410", sub: "+ ៛18,450,000 in tills and wallets", icon: "building" },
];

/** 90-day expected cash line (USD), one point per 3 days. Safety level is the owner's minimum cash setting. */
export const forecast = {
  safety: 12000,
  today: 0,
  expected: [32410, 31200, 33800, 30100, 28400, 29900, 26300, 24800, 25600, 22100, 19400, 20900, 17200, 15100, 16800, 13600, 11200, 12900, 15400, 18800, 21300, 23900, 22600, 25100, 27800, 26400, 29000, 31500, 30200, 33100],
  upper: [32410, 32400, 35600, 33100, 32200, 34300, 31800, 31000, 32600, 30100, 28400, 30900, 28200, 27100, 29800, 27600, 26200, 28900, 31400, 34800, 37300, 39900, 39600, 42100, 44800, 44400, 47000, 49500, 49200, 52100],
  lower: [32410, 30000, 31900, 27100, 24600, 25500, 20800, 18600, 18600, 14100, 10400, 10900, 6200, 3100, 3800, -400, -3800, -3100, -1600, 800, 2300, 3900, 1600, 3100, 4800, 2400, 4000, 5500, 3200, 5100],
  crunchDay: 48,
  crunchBranch: "Riverside",
};

export type Tx = {
  id: string;
  name: string;
  branch: string;
  date: string;
  amount: string;
  currency: "USD" | "KHR";
  inflow: boolean;
  source: string;
  status: "Posted" | "Matched" | "Draft" | "Needs review";
  icon: IconName;
};

export const transactions: Tx[] = [
  { id: "t1", name: "ABA payment · INV-208", branch: "Central Market", date: "Today, 10:24", amount: "+$1,240.00", currency: "USD", inflow: true, source: "ABA statement", status: "Matched", icon: "bag" },
  { id: "t2", name: "Supplier bill · Rice (50 kg × 12)", branch: "Riverside", date: "Today, 08:10", amount: "−៛344,000", currency: "KHR", inflow: false, source: "Receipt scan", status: "Needs review", icon: "coffee" },
  { id: "t3", name: "Shopify orders · 14 items", branch: "Toul Kork", date: "Yesterday", amount: "+$3,500.00", currency: "USD", inflow: true, source: "Shopify", status: "Posted", icon: "wallet" },
  { id: "t4", name: "Wing wallet top-up", branch: "Central Market", date: "Yesterday", amount: "+៛1,200,000", currency: "KHR", inflow: true, source: "Wing", status: "Matched", icon: "wallet" },
  { id: "t5", name: "Shop rent · October", branch: "Riverside", date: "Mon, 14:02", amount: "−$240.00", currency: "USD", inflow: false, source: "Manual", status: "Posted", icon: "building" },
  { id: "t6", name: "KHQR sales · evening shift", branch: "Toul Kork", date: "Mon, 21:40", amount: "+៛2,860,000", currency: "KHR", inflow: true, source: "KHQR", status: "Draft", icon: "grid" },
  { id: "t7", name: "EDC electricity · October", branch: "Central Market", date: "Sun, 09:15", amount: "−$186.40", currency: "USD", inflow: false, source: "Receipt scan", status: "Posted", icon: "building" },
  { id: "t8", name: "Coca-Cola Cambodia · bulk order", branch: "Toul Kork", date: "Sat, 11:30", amount: "−$1,240.00", currency: "USD", inflow: false, source: "Receipt scan", status: "Needs review", icon: "coffee" },
  { id: "t9", name: "INV-210 · Lucky Mini Mart", branch: "Toul Kork", date: "Fri, 16:48", amount: "+$2,180.00", currency: "USD", inflow: true, source: "WeBill365", status: "Matched", icon: "bag" },
  { id: "t10", name: "Ice supplier · ស្រីពៅ", branch: "Central Market", date: "Fri, 07:20", amount: "−៛60,000", currency: "KHR", inflow: false, source: "Receipt scan", status: "Posted", icon: "coffee" },
  { id: "t11", name: "Cash sale · walk-in", branch: "Riverside", date: "Thu, 12:05", amount: "+$312.00", currency: "USD", inflow: true, source: "Manual", status: "Needs review", icon: "wallet" },
  { id: "t12", name: "ACLEDA transfer · Mekong Café deposit", branch: "Central Market", date: "Wed, 10:00", amount: "+$300.00", currency: "USD", inflow: true, source: "ACLEDA", status: "Posted", icon: "building" },
];

export const expenses = {
  total: "$3,040",
  period: "This month",
  items: [
    { name: "Inventory restock", value: "$1,420", pct: 47, color: "#1e40af" },
    { name: "Rent & utilities", value: "$980", pct: 32, color: "#3b5ed9" },
    { name: "Wages", value: "$640", pct: 21, color: "#c7d2fb" },
  ],
};

export type Branch = {
  name: string;
  manager: string;
  sales: string;
  till: "Signed off" | "Open" | "Short" | "Over";
  tillNote: string;
  reconciled: number;
};

export const branchRows: Branch[] = [
  { name: "Central Market", manager: "Dara Pich", sales: "$1,860", till: "Signed off", tillNote: "Balanced in USD and KHR", reconciled: 100 },
  { name: "Riverside", manager: "Malis Sok", sales: "$1,120", till: "Short", tillNote: "−៛12,000 at close", reconciled: 82 },
  { name: "Toul Kork", manager: "Vuthy Keo", sales: "$2,340", till: "Open", tillNote: "Shift ends 22:00", reconciled: 94 },
];

export type Alert = { tone: "warn" | "danger" | "info"; title: string; text: string; icon: IconName; action: string };

export const alerts: Alert[] = [
  { tone: "danger", title: "Cash crunch in 48 days", text: "Riverside drops below your $12,000 safety level if the supplier order ships on time.", icon: "target", action: "Run a what-if" },
  { tone: "warn", title: "3 records need review", text: "Two possible duplicates and one amount that looks unusual for \"Rice\".", icon: "layers", action: "Review" },
  { tone: "info", title: "Bank reconciliation", text: "ABA · 6 of 7 statement lines matched on date, reference and amount.", icon: "checkCircle", action: "Match the last one" },
];

export const health = {
  score: 78,
  label: "Good",
  factors: [
    ["Cash runway", 82],
    ["Profit margin", 74],
    ["Books up to date", 91],
    ["Stock turnover", 63],
  ] as const,
};

export const advisor = {
  insight: "Sales were 9% higher this week than last, led by drinks and snacks at Toul Kork. Your cash stays above the safety level for the next 47 days, then Riverside needs attention.",
  chips: ["Why did costs rise?", "Cash next month?", "Top selling items", "តើខែនេះចំណេញប៉ុន្មាន?"],
};

export const report = { month: "October", ready: "1 November", pages: 6 };
