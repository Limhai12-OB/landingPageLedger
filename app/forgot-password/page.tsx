import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import ForgotForm from "@/components/auth/ForgotForm";
import { BRAND } from "@/data/content";

export const metadata: Metadata = { title: `Forgot password · ${BRAND}` };

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      panelTitle="Locked out? We'll get you back in."
      panelText="We'll email a verification code so you can set a new password in a minute."
    >
      <ForgotForm />
    </AuthShell>
  );
}
