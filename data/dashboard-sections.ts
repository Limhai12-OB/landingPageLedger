import type { IconName } from "@/components/Icon";

/**
 * PLACEHOLDER data for the dashboard section screens (frontend demo only).
 * Replace with real API responses.
 */

/* ---------- Data import ---------- */
export type ImportMethod = { id: "snap" | "file" | "bank"; title: string; text: string; icon: IconName; accept: string };
export const importMethods: ImportMethod[] = [
  { id: "snap", title: "Snap a receipt", text: "Photo of a receipt, payment slip or supplier invoice. Khmer and English, even handwritten.", icon: "camera", accept: "JPG, PNG, PDF" },
  { id: "file", title: "Upload CSV or Excel", text: "POS exports, sales lists or your old spreadsheet. Columns are mapped automatically.", icon: "table", accept: "CSV, XLSX" },
  { id: "bank", title: "Bank statement", text: "ABA, Wing or ACLEDA statement export. Lines are matched to your ledger for reconciliation.", icon: "building", accept: "CSV, PDF" },
];

export type ImportRow = { id: string; file: string; vendor: string; date: string; amount: string; currency: "USD" | "KHR"; lang: "KH" | "EN"; confidence: number; flag?: string; category: string; branch: string };
export const importQueue: ImportRow[] = [
  { id: "i1", file: "IMG_2041.jpg", vendor: "Angkor Rice Supply", date: "07 Oct", amount: "៛344,000", currency: "KHR", lang: "KH", confidence: 96, category: "Inventory", branch: "Riverside" },
  { id: "i2", file: "IMG_2042.jpg", vendor: "Angkor Rice Supply", date: "07 Oct", amount: "៛344,000", currency: "KHR", lang: "KH", confidence: 94, flag: "Possible duplicate of IMG_2041", category: "Inventory", branch: "Riverside" },
  { id: "i3", file: "EDC bill Oct.pdf", vendor: "EDC Electricity", date: "05 Oct", amount: "$186.40", currency: "USD", lang: "EN", confidence: 99, category: "Utilities", branch: "Central Market" },
  { id: "i4", file: "IMG_2039.jpg", vendor: "Coca-Cola Cambodia", date: "04 Oct", amount: "$1,240.00", currency: "USD", lang: "EN", confidence: 71, flag: "Amount is 4× the usual for this vendor", category: "Inventory", branch: "Toul Kork" },
  { id: "i5", file: "IMG_2038.jpg", vendor: "ហាងទឹកកក ស្រីពៅ", date: "04 Oct", amount: "៛60,000", currency: "KHR", lang: "KH", confidence: 88, category: "Supplies", branch: "Central Market" },
];
export const recentImports = [
  { name: "ABA statement · September", when: "1 Oct", rows: 142, status: "Matched 139 of 142", icon: "building" as IconName },
  { name: "POS export · week 39", when: "29 Sep", rows: 611, status: "Posted", icon: "table" as IconName },
  { name: "Receipts · 12 photos", when: "28 Sep", rows: 12, status: "Posted", icon: "camera" as IconName },
];

/* ---------- Sales & invoices ---------- */
export type Invoice = { no: string; customer: string; branch: string; issued: string; due: string; amount: string; currency: "USD" | "KHR"; status: "Paid" | "Sent" | "Overdue" | "Draft"; via?: string };
export const invoices: Invoice[] = [
  { no: "INV-212", customer: "Mekong Café", branch: "Central Market", issued: "07 Oct", due: "21 Oct", amount: "$640.00", currency: "USD", status: "Sent" },
  { no: "INV-211", customer: "Sokha Guesthouse", branch: "Riverside", issued: "06 Oct", due: "13 Oct", amount: "៛1,850,000", currency: "KHR", status: "Paid", via: "KHQR" },
  { no: "INV-210", customer: "Lucky Mini Mart", branch: "Toul Kork", issued: "02 Oct", due: "09 Oct", amount: "$2,180.00", currency: "USD", status: "Paid", via: "ABA" },
  { no: "INV-209", customer: "Chan Kitchen", branch: "Central Market", issued: "25 Sep", due: "02 Oct", amount: "$420.00", currency: "USD", status: "Overdue" },
  { no: "INV-208", customer: "Bayon Tours", branch: "Central Market", issued: "24 Sep", due: "08 Oct", amount: "$1,240.00", currency: "USD", status: "Paid", via: "ABA" },
  { no: "INV-207", customer: "Preah Vihear School", branch: "Riverside", issued: "—", due: "—", amount: "៛920,000", currency: "KHR", status: "Draft" },
];
export const posSales = [
  { name: "Morning shift · Central Market", when: "Today 06:00–14:00", items: 212, amount: "$1,120.50" },
  { name: "Evening shift · Toul Kork", when: "Yesterday 14:00–22:00", items: 348, amount: "៛2,860,000" },
  { name: "Shopify orders · 14 items", when: "Yesterday", items: 14, amount: "$3,500.00" },
  { name: "Morning shift · Riverside", when: "Yesterday 06:00–14:00", items: 157, amount: "$640.00" },
];
export const payMethods = [
  { name: "KHQR", pct: 38, color: "#1e40af" },
  { name: "Cash", pct: 31, color: "#3b5ed9" },
  { name: "ABA transfer", pct: 19, color: "#93a9f0" },
  { name: "Wing", pct: 12, color: "#c7d2fb" },
];

