"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import s from "@/app/auth.module.css";
import Icon from "@/components/Icon";
import { isEmail, requestPasswordReset } from "@/lib/auth";
import { Alert, SubmitButton, TextField } from "./Fields";

export default function ForgotForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [failed, setFailed] = useState<string>();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFailed(undefined);
    if (!isEmail(email)) return setError("Enter the email you registered with.");
    setError(undefined);
    setLoading(true);
    const res = await requestPasswordReset(email);
    setLoading(false);
    if (res.ok) router.push(`/verify-code?email=${encodeURIComponent(email.trim())}`);
    else setFailed(res.error);
  }

  return (
    <form className={s.form} onSubmit={onSubmit} noValidate>
      <span className={s.iconBadge} aria-hidden="true">
        <Icon name="lock" size={22} />
      </span>
      <header className={s.head}>
        <h1>Forgot your password?</h1>
        <p>No worries. Enter your email and we&apos;ll send you a 6-digit verification code.</p>
      </header>

      {failed && <Alert tone="error">{failed}</Alert>}

      <TextField
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="you@business.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
      />

      <SubmitButton loading={loading}>Send Code</SubmitButton>

      <Link href="/login" className={s.back}>
        <Icon name="arrowLeft" size={15} /> Back to log in
      </Link>
    </form>
  );
}
