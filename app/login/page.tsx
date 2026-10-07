import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";
import { BRAND } from "@/data/content";

export const metadata: Metadata = { title: `Log in · ${BRAND}` };

export default function LoginPage() {
  return (
    <AuthShell
      panelTitle="Keep your books, cash and branches in one place."
      panelText="Log in to see your dashboard, recent transactions and cash forecast."
    >
      <LoginForm />
    </AuthShell>
  );
}