/* ---------- Till & reconciliation ---------- */
export type TillSheet = { branch: string; manager: string; shift: string; status: "Open" | "Counted" | "Signed off"; usd: { expected: number; counted: number }; khr: { expected: number; counted: number } };
export const tills: TillSheet[] = [
  { branch: "Central Market", manager: "Dara Pich", shift: "Morning · closed 14:00", status: "Signed off", usd: { expected: 1120.5, counted: 1120.5 }, khr: { expected: 1460000, counted: 1460000 } },
  { branch: "Riverside", manager: "Malis Sok", shift: "Morning · closed 14:05", status: "Counted", usd: { expected: 640, counted: 640 }, khr: { expected: 812000, counted: 800000 } },
  { branch: "Toul Kork", manager: "Vuthy Keo", shift: "Evening · ends 22:00", status: "Open", usd: { expected: 980.25, counted: 0 }, khr: { expected: 2860000, counted: 0 } },
];
export type BankLine = { id: string; date: string; ref: string; desc: string; amount: string; inflow: boolean; match?: string };
export const bankLines: BankLine[] = [
  { id: "b1", date: "07 Oct", ref: "FT25280A1Q", desc: "Bayon Tours · INV-208", amount: "+$1,240.00", inflow: true, match: "INV-208 payment" },
  { id: "b2", date: "06 Oct", ref: "FT25279K9M", desc: "Lucky Mini Mart", amount: "+$2,180.00", inflow: true, match: "INV-210 payment" },
  { id: "b3", date: "06 Oct", ref: "PMT-7781", desc: "EDC Electricity", amount: "−$186.40", inflow: false, match: "Bill · EDC October" },
  { id: "b4", date: "05 Oct", ref: "FT25278C2X", desc: "Shopify payout", amount: "+$3,500.00", inflow: true, match: "Shopify orders" },
  { id: "b5", date: "04 Oct", ref: "PMT-7769", desc: "Coca-Cola Cambodia", amount: "−$1,240.00", inflow: false, match: "Supplier bill · Coca-Cola" },
  { id: "b6", date: "03 Oct", ref: "PMT-7761", desc: "Shop rent October", amount: "−$240.00", inflow: false, match: "Shop rent · October" },
  { id: "b7", date: "02 Oct", ref: "FT25275R4T", desc: "Unknown transfer", amount: "+$312.00", inflow: true },
];
export const unmatchedLedger = [
  { name: "Cash sale · walk-in customer", date: "02 Oct", amount: "+$312.00" },
  { name: "Mekong Café · deposit", date: "01 Oct", amount: "+$300.00" },
];

/* ---------- Cash forecast ---------- */
export type Scheduled = { name: string; day: number; amount: number; inflow: boolean; icon: IconName; branch: string };
export const scheduled: Scheduled[] = [
  { name: "Shopify payout", day: 5, amount: 3500, inflow: true, icon: "bag", branch: "Toul Kork" },
  { name: "Wages · October", day: 24, amount: 6400, inflow: false, icon: "users", branch: "All branches" },
  { name: "Supplier order · Angkor Rice", day: 36, amount: 6500, inflow: false, icon: "coffee", branch: "Riverside" },
  { name: "Rent · November", day: 33, amount: 720, inflow: false, icon: "building", branch: "All branches" },
  { name: "INV-212 · Mekong Café", day: 14, amount: 640, inflow: true, icon: "wallet", branch: "Central Market" },
  { name: "Wages · November", day: 54, amount: 6400, inflow: false, icon: "users", branch: "All branches" },
];

