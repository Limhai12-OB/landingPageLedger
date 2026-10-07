import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";
import { BRAND } from "@/data/content";

export const metadata: Metadata = { title: `Create account · ${BRAND}` };

export default function RegisterPage() {
  return (
    <AuthShell
      panelTitle="Start running your shop with clear numbers."
      panelText="Create your Business Owner account, set up your first branch and invite your managers."
    >
      <RegisterForm />
    </AuthShell>
  );
}
