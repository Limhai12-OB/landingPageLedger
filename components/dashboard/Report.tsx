import s from "@/app/dashboard.module.css";
import Icon from "@/components/Icon";
import { report } from "@/data/dashboard";

/** Monthly AI report (generated on the 1st, exportable as PDF). */
export default function Report() {
  return (
    <article className={`${s.card} ${s.report}`}>
      <span className={s.reportIcon}>
        <Icon name="calendar" size={20} />
      </span>
      <span>
        <b>{report.month} report arrives on {report.ready}</b>
        <small>September report · {report.pages} pages · ready now</small>
      </span>
      <button type="button" className={`${s.btn} ${s.btnLight} ${s.btnSm}`}>
        <Icon name="download" size={14} /> Export PDF
      </button>
    </article>
  );
}
