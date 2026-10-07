import type { IconName } from "@/components/Icon";

/** Product name used across landing-page-v2. Change it here once. */
export const BRAND = "Saleo";

export const navLinks = [
  ["Home", "#top"],
  ["Features", "#features"],
  ["Pricing", "#pricing"],
  ["Insight", "#insights"],
] as const;

/** Fictional company names for the "trusted by" strip — replace with real customers (with permission). */
export const logos: { name: string; icon: IconName }[] = [
  { name: "Kestrel", icon: "target" },
  { name: "Brightline", icon: "sparkle" },
  { name: "Orbitly", icon: "globe" },
  { name: "Fernhill", icon: "layers" },
  { name: "Quanta", icon: "chart" },
  { name: "Mapleworks", icon: "building" },
  { name: "Solace", icon: "home" },
  { name: "Nimbus", icon: "wallet" },
];

export type Feature = {
  title: string;
  text: string;
  points: { icon: IconName; label: string }[];
  widget: "target" | "balance" | "ai";
};

export const features: Feature[] = [
  {
    title: "Track your targets",
    text: "Set clear business targets and follow your progress in real time, so everyone knows exactly where you stand.",
    points: [
      { icon: "target", label: "Set monthly, quarterly and yearly targets" },
      { icon: "chart", label: "Progress updates with every new sale" },
      { icon: "checkCircle", label: "Get notified when you're ahead or behind" },
    ],
    widget: "target",
  },
  {
    title: "Understand your balance",
    text: "See money coming in and going out in one simple view, and understand what really drives your cash flow.",
    points: [
      { icon: "wallet", label: "Visualize income and expenses over time" },
      { icon: "chart", label: "Compare periods side by side" },
      { icon: "checkCircle", label: "Spot unusual spending before it grows" },
    ],
    widget: "balance",
  },
  {
    title: "AI highlight what truly matters",
    text: "Our AI reads your numbers for you and surfaces the changes worth acting on, with no reports to dig through.",
    points: [
      { icon: "sparkle", label: "Plain-language summaries of key changes" },
      { icon: "chart", label: "Forecasts based on your real data" },
      { icon: "checkCircle", label: "Ask follow-up questions anytime" },
    ],
    widget: "ai",
  },
];

export type Plan = {
  name: string;
  price: string;
  unit: string;
  text: string;
  icon: IconName;
  points: string[];
  cta: string;
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    name: "Starting Plan",
    price: "$0",
    unit: "/Account",
    icon: "user",
    text: "Everything you need to start tracking sales and understanding your numbers.",
    points: ["Up to 3 team members", "Revenue & target tracking", "Monthly balance overview", "Basic AI insights", "Email support"],
    cta: "Start for Free",
  },
  {
    name: "Enterprise Plan",
    price: "$120",
    unit: "/Month",
    icon: "building",
    text: "Advanced insights, automation and support for growing teams that need more.",
    points: [
      "Unlimited team members",
      "Advanced forecasting & reports",
      "Priority AI insights & recommendations",
      "Dedicated onboarding & support",
      "Custom integrations",
    ],
    cta: "Get Started",
    featured: true,
  },
];

/**
 * PLACEHOLDER CONTENT — sample quotes so the layout can be reviewed.
 * Replace with real, attributable customer feedback before launch.
 */
export const quotes = [
  {
    name: "Sample Customer",
    role: "Founder, Sample Company",
    text: "This platform helps us understand our business more clearly. Insights feel simple, relevant, and easy to act on as we grow day by day.",
  },
  {
    name: "Sample Manager",
    role: "Head of Sales, Sample Co.",
    text: "We stopped exporting spreadsheets every Monday. Targets, balance and forecasts are just there when the team needs them.",
  },
  {
    name: "Sample Owner",
    role: "Owner, Sample Studio",
    text: "The AI summaries point at what changed and why. It feels like having an analyst on the team without the overhead.",
  },
];

export const articles = [
  { title: "Growth Sales Strategy", date: "October 12, 2025", tag: "Marketing", read: "5 min read", tone: 0 },
  { title: "Turning Data into Growth", date: "October 18, 2025", tag: "Product", read: "4 min read", tone: 1 },
  { title: "Understanding Performance", date: "October 24, 2025", tag: "Finance", read: "6 min read", tone: 2 },
];

/** Demo values — swap in real figures before launch. */
export const stats = [
  ["14.5K", "Active businesses"],
  ["6.2K", "Daily active users"],
  ["12.3K", "Transactions tracked"],
  ["350+", "App integrations"],
] as const;

export const footerCols = [
  { title: "Links", items: ["Features app", "Dashboard", "Testimonials", "Articles & Insight"] },
  { title: "Features", items: ["Tracking target", "Balance sheet", "AI insight intelligence", "Manage product"] },
  { title: "Others", items: ["Careers", "FAQ", "Help Center"] },
];
