import Link from "next/link";
import s from "@/app/dashboard.module.css";
import Icon from "@/components/Icon";
import Advisor from "@/components/dashboard/Advisor";
import Alerts from "@/components/dashboard/Alerts";
import Branches from "@/components/dashboard/Branches";
import Expenses from "@/components/dashboard/Expenses";
import ForecastChart from "@/components/dashboard/ForecastChart";
import HealthScore from "@/components/dashboard/HealthScore";
import Kpis from "@/components/dashboard/Kpis";
import Report from "@/components/dashboard/Report";
import Transactions from "@/components/dashboard/Transactions";
import { owner } from "@/data/dashboard";



/** Business Owner overview: every branch, cash first. */
export default function DashboardPage() {
  const today = new Date().toLocaleDateString("en-GB", { timeZone: "Asia/Phnom_Penh", weekday: "long", day: "numeric", month: "long" });
  const first = owner.name.split(" ")[0];
  return (
    <>
      <header className={s.greeting}>
        <div>
          <h2>
            Your business at a glance<span className={s.headingDot}>.</span>
          </h2>
          <p>Welcome back, {first}. Here is how your business is doing.</p>
          <div className={s.overviewMeta}><span><Icon name="building" size={13} /> All branches</span><span>{today}</span><span>USD / KHR</span></div>
        </div>
        <div className={s.actions}>
          <Link href="/dashboard/import" className={`${s.btn} ${s.btnLight}`}>
            <Icon name="camera" size={15} /> Snap a receipt
          </Link>
          <Link href="/dashboard/transactions?add=true" className={`${s.btn} ${s.btnDark}`}>
            <Icon name="plus" size={15} /> Add transaction
          </Link>
        </div>
      </header>

      <Kpis />

      <div className={s.row2}>
        <div className={s.stack}>
          <ForecastChart />
          <Transactions />
          <Branches />
        </div>
        <div className={s.stack}>
          <HealthScore />
          <Alerts />
          <Advisor />
          <Expenses />
          <Report />
        </div>
      </div>
    </>
  );
}
