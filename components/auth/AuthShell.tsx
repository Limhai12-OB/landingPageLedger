import Link from "next/link";
import s from "@/app/auth.module.css";
import { LogoMark } from "@/components/Logo";
import { BRAND } from "@/data/content";
import AuthPanel from "./AuthPanel";

/** Split auth layout: form column on the left, branded dashboard panel on the right. */
export default function AuthShell({
  panelTitle,
  panelText,
  children,
}: {
  panelTitle: string;
  panelText: string;
  children: React.ReactNode;
}) {
  return (
    <div className={s.shell}>
      <div className={s.side}>
        <Link href="/" className={s.brand} aria-label={`${BRAND} home`}>
          <LogoMark size={28} />
          <span>{BRAND}</span>
        </Link>

        <main className={s.formWrap}>{children}</main>

        <footer className={s.footer}>
          <span>
            © {new Date().getFullYear()} {BRAND}.
          </span>
          <Link href="/">Privacy Policy</Link>
        </footer>
      </div>

      <AuthPanel title={panelTitle} text={panelText} />
    </div>
  );
}