/* ---------- Branches ---------- */
export type BranchDetail = { name: string; address: string; manager: string; email: string; sales: string; salesDelta: string; up: boolean; items: number; accounts: string[]; status: "Active" | "Setup" };
export const branchDetails: BranchDetail[] = [
  { name: "Central Market", address: "St 63, Phsar Thmei, Phnom Penh", manager: "Dara Pich", email: "dara@sokhamart.com", sales: "$18,420", salesDelta: "9%", up: true, items: 412, accounts: ["ABA · 001", "Cash till", "KHQR"], status: "Active" },
  { name: "Riverside", address: "Sisowath Quay, Phnom Penh", manager: "Malis Sok", email: "malis@sokhamart.com", sales: "$12,180", salesDelta: "3%", up: false, items: 286, accounts: ["ABA · 002", "Wing", "Cash till"], status: "Active" },
  { name: "Toul Kork", address: "St 289, Toul Kork, Phnom Penh", manager: "Vuthy Keo", email: "vuthy@sokhamart.com", sales: "$18,320", salesDelta: "21%", up: true, items: 358, accounts: ["ACLEDA · 001", "Shopify", "KHQR"], status: "Active" },
];
export const invitations = [{ email: "sreyleak@sokhamart.com", branch: "Siem Reap (new)", sent: "2 days ago" }];
export const permissions: [string, boolean, boolean][] = [
  ["Record sales, invoices, bills and transactions", true, true],
  ["Stock adjustments and till counts for a branch", true, true],
  ["Import statements for the branch's own accounts", true, true],
  ["See other branches' records", false, true],
  ["Own items, customers, categories and accounts", false, true],
  ["Sign off till balances and reconciliations", false, true],
  ["Cash forecasts, cash-crunch alerts and what-if tests", false, true],
  ["Manage branches, managers, settings and integrations", false, true],
];

/* ---------- AI advisor ---------- */
export type Msg = { role: "user" | "ai"; text: string; lang?: "km" | "en"; evidence?: { name: string; amount: string }[] };
export const chat: Msg[] = [
  { role: "user", text: "Why did costs rise last week?" },
  {
    role: "ai",
    text: "Costs were $1,860 higher than the week before. Most of it is one-time: a bulk Coca-Cola order at Toul Kork ($1,240) and the EDC bill arriving early ($186). Recurring costs barely moved (+$34).",
    evidence: [
      { name: "Coca-Cola Cambodia · Toul Kork", amount: "$1,240.00" },
      { name: "EDC Electricity · Central Market", amount: "$186.40" },
      { name: "Angkor Rice Supply · Riverside", amount: "៛344,000" },
    ],
  },
  { role: "user", text: "តើខែនេះចំណេញប៉ុន្មាន?", lang: "km" },
  {
    role: "ai",
    lang: "km",
    text: "ខែតុលា​នេះ អ្នកចំណេញសុទ្ធ $25,684 (ឡើង 8% ធៀបនឹងខែមុន)។ សាខា Toul Kork ចំណេញច្រើនជាងគេ ($9,870)។",
    evidence: [
      { name: "Revenue · all branches", amount: "$48,920" },
      { name: "Cost of goods", amount: "−$16,540" },
      { name: "Operating costs", amount: "−$6,696" },
    ],
  },
];
export const cannedReply: Msg = {
  role: "ai",
  text: "On the expected line your cash stays above the $12,000 safety level for 47 days. The dip comes from the Angkor Rice order at Riverside on day 36. Delaying it by 2 weeks keeps you above the line for the full 90 days.",
  evidence: [
    { name: "Supplier order · Angkor Rice (day 36)", amount: "−$6,500" },
    { name: "Wages · October (day 24)", amount: "−$6,400" },
    { name: "Shopify payout (day 5)", amount: "+$3,500" },
  ],
};
export const suggested = ["Cash next month?", "Top selling items", "Which branch is most profitable?", "ចំណាយអ្វីខ្ពស់ជាងគេ?"];
export const reports = [
  { month: "September 2025", pages: 6, note: "Profit up 4%, Riverside margin falling" },
  { month: "August 2025", pages: 6, note: "Best month for Toul Kork" },
  { month: "July 2025", pages: 5, note: "Cash runway improved to 70 days" },
];

/* ---------- Settings ---------- */
export const integrations: { name: string; text: string; icon: IconName; connected: boolean }[] = [
  { name: "Shopify", text: "Orders and payouts", icon: "bag", connected: true },
  { name: "WeBill365", text: "Invoices and payments", icon: "wallet", connected: true },
  { name: "ABA Bank", text: "Statement import", icon: "building", connected: true },
  { name: "Wing", text: "Wallet statements", icon: "wallet", connected: true },
  { name: "ACLEDA", text: "Statement import", icon: "building", connected: false },
  { name: "KHQR", text: "QR payments", icon: "grid", connected: true },
  { name: "Telegram", text: "Alerts and daily summary", icon: "chat", connected: false },
  { name: "Google sign-in", text: "Log in with Google", icon: "globe", connected: true },
];
export const notificationPrefs = [
  { key: "crunch", title: "Cash-crunch alerts", text: "When the expected line drops below your safety level", on: true },
  { key: "till", title: "Till over/short", text: "When a branch closes a till with a difference", on: true },
  { key: "review", title: "Records to review", text: "Duplicates and unusual amounts found by AI", on: true },
  { key: "daily", title: "Daily summary on Telegram", text: "Sales, cash and open items every evening at 21:00", on: false },
  { key: "report", title: "Monthly AI report", text: "On the 1st of each month, as PDF", on: true },
];
