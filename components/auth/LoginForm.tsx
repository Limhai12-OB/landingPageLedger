"use client";

import Link from "next/link";
import { useState } from "react";
import s from "@/app/auth.module.css";
import { isEmail, signIn, signInWithGoogle } from "@/lib/auth";
import { Alert, Checkbox, Divider, GoogleButton, PasswordField, SubmitButton, TextField } from "./Fields";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [status, setStatus] = useState<{ tone: "error" | "success"; text: string } | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!isEmail(email)) next.email = "Enter a valid email address.";
    if (!password) next.password = "Enter your password.";
    setErrors(next);
    setStatus(null);
    if (Object.keys(next).length) return;

    setLoading(true);
    const res = await signIn(email, password, remember);
    setLoading(false);
    // TODO: redirect to the dashboard once it exists.
    setStatus(res.ok ? { tone: "success", text: "You're signed in. Taking you to your dashboard…" } : { tone: "error", text: res.error });
  }

  async function onGoogle() {
    setGoogleLoading(true);
    const res = await signInWithGoogle();
    setGoogleLoading(false);
    setStatus(res.ok ? { tone: "success", text: "Signed in with Google." } : { tone: "error", text: res.error });
  }

  return (
    <form className={s.form} onSubmit={onSubmit} noValidate>
      <header className={s.head}>
        <h1>Welcome Back</h1>
        <p>Enter your email and password to access your account.</p>
      </header>

      {status && <Alert tone={status.tone}>{status.text}</Alert>}

      <TextField
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="you@business.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <PasswordField
        label="Password"
        name="password"
        autoComplete="current-password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />

      <div className={s.row}>
        <Checkbox label="Remember me" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
        <Link href="/forgot-password" className={s.link}>
          Forgot your password?
        </Link>
      </div>

      <SubmitButton loading={loading}>Log In</SubmitButton>
      <Divider>Or log in with</Divider>
      <GoogleButton onClick={onGoogle} loading={googleLoading} />

      <p className={s.switch}>
        Don&apos;t have an account? <Link href="/register">Register now</Link>
      </p>
    </form>
  );
}
