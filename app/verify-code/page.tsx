import type { Metadata } from "next";
import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import VerifyForm from "@/components/auth/VerifyForm";
import { BRAND } from "@/data/content";

export const metadata: Metadata = { title: `Verify code · ${BRAND}` };

export default function VerifyCodePage() {
  return (
    <AuthShell
      panelTitle="One quick check to keep your books safe."
      panelText="Enter the code from your email, then choose a new password."
    >
      {/* VerifyForm reads ?email= from the URL, which needs a Suspense boundary for static rendering. */}
      <Suspense>
        <VerifyForm />
      </Suspense>
    </AuthShell>
  );
}
